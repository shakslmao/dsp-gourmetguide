import pandas as pd
from pymongo import MongoClient
from geopy.distance import geodesic
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from bson.objectid import ObjectId
import numpy as np

#  INCLUDE DYNAMIC WEIGHTING.
#  INCLUDE FEEDBACK LOOP.


def calculate_distance(coord1, coord2):
    try:
        distance = geodesic(coord1, coord2).miles
        return distance
    except Exception as e:
        print(f"Error calculating distance: {e}")
        return None


con_string = "mongodb+srv://shaaqzak:akram101@cluster0.lrls17a.mongodb.net/test"
client = MongoClient(con_string)

db = client.get_database()
restaurant_collection = db['FakeRestaurant']
preferences_collection = db['Preferences']

# Fetching Relevant Dummy Restaurant Data
restaurant_data = restaurant_collection.find({}, {
    "restaurant_id": 1, "name": 1, "cuisine": 1, "dietary": 1, "price": 1, "rating": 1, "ambience": 1, "location": 1, "coordinates": 1, "accessibility": 1,
})

restaurant_df = pd.DataFrame(list(restaurant_data))

# Extracting Latitude and Longitude
restaurant_df['latitude'] = restaurant_df['coordinates'].apply(
    lambda x: x.get('latitude') if x else np.nan)
restaurant_df['longitude'] = restaurant_df['coordinates'].apply(
    lambda x: x.get('longitude') if x else np.nan)

# Iterate through the restaurant cuisine array and extract the cuisine labels turnign them into a list of lowercasae strings.
restaurant_df['cuisine'] = restaurant_df['cuisine'].apply(
    lambda x: list(set([item['label'].lower() for item in x])))

# Initalise Dataframe for cuisine features
cuisine_features_df = pd.DataFrame(index=restaurant_df.index)
unique_cuisines = set(
    [item for sublist in restaurant_df["cuisine"].tolist() for item in sublist])

# Generating binary features for cuisines
for i, cuisines in enumerate(restaurant_df['cuisine']):
    for cuisine in cuisines:
        cuisine_features_df.at[i, cuisine] = 1

# Iterate through the restaurant dietary array and extract the dietary labels turning them into a list of lowercase strings.
restaurant_df['dietary'] = restaurant_df['dietary'].apply(
    lambda x: list(set([item['label'].lower() for item in x])))

# Initalise Dataframe for dietary features
dietary_features_df = pd.DataFrame(index=restaurant_df.index)
unique_dietary = set(
    [item for sublist in restaurant_df['dietary'].tolist() for item in sublist])

# Generating binary features for dietary
for i, dietary in enumerate(restaurant_df['dietary']):
    for diet in dietary:
        dietary_features_df.at[i, diet] = 1


# Iterate through the restaurant ambience array and extract the ambience labels turning them into a list of lowercase strings.
restaurant_df['ambience'] = restaurant_df['ambience'].apply(
    lambda x: list(set([item['label'].lower() for item in x])))

# Initalise Dataframe for cuisine features
ambience_features_df = pd.DataFrame(index=restaurant_df.index)
unique_ambience = set(
    [item for sublist in restaurant_df['ambience'].tolist() for item in sublist])

# Generating binary features for ambience
for i, ambience in enumerate(restaurant_df['ambience']):
    for amb in ambience:
        ambience_features_df.at[i, amb] = 1
scaler_restaurants = MinMaxScaler()

# Normalising the Price Data
restaurant_price_mapping = {
    "£": 1,      # VERY_LOW
    "££": 2,     # LOW
    "£££": 3,    # MEDIUM
    "££££": 4    # HIGH to VERY_HIGH
}
restaurant_df['price_numeric'] = restaurant_df['price'].map(
    restaurant_price_mapping)

# Normalising the Ratings Data
restaurant_df[['rating']] = scaler_restaurants.fit_transform(
    restaurant_df[['rating']].astype(float))

restaurant_df['latitude'] = restaurant_df['coordinates'].apply(
    lambda x: x['latitude'] if isinstance(x, dict) and 'latitude' in x else np.nan)
restaurant_df['longitude'] = restaurant_df['coordinates'].apply(
    lambda x: x['longitude'] if isinstance(x, dict) and 'longitude' in x else np.nan)


# Concatenating the restaurant features dataframes
full_restaurant_features_df = pd.concat(
    [restaurant_df, cuisine_features_df, dietary_features_df, ambience_features_df], axis=1)


# Fetching Relevant User Preferences.
preferences_data = preferences_collection.find_one(
    {"userId": ObjectId("6611cf660c9c7ead4e8ee973")}, {
        "cuisineTypes": 1, "dietaryRestrictions": 1, "priceRangePreference": 1, "preferredTime": 1, "ambienceTypes": 1, "userCoordinates": 1, "prefersHigherRated": 1, "accessibilityFeatures": 1
    })

