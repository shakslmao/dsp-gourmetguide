import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import pandas as pd
from pymongo import MongoClient
from geopy.distance import geodesic
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from bson.objectid import ObjectId
import numpy as np
from pydantic import BaseModel, Field, validator
from typing import Optional
from bson import ObjectId
import re
from FeedbackInputValidation import FeedbackInput


#  TODO: INCLUDE DYNAMIC WEIGHTING.
#  TODO: INCLUDE FEEDBACK LOOP.
#   TODO: AMEND PRICING

app = Flask(__name__)
print("Server is running")
CORS(app, origins=["http://localhost:3000"])
con_string = "mongodb+srv://shaaqzak:akram101@cluster0.lrls17a.mongodb.net/test"
client = MongoClient(con_string)
db = client.get_database()


def calculate_distance(coord1, coord2):
    try:
        distance = geodesic(coord1, coord2).miles
        return distance
    except Exception as e:
        print(f"Error calculating distance: {e}")
        return None


def update_user_recommendations(userId, within_proximity_recommendations, outside_proximity_recommendations, fake_recommendations):
    # Attempt to find an existing document for the user
    existing_result = db["RecommendationResult"].find_one({"userId": userId})

    # Prepare the update document
    update_doc = {
        "$set": {
            "recommendedUserLocationRestaurants": within_proximity_recommendations,
            "recommendedUserPreferredLocationRestaurants": outside_proximity_recommendations,
            "recommendedFakeRestaurants": fake_recommendations,
            "createdAt": datetime.datetime.now(),
            "feedbackReceived": False
        }
    }

    # If a document exists, update it
    if existing_result:
        db['RecommendationResult'].update_one(
            {"_id": existing_result['_id']}, update_doc)
    else:
        # If no document exists, create a new document including the userId
        new_doc = {"userId": userId, **update_doc["$set"]}
    db['RecommendationResult'].insert_one(new_doc)


@app.route("/recommendations_for_current_location", methods=["POST"])
def recommendations_for_current_location():
    print("Request received at /recommendations_for_current_location")
    try:
        data = request.json
        userId = data.get("userId")
        print(data, userId)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    try:
        PROXIMITY_THRESHOLD = 20  # miles
        restaurant_collection = db['Restaurant']
        preferences_collection = db['Preferences']

        # Fetching user preferences
        preferences_data = preferences_collection.find_one(
            {"userId": ObjectId(userId)})

        # Setting user location coordinates
        user_location_coords = (preferences_data['userCoordinates']['latitude'], preferences_data['userCoordinates']
                                ['longitude']) if preferences_data and 'userCoordinates' in preferences_data else (0, 0)

        # Fetching restaurant data
        restaurant_data = restaurant_collection.find({}, {
            "yelpId": 1, "restaurantName": 1, "categories": 1, "customerRatings": 1, "coordinates": 1, "price": 1,
        })

        restaurant_df = pd.DataFrame(list(restaurant_data))
        restaurant_df.rename(
            columns={'customerRatings': 'ratings'}, inplace=True)

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
        restaurant_df = pd.concat(
            [restaurant_df, category_features_df], axis=1)

        # Applying the category weight
        category_weight = 4
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

        user_rating_scaled = scaler_restaurants.transform(
            user_rating_preference_df)

        # Extract tbe scaled rating and update the user profile
        user_profile['ratings'] = user_rating_scaled[0, 0]

        # Normalising the Price data
        restaurant_df['price'] = restaurant_df['price'].fillna(
            restaurant_df['price'].mean())
        restaurant_df[['price']] = MinMaxScaler().fit_transform(
            restaurant_df[['price']].astype(float))

        # Mapping from user preference labels to numeric values
        price_preference_mapping = {
            "NO_PREFERENCE": 0,
            "VERY_LOW"
            "LOW": 2,
            "MEDIUM": 3,
            "HIGH": 4,
            "VERY_HIGH": 4
        }
        # Fetching the user's price range preference
        user_price_preference_label = preferences_data.get(
            'priceRangePreference', "NO_PREFERENCE")

        # Converting the label to its corresponding numeric value
        user_price_preference = price_preference_mapping.get(
            user_price_preference_label, 0)

        if user_price_preference >= 4:
            user_price_preference = 4

        # Manually normalise users price preference
        min_price_range = 1
        max_price_range = 4

        # Calculate the normalised price preference
        user_price_preference_normalised = (
            user_price_preference - min_price_range) / (max_price_range - min_price_range)
        user_profile['price'] = user_price_preference_normalised

        common_features = set(user_profile.keys()) & set(restaurant_df.columns)
        assert 'price' in common_features, "Price feature must be included in the similarity calculation."

        # Calculating similarity scores
        user_profile_df = pd.DataFrame([user_profile])
        similarity_scores = cosine_similarity(
            user_profile_df[list(common_features)], restaurant_df[list(common_features)])

        restaurant_df['similarity_score'] = similarity_scores[0]
        restaurant_df['distance_to_user'] = restaurant_df.apply(lambda row: calculate_distance(
            user_location_coords, (row['latitude'], row['longitude'])), axis=1)

        price_tolerance = 0.25
        lower_bound = max(
            0, user_price_preference_normalised - price_tolerance)
        upper_bound = min(
            1, user_price_preference_normalised + price_tolerance)

        restaurant_df['composite_score'] = (
            restaurant_df['similarity_score'] +
            np.where((restaurant_df['price'] >= lower_bound) & (restaurant_df['price'] <= upper_bound), 1, 0) +
            np.where(restaurant_df['ratings'] >=
                     user_rating_scaled[0, 0], 1, 0)
        )

        recommendations_within_proximity = restaurant_df[restaurant_df['distance_to_user']
                                                         <= PROXIMITY_THRESHOLD].sort_values(by='composite_score', ascending=False)
        recommendations_outside_proximity = restaurant_df[restaurant_df['distance_to_user'] > PROXIMITY_THRESHOLD].sort_values(
            by='composite_score', ascending=False)

        filtered_by_distance = restaurant_df[restaurant_df['distance_to_user']
                                             <= PROXIMITY_THRESHOLD]

        top_recommendations_within_proximity = recommendations_within_proximity.head(
            20)
        top_recommendations_outside_proximity = recommendations_outside_proximity.head(
            20)

        print("Recommendations within proximity threshold:",
              top_recommendations_within_proximity.shape[0])
        print(top_recommendations_within_proximity[[
            'restaurantName', 'composite_score', 'distance_to_user', 'price']])

        print("\nRecommendations outside proximity threshold:",
              top_recommendations_outside_proximity.shape[0])
        print(top_recommendations_outside_proximity[[
            'restaurantName', 'composite_score', 'distance_to_user', 'price']])

        try:
            within_proximity_recommendations = top_recommendations_within_proximity.to_dict(
                orient='records')
            outside_proximity_recommendations = top_recommendations_outside_proximity.to_dict(
                orient='records')

            recommendation_type = 'recommendedUserLocationRestaurants'
            recommendation_type_outside = 'recommendedUserPreferredLocationRestaurants'

            append_result = update_user_recommendations(
                userId, within_proximity_recommendations, recommendation_type)

            append_result_outside = update_user_recommendations(
                userId, outside_proximity_recommendations, recommendation_type_outside)

            if '_id' in append_result:
                db['RecommendationResult'].replace_one(
                    {"_id": append_result['_id']}, append_result)

            if '_id' in append_result_outside:
                db['RecommendationResult'].replace_one(
                    {"_id": append_result_outside['_id']}, append_result_outside)

            else:
                db['RecommendationResult'].insert_one(append_result)
                db['RecommendationResult'].insert_one(append_result_outside)

            print("Successfully updated recommendations in the database")
            return jsonify({"message": "Success", "userId": userId}), 200

        except Exception as e:
            print("Error pushing data to the database", str(e))
            return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route to receive preferred lcoation data from the frontend
