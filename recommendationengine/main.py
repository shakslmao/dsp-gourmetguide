import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from bson.objectid import ObjectId
import numpy as np


MONGO_URI = os.getenv("MONGO_URI")
con_string = "mongodb+srv://shaaqzak:akram101@cluster0.lrls17a.mongodb.net/test"
client = MongoClient(con_string)


db = client.get_database()
restaurant_collection = db['Restaurant']
preferences_collection = db['Preferences']


def calculate_distance(coord1, coord2):
    """
        Calculate the distance in miles between two coordinates
        Params:
            - coord1: Tuple of latitude and longitude of the first location
            - coord2: Tuple of latitude and longitude of the second location
        Returns:
            - distance: Distance in miles as a float
    """

    try:
        distance = geodesic(coord1, coord2).miles
        return distance
    except Exception as e:
        print(f"Error calculating distance: {e}")
        return None


preferences_data = preferences_collection.find_one(
    {"userId": ObjectId("65ff7e00d36b1e3c76bf8d88")})


if preferences_data is not None and 'userCoordinates' in preferences_data:
    user_location_coords = (
        preferences_data['userCoordinates']['latitude'], preferences_data['userCoordinates']['longitude'])
else:
    # Fallback or default coordinates
    user_location_coords = (0, 0)


# Feature Extraction from SQL Database
restaurant_data = restaurant_collection.find({}, {
    "yelpId": 1,
    "restaurantName": 1,
    "categories": 1,
    "customerRatings": 1,
    "reviewCount": 1,
    "coordinates": 1, })


restaurant_df = pd.DataFrame(list(restaurant_data))
restaurant_df.rename(columns={'customerRatings': 'ratings'}, inplace=True)

# Preprocess and normalise restaurant data
restaurant_df['categories'] = restaurant_df['categories'].apply(
    lambda x: list(set([item.lower() for item in x])))

category_features_df = pd.DataFrame(index=restaurant_df.index)

category_weight = 2
# Convert 'categories' into binary features
unique_categories = set(
    [item for sublist in restaurant_df["categories"].tolist() for item in sublist])

# Load and transform the preferences data
user_profile = {f"category_{category}": (1 if category in preferences_data.get(
    "cuisineTypes", []) else 0) for category in unique_categories}

category_columns = {f"category_{category}": [
    0] * len(restaurant_df) for category in unique_categories}

for category in unique_categories:
    category_column_name = f"category_{category}"

    if category in preferences_data.get('cuisineTypes', []):
        user_profile[category_column_name] *= category_weight
        restaurant_df[category_column_name] = restaurant_df['categories'].apply(
            lambda x: x * category_weight if x == 1 else x)

    category_features_df[category_column_name] = restaurant_df['categories'].apply(
        lambda cats: 1 if category in cats else 0)


for category in preferences_data.get('cuisineTypes', []):
    category_column_name = f"category_{category.lower()}"
    if category_column_name in user_profile:
        user_profile[category_column_name] *= category_weight


for category in preferences_data.get('cuisineTypes', []):
    category_column_name = f"category_{category.lower()}"
    if category_column_name in restaurant_df.columns:
        restaurant_df[category_column_name] = restaurant_df['categories'].apply(
            lambda x: x * category_weight if category in x else x)


# Concatenate the binary category features with the original  DataFrame
restaurant_df = pd.concat([restaurant_df, category_features_df], axis=1)

scaler_restaurants = MinMaxScaler()
scaler_preferences = MinMaxScaler()

scaler_restaurants.fit(restaurant_df[['ratings']])

restaurant_df["latitude"] = restaurant_df["coordinates"].apply(
    lambda x: x.get("create", {}).get("latitude"))

restaurant_df["longitude"] = restaurant_df["coordinates"].apply(
    lambda x: x.get("create", {}).get("longitude"))


restaurant_features = restaurant_df[[
    'ratings'] + [f'category_{category}' for category in unique_categories]]

# Determine the user's rating preference (4.5 for higher rated, 0 otherwise)
user_rating_preference = np.array(
    [[4.5 if preferences_data.get('prefersHigherRated', False) else 0]])
user_rating_preference = scaler_restaurants.transform(user_rating_preference)
user_profile['ratings'] = user_rating_preference[0][0]


# Convert user profile to DataFrame for compatibility with similarity calculation
user_profile_df = pd.DataFrame([user_profile])

# Calcualte cosine similarity between user profile and restaurant data
restaurant_features = restaurant_df[list(user_profile.keys())]
similarity_scores = cosine_similarity(user_profile_df, restaurant_features)

restaurant_df['similarity_score'] = similarity_scores[0]

PROXIMITY_THRESHOLD = 20  # 32 km or 20 miles
restaurant_df['distance_to_user'] = restaurant_df.apply(
    lambda row: calculate_distance(user_location_coords, (row['latitude'], row['longitude'])), axis=1
)

filtered_restaurants = restaurant_df[restaurant_df['distance_to_user']
                                     <= PROXIMITY_THRESHOLD]

# Add similarity scores to restaraunt DataFrame and sort
recommended_restaurants = filtered_restaurants.sort_values(
    by=['similarity_score', 'distance_to_user'], ascending=[False, True])


# Display top N Recommendations
print("Total restaurants:", restaurant_df.shape[0])
print("Restaurants after feature extraction:", restaurant_df.shape[0])
print("Restaurants after distance calculation:", filtered_restaurants.shape[0])
print("Final recommended restaurants:", recommended_restaurants.shape[0])

print(recommended_restaurants[['restaurantName',
      'similarity_score', 'distance_to_user']])

# Futher Implementation: Store the recommended restaurants in a new collection in the MongoDB
# Futher Implementation: Sendback the recommended restaurants to the Next.js frontend
# Futher Implementation: Adjusting the weight of certain preferences based on user feedback.
# Futher Implementation: Learning from user behavior to predict unseen preferences.
# Futher Implementation:
