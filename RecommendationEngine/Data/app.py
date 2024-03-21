from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import pandas as pd
from geopy.distance import geodesic
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("")
CORS(app, origins=["http://localhost:3000"])

print("Server is running")


# Route to receive data from the frontend
@app.route("/receive_data", methods=["POST"])
def receive_data():
    try:
        data = request.json
        print(data)
        # Process data here
        with open("YelpData.json", "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route to receive preferred lcoation data from the frontend
@app.route("/receive_preferred_loc", methods=["POST"])
def receive_preferred_loc():
    try:
        data = request.json
        print(data)
        # Process data here
        with open("YelpDataPrefLoc.json", "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/getuserlocation", methods=["POST"])
def getuserlocation():
    try:
        data = request.json
        current_location = (data["latitude"], data["longitude"])
        return jsonify({"message": "Location updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


nltk.download("vader_lexicon")

# Load the Data
restaurant_df = pd.read_json("YelpData.json")
restaurant_df = pd.read_json("YelpDataPrefLoc.json")

# Feature Extraction
restaurant_df["price_range_numerical"] = restaurant_df["price"].apply(lambda x: len(x))
restaurant_df["categories"] = restaurant_df["categories"].apply(
    lambda x: [cat["title"] for cat in eval(x)]
)
restaurant_df["ratings"] = restaurant_df["ratings"].apply(lambda x: x["rating"])
restaurant_df["review_count"] = restaurant_df["review_count"].apply(lambda x: x)
restaurant_df["distance"] = restaurant_df["coordinates"].apply(
    lambda x: geodesic(current_location, (x["latitude"], x["longitude"])).kilometers
)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
