import fs from "fs";
import "dotenv/config";
import fetch from "node-fetch";

const apiKey = process.env.YELP_API_KEY;
const url = "https://api.yelp.com/v3/businesses/search";
const params = new URLSearchParams({
    term: "restaurants",
    location: "London",
    limit: "100",
});

const options = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    },
};

async function fetchYelpRestaurants() {
    try {
        const response = await fetch(`${url}?${params}`, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        // Save the fetched data to a file
        fs.writeFileSync("YelpRestaurantsData.json", JSON.stringify(data, null, 2));
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

fetchYelpRestaurants();
