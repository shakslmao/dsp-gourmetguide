import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

db = client.restaurantrecommendation
restaurant_collection = db.restaurant
preferences_collection = db.preferences


def get_loc_coord(location_name):
    geolocator = Nominatim(user_agent="geoapiExercises")
    try:
        location = geolocator.geocode(location_name)
        if location:
            return (location.latitude, location.longitude)
        else:
            return (None, None)

    except Exception as e:
        print(f"Error obtaining co-ords: {e}")
        return (None, None)


def calculate_distance(coord1, coord2):
    """
        Calculate the distance in km between two coordinates
        Params:
            - coord1: Tuple of latitude and longitude of the first location
            - coord2: Tuple of latitude and longitude of the second location
        Returns:
            - distance: Distance in km as a float
    """

    try:
        distance = geodesic(coord1, coord2).kilometers
        return distance
    except Exception as e:
        print(f"Error calculating distance: {e}")
        return None


preferences_data = preferences_collection.find_one({"userId": 1})
user_location_name = preferences_data['currentLocation']
user_location_coords = get_loc_coord(user_location_name)


# Feature Extraction from SQL Database
restaurant_data = restaurant_collection.find({}, {
    "yelpId": 1,
    "restaurantName": 1,
    "categories": 1,
    "customerRatings": 1,
    "reviewCount": 1,
    "price": 1,
    "coordinates": 1, })

restaurant_df = pd.DataFrame(list(restaurant_data))

# Preprocess and normalize restaurant data
restaurant_df["categories"] = restaurant_df["categories"].apply(
    lambda x: [item for category in x for item in (category["title"], category["alias"])])

restaurant_df["price_level"] = restaurant_df["price"].apply(len)

scaler = MinMaxScaler()

restaurant_df[["ratings", "price_level", "review_count"]] = scaler.fit_transform(
    restaurant_df[["customerRatings", "price_level", "reviewCount"]].astype(float))

restaurant_df["latitude"] = restaurant_df["coordinates"].apply(
    lambda x: x.get("latitude"))

restaurant_df["longitude"] = restaurant_df["coordinates"].apply(
    lambda x: x.get("longitude"))

# Convert 'categories' into binary features
unique_categories = set(
    [item for sublist in restaurant_df["categories"].tolist() for item in sublist])

for category in unique_categories:
    restaurant_df[f"category_{category}"] = restaurant_df["categories"].apply(
        lambda x: 1 if category in x else 0)

# Load and transform the preferences data

user_profile = {f"category_{category}": (1 if category in preferences_data.get(
    "cuisineTypes", []) else 0) for category in unique_categories}

user_profile["price_level"] = scaler.transform(
    [[len(preferences_data.get("priceRangePreference", "£"))]])[0][0]

# if user has a preference for Michelin rated restaurants, set the rating to 4.5
user_profile["ratings"] = scaler.transform(
    [[4.5 if preferences_data.get("preferredMichelinRated", False) else 0]])[0][0]

# Convert user profile to DataFrame for compatibility with similarity calculation
user_profile_df = pd.DataFrame([user_profile])

# Calcualte cosine similarity between user profile and restaurant data
restaurant_features = restaurant_df[list(user_profile.keys())]
similarity_scores = cosine_similarity(user_profile_df, restaurant_features)

restaurant_df['similarity_score'] = similarity_scores[0]

PROXIMITY_THRESHOLD = 32  # 32 km or 20 miles
restaurant_df['distance_to_user'] = restaurant_df.apply(
    lambda row: calculate_distance(user_location_coords, (row['latitude'], row['longitude'])), axis=1
)

filtered_restaurants = restaurant_df[restaurant_df['distance_to_user']
                                     <= PROXIMITY_THRESHOLD]

# Add similarity scores to restaraunt DataFrame and sort
recommended_restaurants = filtered_restaurants.sort_values(
    by=['similarity_score', 'distance_to_user'], ascending=[False, True])


# Display top N Recommendations
print(recommended_restaurants[['restaurantName',
      'similarity_score', 'distance_to_user']].head(3))


# Futher Implementation: Store the recommended restaurants in a new collection in the MongoDB
# Futher Implementation: Sendback the recommended restaurants to the Next.js frontend
# Futher Implementation: Adjusting the weight of certain preferences based on user feedback.
# Futher Implementation: Learning from user behavior to predict unseen preferences.
# Futher Implementation:
