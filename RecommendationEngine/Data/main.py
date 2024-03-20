import requests


def search_yelp(api_key, term, location):
    """
    Searches Yelp for businesses based on a search term and location.

    :param api_key: Your Yelp API key.
    :param term: Search term (e.g., "restaurants").
    :param location: Location to search within (e.g., "San Francisco, CA").
    :return: JSON response from Yelp API.
    """
    # Define the endpoint URL and headers
    url = "https://api.yelp.com/v3/businesses/search"
    headers = {"Authorization": f"Bearer {api_key}"}

    # Define the query parameters
    params = {
        "term": term,
        "location": location,
        "limit": limit,
        "price": price,
    }

    # Make the GET request to Yelp API
    response = requests.get(url, headers=headers, params=params)

    # Return the JSON response
    return response.json()


# Example usage
api_key = "CKovDShTa1XLGnCWjK5-wgcWrVvhyK6Q7XrIBagNUv833NSw_8xo_X-YalvNww5XdcHzHwA2WrD3WvWobcYBk-nb1uGdMt9SFRT077RztAzTw-mkYLzsPTjw2AjyZXYx"  # Replace this with your actual Yelp API key
term = "pizza"
location = "London"
limit = 1
price = "1,2,3,4"
results = search_yelp(api_key, term, location)
print(results)
