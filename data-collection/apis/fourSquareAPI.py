import requests

url = "https://api.foursquare.com/v3/places/search"
headers = {"accept": "application/json"}
response = requests.get(url, headers=headers)

print(response.text)
