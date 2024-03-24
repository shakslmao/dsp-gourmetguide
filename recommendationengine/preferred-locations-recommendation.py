import pandas as pd
from pymongo import MongoClient
from geopy.distance import geodesic
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from bson.objectid import ObjectId
import numpy as np


con_string = "mongodb+srv://shaaqzak:akram101@cluster0.lrls17a.mongodb.net/test"
client = MongoClient(con_string)

db = client.get_database()
restaurant_collection = db['Restaurant']
preferences_collection = db['Preferences']


# Function to calculate the distance between two coordinates
def calculate_distance(coord1, coord2):
    try:
        distance = geodesic(coord1, coord2).miles
        return distance
    except Exception as e:
        print(f"Error calculating distance: {e}")
        return None


# Fetching user preferences
preferences_data = preferences_collection.find_one(
    {"userId": ObjectId("65ff916d3a57f96e46a96e83")})

# Setting user location coordinates
user_location_coords = (preferences_data['userCoordinates']['latitude'], preferences_data['userCoordinates']
                        ['longitude']) if preferences_data and 'userCoordinates' in preferences_data else (0, 0)

# Fetching restaurant data
restaurant_data = restaurant_collection.find({}, {
    "yelpId": 1, "restaurantName": 1, "categories": 1, "customerRatings": 1, "coordinates": 1,
})

restaurant_df = pd.DataFrame(list(restaurant_data))
restaurant_df.rename(columns={'customerRatings': 'ratings'}, inplace=True)

# Preprocess and normalise restaurant data
restaurant_df['categories'] = restaurant_df['categories'].apply(
    lambda x: list(set([item.lower() for item in x])))

# Initialise DataFrame for category features
category_features_df = pd.DataFrame(index=restaurant_df.index)
unique_categories = set(
    [item for sublist in restaurant_df["categories"].tolist() for item in sublist])

# Preparing user profile without applying the category weight initially
user_profile = {f"category_{category}": (1 if category in preferences_data.get(
    "cuisineTypes", []) else 0) for category in unique_categories}

# Generating binary features for categories
for category in unique_categories:
    category_column_name = f"category_{category}"
    category_features_df[category_column_name] = restaurant_df['categories'].apply(
        lambda cats: 1 if category in cats else 0)

# Concatenate binary category features with the original DataFrame
restaurant_df = pd.concat([restaurant_df, category_features_df], axis=1)

# Applying the category weight
category_weight = 2
preferred_categories = [
    f"category_{category.lower()}" for category in preferences_data.get('cuisineTypes', [])]
for category_column_name in preferred_categories:
    if category_column_name in user_profile:
        user_profile[category_column_name] *= category_weight
    if category_column_name in restaurant_df.columns:
        restaurant_df[category_column_name] *= category_weight

# Normalising the ratings and updating the DataFrame
scaler_restaurants = MinMaxScaler()
restaurant_df["latitude"] = restaurant_df["coordinates"].apply(
    lambda x: x.get("latitude") if x else np.nan)
restaurant_df["longitude"] = restaurant_df["coordinates"].apply(
    lambda x: x.get("longitude") if x else np.nan)
restaurant_df[['ratings']] = scaler_restaurants.fit_transform(
    restaurant_df[['ratings']].astype(float))

# Updating user profile with scaled rating preference
user_rating_preference = [
    [4.5 if preferences_data.get('prefersHigherRated', False) else 0]]
user_rating_preference_df = pd.DataFrame(
    user_rating_preference, columns=['ratings'])

user_rating_scaled = scaler_restaurants.transform(user_rating_preference_df)

# Extract tbe scaled rating and update the user profile
user_profile['ratings'] = user_rating_scaled[0, 0]


# Calculating similarity scores
user_profile_df = pd.DataFrame([user_profile])
similarity_scores = cosine_similarity(
    user_profile_df, restaurant_df[list(user_profile.keys())])

restaurant_df['similarity_score'] = similarity_scores[0]
restaurant_df['distance_to_user'] = restaurant_df.apply(lambda row: calculate_distance(
    user_location_coords, (row['latitude'], row['longitude'])), axis=1)

# Filtering and sorting recommendations
PROXIMITY_THRESHOLD = 20  # miles
filtered_restaurants = restaurant_df[restaurant_df['distance_to_user']
                                     <= PROXIMITY_THRESHOLD]
recommended_restaurants = filtered_restaurants.sort_values(
    by=['similarity_score', 'distance_to_user'], ascending=[False, True])

print("Total restaurants:", restaurant_df.shape[0])
print("Restaurants after feature extraction:", restaurant_df.shape[0])
print("Restaurants after distance calculation:", filtered_restaurants.shape[0])
print("Final recommended restaurants:", recommended_restaurants.shape[0])
print(recommended_restaurants[['restaurantName',
      'similarity_score', 'distance_to_user']])