@app.route("/recommendations_for_preferred_locations", methods=["POST"])
def recommendations_for_preferred_locations():
    try:
        data = request.json
        print(data)
        # Process data here
        with open("YelpDataPrefLoc.json", "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/recommendations_for_fake_data", methods=["POST"])
def recommendations_for_fake_data():
    print("Request received at /recommendations_for_fake_data")
    try:
        print("extracting data from request")
        data = request.json
        print("Recieved Data", data)
        userId = data.get("userId")
    except Exception as e:
        print("Error extracting request data:", str(e))
        return jsonify({"error": str(e)}), 500
        # preferences_id = data.get("preferencesId")

    try:
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
            {"userId": ObjectId(userId)}, {
                "cuisineTypes": 1, "dietaryRestrictions": 1, "priceRangePreference": 1, "preferredTime": 1, "ambienceTypes": 1, "userCoordinates": 1, "prefersHigherRated": 1, "accessibilityFeatures": 1
            })

        # Convert user preferences types  into a set of unique lowercase strings
        user_cuisine_preferences = set([cuisine.lower()
                                        for cuisine in preferences_data['cuisineTypes']])
        user_dietary_preferences = set([diet.lower()
                                        for diet in preferences_data['dietaryRestrictions']])
        user_ambience_preferences = set([ambience.lower()
                                        for ambience in preferences_data['ambienceTypes']])

        print("Preparing to access coords with preferences_data:", preferences_data)
        if preferences_data and "userCoordinates" in preferences_data and preferences_data["userCoordinates"]:
            user_location_coords = (preferences_data['userCoordinates']
                                    ['latitude'], preferences_data['userCoordinates']['longitude'])
        else:
            user_location_coords = (0, 0)

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

        recommended_restaurants = recommendations
        print(recommended_restaurants[['name', 'similarity_score', 'price']])
        pd.reset_option('display.max_rows')

        # Push the recommendations to the database
        try:
            new_recommendations = recommended_restaurants.to_dict(
                orient='records')
            recommendation_type = 'recommendedFakeRestaurants'

            append_result = update_user_recommendations(
                userId, new_recommendations, recommendation_type)

            if '_id' in append_result:
                db['RecommendationResult'].replace_one(
                    {"_id": append_result['_id']}, append_result)

            else:
                db['RecommendationResult'].insert_one(append_result)

            print("Successfully updated recommendations in the database")
            return jsonify({"message": "Success", "userId": userId}), 200
        except Exception as e:
            print("Error pushing data to the database", str(e))
            return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/submit_feedback", methods=["POST"])
def submit_feedback():
    try:
        input_data = FeedbackInput(**request.json)

        feedback = {
            "recommendationResultId": input_data.recommendationResultId,
            "actionType": input_data.actionType,
            "sentimentScore": input_data.sentimentScore,
            "feedbackText": input_data.feedbackText,
            "createdAt": datetime.datetime.now()
        }

        db['RecommendationFeedback'].insert_one(feedback)
        db['RecommendationResult'].update_one(
            {"_id": ObjectId(input_data.recommendationResultId)},
            {"$set": {"feedbackReceived": True}}
        )
        return jsonify({"message": "Feedback submitted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
