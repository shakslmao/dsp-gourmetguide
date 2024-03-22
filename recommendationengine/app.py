from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
print("Server is running")
CORS(app, origins=["http://localhost:3000"])


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
        city = data.get("city")
        latitude = data.get("latitude")
        longitude = data.get("longitude")
        print(city, latitude, longitude)
        return jsonify({"message": "Location Recieved"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
