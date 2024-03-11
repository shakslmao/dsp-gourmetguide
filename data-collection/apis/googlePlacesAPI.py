import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request
import json

SERVICE_ACCOUNT_FILE = "gourmetguide-60151a7d2a93.json"
SCOPES = ["https://www.googleapis.com/auth/cloud-platform"]


# Authenticate using the service account file
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES
)
credentials.refresh(Request())

request_body = {
    "locationRestriction": {
        "circle": {
            "center": {"latitude": 51.5072, "longitude": 0.1276},
            "radius": 10000,
        }
    },
    "rankPreference": "DISTANCE",
    "maxResultCount": 5,
    "includedTypes": ["restaurant"],
    "includedPrimaryTypes": [
        "american_restaurant",
        "barbecue_restaurant",
        "brazilian_restaurant",
        "breakfast_restaurant",
        "brunch_restaurant",
        "chinese_restaurant",
        "french_restaurant",
        "greek_restaurant",
        "hamburger_restaurant",
        "indian_restaurant",
        "indonesian_restaurant",
        "italian_restaurant",
        "japanese_restaurant",
        "korean_restaurant",
        "lebanese_restaurant",
        "mediterranean_restaurant",
        "mexican_restaurant",
        "middle_eastern_restaurant",
        "pizza_restaurant",
        "ramen_restaurant",
        "seafood_restaurant",
        "seafood_restaurant",
        "steak_house",
        "sushi_restaurant",
        "thai_restaurant",
        "turkish_restaurant",
        "vegan_restaurant",
        "vietnamese_restaurant",
        "vegetarian_restaurant",
    ],
    "excludedTypes": [
        "fast_food_restaurant",
        "meal_delivery",
        "meal_takeaway",
    ],
}

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {credentials.token}",
    "X-Goog-User-Project": "gourmetguide",
    "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.dineIn ",
}

url = "https://places.googleapis.com/v1/places:searchNearby"
response = requests.post(url, json=request_body, headers=headers)

if response.status_code == 200:
    data = response.json()
    with open("places_results.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print("Data saved to places_results.json")

else:
    print(f"Failed to get data. Error: {response.status_code} - {response.text}")