# Convert user preferences types  into a set of unique lowercase strings
user_cuisine_preferences = set([cuisine.lower()
                               for cuisine in preferences_data['cuisineTypes']])
user_dietary_preferences = set([diet.lower()
                                for diet in preferences_data['dietaryRestrictions']])
user_ambience_preferences = set([ambience.lower()
                                for ambience in preferences_data['ambienceTypes']])
user_location_coords = (preferences_data['userCoordinates']
                        ['latitude'], preferences_data['userCoordinates']['longitude']) if preferences_data and 'userCoordinates' in preferences_data else (0, 0)
user_price_preference = preferences_data['priceRangePreference']
user_prefers_higher_rated = preferences_data['prefersHigherRated']

# Check if user prefers higher rated restaurants
user_preferes_higher_rated = preferences_data['prefersHigherRated']

# rating threshold for higher rated restaurants
HIGH_RATING_THRESHOLD = 4.5

if user_prefers_higher_rated:
    filtered_restaurants = restaurant_df[restaurant_df['rating']
                                         > HIGH_RATING_THRESHOLD]
else:
    filtered_restaurants = restaurant_df


# Fetching the user's price range preference
user_price_preference_label = preferences_data.get(
    'priceRangePreference', 'NO_PREFERENCE')

# Mapping from user preference labels to numeric values
price_preference_mapping = {
    "NO_PREFERENCE": 0,
    "VERY_LOW": 1,
    "LOW": 2,
    "MEDIUM": 3,
    "HIGH": 4,
    "VERY_HIGH": 4
}

# Converting the label to its corresponding numeric value
user_price_preference_numeric = price_preference_mapping.get(
    user_price_preference_label, 0)

# If the user has no specific price preference, consider all restaurants
if user_price_preference_numeric == 0:
    filtered_restaurants = restaurant_df
else:
    # Filter restaurants to those matching the user's price preference
    filtered_restaurants = restaurant_df[restaurant_df['price_numeric']
                                         == user_price_preference_numeric]

# Calculate the distance between the user and the restaurant
restaurant_df['distance_to_user'] = restaurant_df.apply(lambda x: calculate_distance(
    user_location_coords, (x['latitude'], x['longitude'])), axis=1)

PROXIMITY_THRESHOLD = 20

restaurant_df['distance_score'] = restaurant_df['distance_to_user'].apply(
    lambda x: 1 / (x + 0.1) if x <= PROXIMITY_THRESHOLD else 0)

restaurant_df['cuisine_match'] = restaurant_df['cuisine'].apply(lambda x: 1 if any(
    cuisine in user_cuisine_preferences for cuisine in x) else 0)

restaurant_df['dietary_match'] = restaurant_df['dietary'].apply(lambda x: 1 if any(
    dietary in user_dietary_preferences for dietary in x) else 0)

restaurant_df['ambience_match'] = restaurant_df['ambience'].apply(lambda x: 1 if any(
    ambience in user_ambience_preferences for ambience in x) else 0)

restaurant_df['price_match'] = restaurant_df['price_numeric'].apply(
    lambda x: 1 if x == user_price_preference_numeric else 0)

restaurant_df['rating_match'] = restaurant_df['rating'].apply(
    lambda x: 1 if x >= HIGH_RATING_THRESHOLD else 0)

# Weighting the similarity features
weights = {
    'cuisine_match': 3,
    'dietary_match': 1,
    'ambience_match': 1,
    'rating_score': 2,
    'price_match': 2,
    'distance_score': 1
}

# Calculate the total score for each restaurant
restaurant_df['similarity_score'] = (
    restaurant_df['cuisine_match'] * weights['cuisine_match'] +
    restaurant_df['dietary_match'] * weights['dietary_match'] +
    restaurant_df['ambience_match'] * weights['ambience_match'] +
    restaurant_df['rating_match'] * weights['rating_score'] +
    restaurant_df['price_match'] * weights['price_match'] +
    restaurant_df['distance_score'] * weights['distance_score']
)

pd.set_option('display.max_columns', None)

min_score = restaurant_df['similarity_score'].min()
max_score = restaurant_df['similarity_score'].max()
restaurant_df['normalised_similarity_score'] = (
    restaurant_df['similarity_score'] - min_score) / (max_score - min_score)

filtered_restaurants = restaurant_df[restaurant_df['similarity_score'] > 2]

recommendations = filtered_restaurants.sort_values(
    by='similarity_score', ascending=False)

top_recommendations = recommendations
print(top_recommendations[['name', 'similarity_score', 'price']])
pd.reset_option('display.max_rows')


'''
restaurant_df['normalised_score'] = (restaurant_df['similarity_score'] - np.min(restaurant_df['similarity_score'])) / (
    np.max(restaurant_df['similarity_score']) - np.min(restaurant_df['similarity_score']))

filtered_restaurants = restaurant_df[restaurant_df['similarity_score'] > 0]
'''
