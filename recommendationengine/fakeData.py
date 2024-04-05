from pymongo import MongoClient
import json

con_string = "mongodb+srv://shaaqzak:akram101@cluster0.lrls17a.mongodb.net/test"
client = MongoClient(con_string)
db_names = client.list_database_names()
print(db_names)

db = client['test']
collection = db['FakeRestaurant']

data = {
    "restaurants": [
        {
            "restaurant_id": "v981-74n210seo-92js291",
            "name": "The Aromatic Garden",
            "cuisine": [
                {
                    "label": "Indian",
                    "flag": "🇮🇳",
                    "description": "Diverse and aromatic, spanning spicy curries to flavorful biryanis, reflecting India's regional culinary traditions"
                },
                {
                    "label": "Thai",
                    "flag": "🇹🇭",
                    "description": "Vibrant and bold flavors from sweet to spicy, famous for its curries, noodle dishes, and street food"
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "Excludes all animal products, including dairy, eggs, and often honey."
                },
                {
                    "label": "Gluten Free",
                    "description": "Avoids gluten-containing grains such as wheat, barley, and rye."
                }
            ],
            "price": "££",
            "rating": 4.5,
            "review_count": 200,
            "ambience": [
                {
                    "label": "Casual",
                    "description": "A relaxed and informal atmosphere for everyday dining."
                },
                {
                    "label": "Outdoor Dining",
                    "description": "Enjoy meals in the open air, from patios to garden settings."
                }
            ],
            "accessibility": "Wheelchair accessible entrance and restroom",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "10:00 AM - 10:00 PM",
                "Tuesday": "10:00 AM - 10:00 PM",
                "Wednesday": "10:00 AM - 10:00 PM",
                "Thursday": "10:00 AM - 10:00 PM",
                "Friday": "10:00 AM - 11:00 PM",
                "Saturday": "9:00 AM - 11:00 PM",
                "Sunday": "9:00 AM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "627fdaed8f8d4e3b8fe7a193",
            "name": "The Spice Garden",
            "cuisine": [
                {
                    "label": "Indian",
                    "flag": "🇮🇳",
                    "description": "Diverse and aromatic, spanning spicy curries to flavorful biryanis, reflecting India's regional culinary traditions"
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "icon": "",
                    "description": "Excludes all animal products, including dairy, eggs, and often honey."
                }
            ],
            "price": "£££",
            "rating": 4.5,
            "review_count": 152,
            "ambience": [
                {
                    "label": "Casual",
                    "icon": "MdLunchDining",
                    "description": "A relaxed and informal atmosphere for everyday dining."
                },
                {
                    "label": "Family-Friendly",
                    "icon": "MdFamilyRestroom",
                    "description": "Welcoming to families with children, offering a comfortable dining environment."
                }
            ],
            "accessibility": "Wheelchair accessible entrance and restroom, braille menu available.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "12:00 PM - 10:00 PM",
                "Tuesday": "12:00 PM - 10:00 PM",
                "Wednesday": "12:00 PM - 10:00 PM",
                "Thursday": "12:00 PM - 10:00 PM",
                "Friday": "12:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "8a70e8b3-3d80-4e67-a851-33f0a8d0f6e4",
            "name": "Bella Vista Italiano",
            "cuisine": [
                {
                    "label": "Italian",
                    "flag": "🇮🇹",
                    "description": "From comforting pasta dishes to exquisite seafood, Italian cuisine combines simplicity with depth of flavor"
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Excludes meat and fish, but may include dairy products and eggs."
                }
            ],
            "price": "£££",
            "rating": 4.8,
            "review_count": 320,
            "ambience": [
                {
                    "label": "Romantic",
                    "description": "Cozy and intimate, perfect for dates and special occasions."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "Reserved and serene, ideal for private conversations and peaceful meals."
                }
            ],
            "accessibility": "Wheelchair accessible seating and restroom.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "5:00 PM - 11:00 PM",
                "Wednesday": "5:00 PM - 11:00 PM",
                "Thursday": "5:00 PM - 11:00 PM",
                "Friday": "5:00 PM - 12:00 AM",
                "Saturday": "5:00 PM - 12:00 AM",
                "Sunday": "5:00 PM - 11:00 PM"
            }
        },
        {
            "restaurant_id": "b1d113c7-6b76-41e3-9b98-68d6b35812f9",
            "name": "Seoul Spice",
            "cuisine": [
                {
                    "label": "Korean",
                    "flag": "🇰🇷",
                    "description": "Bold and spicy, with dishes like kimchi, BBQ, and bibimbap, highlighting Korea's rich culinary heritage"
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "Avoids gluten-containing grains such as wheat, barley, and rye."
                }
            ],
            "price": "££££",
            "rating": 4.6,
            "review_count": 235,
            "ambience": [
                {
                    "label": "Trendy/Chic",
                    "description": "Fashionable and stylish, with a modern vibe and a young crowd."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "Energetic and vibrant, often with music or entertainment."
                }
            ],
            "accessibility": "Wheelchair accessible entrance.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "11:00 AM - 10:00 PM",
                "Tuesday": "11:00 AM - 10:00 PM",
                "Wednesday": "11:00 AM - 10:00 PM",
                "Thursday": "11:00 AM - 10:00 PM",
                "Friday": "11:00 AM - 11:00 PM",
                "Saturday": "11:00 AM - 11:00 PM",
                "Sunday": "11:00 AM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "f7b3b8c4-7b1b-4b1b-8e0d-3b5f3e6f1b1b",
            "name": "Le Parisien",
            "cuisine": [
                {
                    "label": "French",
                    "flag": "🇫🇷",
                    "description": "Elegant and refined, with classic dishes like coq au vin and escargot, showcasing France's culinary sophistication"
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Excludes meat and fish, but may include dairy products and eggs."
                }
            ],
            "price": "£££",
            "rating": 4.7,
            "review_count": 280,
            "ambience": [
                {
                    "label": "Formal/Fine Dining",
                    "description": "Sophisticated and upscale, with impeccable service and attention to detail."
                },
                {
                    "label": "Historic/Quirky",
                    "description": "Set in a historic building or with unique decor, offering a memorable dining experience."
                }
            ],
            "accessibility": "Wheelchair accessible entrance and restroom.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 11:00 PM",
                "Wednesday": "6:00 PM - 11:00 PM",
                "Thursday": "6:00 PM - 11:00 PM",
                "Friday": "6:00 PM - 12:00 AM",
                "Saturday": "6:00 PM - 12:00 AM",
                "Sunday": "6:00 PM - 11:00 PM"
            }
        },
        {
            "restaurant_id": "c83a1f22-e9e5-4fb7-8bde-9c1d4d45f10a",
            "name": "Casa Mexicana",
            "cuisine": [
                {
                    "label": "Mexican",
                    "flag": "🇲🇽",
                    "description": "Colorful and diverse, from street food tacos to complex mole sauces, blending native and Spanish influences"
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Excludes meat and fish, but may include dairy products and eggs."
                },
                {
                    "label": "Gluten Free",
                    "description": "Avoids gluten-containing grains such as wheat, barley, and rye."
                }
            ],
            "price": "££",
            "rating": 4.4,
            "review_count": 167,
            "ambience": [
                {
                    "label": "Lively/Bustling",
                    "description": "Energetic and vibrant, often with music or entertainment."
                },
                {
                    "label": "Casual",
                    "description": "A relaxed and informal atmosphere for everyday dining."
                }
            ],
            "accessibility": "Wheelchair accessible entrance, seating, and restroom.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "11:00 AM - 10:00 PM",
                "Tuesday": "11:00 AM - 10:00 PM",
                "Wednesday": "11:00 AM - 10:00 PM",
                "Thursday": "11:00 AM - 11:00 PM",
                "Friday": "11:00 AM - 12:00 AM",
                "Saturday": "11:00 AM - 12:00 AM",
                "Sunday": "11:00 AM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "7aef4053-8aaf-4d64-bf81-4c2a6625baca",
            "name": "Tokyo Terrace",
            "cuisine": [
                {
                    "label": "Japanese",
                    "flag": "🇯🇵",
                    "description": "Elegant and diverse, ranging from sushi and sashimi to warming ramen bowls."
                }
            ],
            "dietary": [
                {
                    "label": "Pescatarian",
                    "description": "Excludes meat except for fish and seafood, may include dairy and eggs."
                }
            ],
            "price": "£££",
            "rating": 4.6,
            "review_count": 190,
            "ambience": [
                {
                    "label": "Modern/Contemporary",
                    "description": "Sleek and contemporary, with innovative designs and modern cuisine."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "Reserved and serene, ideal for private conversations and peaceful meals."
                }
            ],
            "accessibility": "Wheelchair accessible entrance and restroom.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "12:00 PM - 10:00 PM",
                "Tuesday": "12:00 PM - 10:00 PM",
                "Wednesday": "12:00 PM - 10:00 PM",
                "Thursday": "12:00 PM - 11:00 PM",
                "Friday": "12:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "5e77f9e3-cd6f-42ae-8e2f-7c3b69a6d8cb",
            "name": "Mediterraneo Bliss",
            "cuisine": [
                {
                    "label": "Mediterranean",
                    "description": "Sun-drenched flavors from the Mediterranean coast, emphasising fresh ingredients and healthy dishes."
                },
                {
                    "label": "Greek",
                    "flag": "🇬🇷",
                    "description": "Fresh, flavorful, and steeped in tradition, Greek cuisine offers a feast of Mediterranean delights every dish is a celebration of simplicity and zest."
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "Excludes all animal products, including dairy, eggs, and often honey."
                },
                {
                    "label": "Dairy Free",
                    "description": "Suitable for lactose intolerant individuals or those avoiding dairy for ethical or health reasons, excluding all dairy products."
                }
            ],
            "price": "££",
            "rating": 4.3,
            "review_count": 225,
            "ambience": [
                {
                    "label": "Rustic/Country",
                    "description": "A cozy, country vibe with traditional comfort foods and a warm atmosphere."
                },
                {
                    "label": "Outdoor Dining",
                    "description": "Enjoy meals in the open air, from patios to garden settings."
                }
            ],
            "accessibility": "Wheelchair accessible entrance, restroom, and dining area.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "11:00 AM - 10:00 PM",
                "Wednesday": "11:00 AM - 10:00 PM",
                "Thursday": "11:00 AM - 10:00 PM",
                "Friday": "11:00 AM - 11:00 PM",
                "Saturday": "10:00 AM - 11:00 PM",
                "Sunday": "10:00 AM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "9f78c8ff-3b6b-4711-8bcb-aefb6cdf99b3",
            "name": "Brazilian Beats",
            "cuisine": [
                {
                    "label": "Brazilian",
                    "flag": "🇧🇷",
                    "description": "Celebrates the diverse culinary heritage of Brazil, from churrasco (barbecue) to feijoada (black bean stew), highlighting the country's rich flavors and ingredients."
                }
            ],
            "dietary": [
                {
                    "label": "Halal",
                    "description": "Adheres to Islamic dietary laws, including specific methods of slaughter."
                }
            ],
            "price": "££",
            "rating": 4.5,
            "review_count": 198,
            "ambience": [
                {
                    "label": "Lively/Bustling",
                    "description": "Energetic and vibrant, often with music or entertainment."
                },
                {
                    "label": "Casual",
                    "description": "A relaxed and informal atmosphere for everyday dining."
                }
            ],
            "accessibility": "Fully accessible, including restroom facilities and parking.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "5:00 PM - 11:00 PM",
                "Wednesday": "5:00 PM - 11:00 PM",
                "Thursday": "5:00 PM - 11:00 PM",
                "Friday": "5:00 PM - 12:00 AM",
                "Saturday": "12:00 PM - 12:00 AM",
                "Sunday": "12:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "bcb83d5e-5c10-4b8b-a260-5d9a9a638c74",
            "name": "Vietnamese Vistas",
            "cuisine": [
                {
                    "label": "Vietnamese",
                    "flag": "🇻🇳",
                    "description": "Fresh, light, and fragrant, characterised by its use of herbs, noodles, and distinctive pho"
                }
            ],
            "dietary": [
                {
                    "label": "Plant Based",
                    "description": "Primarily focuses on foods derived from plants, including vegetables, grains, nuts, and fruits, with minimal or no animal products."
                }
            ],
            "price": "£££",
            "rating": 4.7,
            "review_count": 210,
            "ambience": [
                {
                    "label": "Modern/Contemporary",
                    "description": "Sleek and contemporary, with innovative designs and modern cuisine."
                },
                {
                    "label": "Quiet",
                    "description": "Reserved and serene, ideal for private conversations and peaceful meals."
                }
            ],
            "accessibility": "Wheelchair accessible entrance and restroom, with braille menus available.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "12:00 PM - 10:00 PM",
                "Wednesday": "12:00 PM - 10:00 PM",
                "Thursday": "12:00 PM - 10:00 PM",
                "Friday": "12:00 PM - 11:00 PM",
                "Saturday": "11:00 AM - 11:00 PM",
                "Sunday": "11:00 AM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "e2fd8a4b-d4c2-4b09-a5b4-2d6e5aa6f3ae",
            "name": "Nairobi Nibbles",
            "cuisine": [
                {
                    "label": "African",
                    "description": "Diverse cuisines from across the continent, known for their use of grains, beans, and rich spices."
                },
                {
                    "label": "Ethiopian",
                    "flag": "🇪🇹",
                    "description": "Characterised by spicy stews and injera bread, offering a communal dining experience."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Excludes meat and fish, but may include dairy products and eggs."
                },
                {
                    "label": "Gluten Free",
                    "description": "Avoids gluten-containing grains such as wheat, barley, and rye."
                }
            ],
            "price": "££",
            "rating": 4.6,
            "review_count": 187,
            "ambience": [
                {
                    "label": "Artistic/Bohemian",
                    "description": "Unique and creative spaces filled with art and an eclectic atmosphere."
                },
                {
                    "label": "Casual",
                    "description": "A relaxed and informal atmosphere for everyday dining."
                }
            ],
            "accessibility": "Fully accessible, with visual aids and service animal friendly.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "10:00 AM - 9:00 PM",
                "Wednesday": "10:00 AM - 9:00 PM",
                "Thursday": "10:00 AM - 9:00 PM",
                "Friday": "10:00 AM - 10:00 PM",
                "Saturday": "9:00 AM - 10:00 PM",
                "Sunday": "9:00 AM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "3a76a612-cd61-4a5e-b3f8-50e36f6e5a55",
            "name": "Caribbean Waves",
            "cuisine": [
                {
                    "label": "Caribbean",
                    "description": "A fusion of African, European, and East Indian flavors, featuring seafood, tropical fruits, and spicy meats"
                }
            ],
            "dietary": [
                {
                    "label": "Pescatarian",
                    "description": "Excludes meat except for fish and seafood, may include dairy and eggs."
                }
            ],
            "price": "££",
            "rating": 4.5,
            "review_count": 205,
            "ambience": [
                {
                    "label": "Seaside/Beachfront",
                    "description": "Relaxed dining with sea views, often featuring seafood and breezy terraces."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "Energetic and vibrant, often with music or entertainment."
                }
            ],
            "accessibility": "Wheelchair accessible facilities, including entrance, seating, and restrooms.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "12:00 PM - 10:00 PM",
                "Wednesday": "12:00 PM - 10:00 PM",
                "Thursday": "12:00 PM - 10:00 PM",
                "Friday": "12:00 PM - 11:00 PM",
                "Saturday": "11:00 AM - 11:00 PM",
                "Sunday": "11:00 AM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "91b8c7e2-3e5b-4a9e-9b2e-37d8c8c34a3a",
            "name": "Gastro Gaudi",
            "cuisine": [
                {
                    "label": "Spanish",
                    "flag": "🇪🇸",
                    "description": "Famous for tapas, paella, and seafood, Spanish cuisine is all about sharing and enjoying meals together"
                }
            ],
            "dietary": [
                {
                    "label": "Nut Free",
                    "description": "Caters to individuals with nut allergies, excluding all forms of tree nuts and peanuts from the diet"
                }
            ],
            "price": "£££",
            "rating": 4.8,
            "review_count": 268,
            "ambience": [
                {
                    "label": "Romantic",
                    "description": "Cozy and intimate, perfect for dates and special occasions."
                },
                {
                    "label": "Historic/Classic",
                    "description": "Rich in history with classic décor, offering a timeless dining experience."
                }
            ],
            "accessibility": "Wheelchair accessible entrance, seating, restroom, and visual aid menus.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "5:00 PM - 11:00 PM",
                "Wednesday": "5:00 PM - 11:00 PM",
                "Thursday": "5:00 PM - 11:00 PM",
                "Friday": "5:00 PM - 12:00 AM",
                "Saturday": "5:00 PM - 12:00 AM",
                "Sunday": "5:00 PM - 11:00 PM"
            }
        },
        {
            "restaurant_id": "ad5467ca-6f08-4c0d-8d8a-6fda3e60b84a",
            "name": "Fusion Feast",
            "cuisine": [
                {
                    "label": "Fusion",
                    "description": "A blend of culinary traditions and techniques, creating innovative and unique dishes"
                }
            ],
            "dietary": [
                {
                    "label": "Plant Based",
                    "description": "Primarily focuses on foods derived from plants, including vegetables, grains, nuts, and fruits, with minimal or no animal products."
                }
            ],
            "price": "££",
            "rating": 4.7,
            "review_count": 152,
            "ambience": [
                {
                    "label": "Modern/Contemporary",
                    "description": "Sleek and contemporary, with innovative designs and modern cuisine."
                },
                {
                    "label": "Trendy/Chic",
                    "description": "Fashionable and stylish, with a modern vibe and a young crowd."
                }
            ],
            "accessibility": "Includes features for mobility, visual, and hearing impairments.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "11:00 AM - 10:00 PM",
                "Tuesday": "11:00 AM - 10:00 PM",
                "Wednesday": "11:00 AM - 10:00 PM",
                "Thursday": "11:00 AM - 10:00 PM",
                "Friday": "11:00 AM - 11:00 PM",
                "Saturday": "11:00 AM - 11:00 PM",
                "Sunday": "11:00 AM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "da3ef5ae-3b52-4ac5-8622-e2d232a9a3b8",
            "name": "The Ottoman Table",
            "cuisine": [
                {
                    "label": "Turkish",
                    "flag": "🇹🇷",
                    "description": "Rich and diverse, spanning kebabs, mezze, and sweet pastries, influenced by Ottoman cuisine"
                }
            ],
            "dietary": [
                {
                    "label": "Halal",
                    "description": "Adheres to Islamic dietary laws, including specific methods of slaughter."
                }
            ],
            "price": "££££",
            "rating": 4.9,
            "review_count": 321,
            "ambience": [
                {
                    "label": "Historic/Classic",
                    "description": "Rich in history with classic décor, offering a timeless dining experience."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "Reserved and serene, ideal for private conversations and peaceful meals."
                }
            ],
            "accessibility": "Wheelchair accessible entrance and restroom, braille and large print menus.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "f58e1cf0-5c96-4f2a-9c64-3b7f7972d307",
            "name": "Riverside Ramen",
            "cuisine": [
                {
                    "label": "Japanese",
                    "flag": "🇯🇵",
                    "description": "Elegant and diverse, ranging from sushi and sashimi to warming ramen bowls."
                }
            ],
            "dietary": [
                {
                    "label": "Dairy Free",
                    "description": "Suitable for lactose intolerant individuals or those avoiding dairy for ethical or health reasons, excluding all dairy products."
                }
            ],
            "price": "££",
            "rating": 4.6,
            "review_count": 254,
            "ambience": [
                {
                    "label": "Waterfront Dining",
                    "description": "Dining by the water, offering picturesque views and a tranquil setting."
                },
                {
                    "label": "Modern/Contemporary",
                    "description": "Sleek and contemporary, with innovative designs and modern cuisine."
                }
            ],
            "accessibility": "Wheelchair accessible entrance, seating, and restroom; assistive listening devices available.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "11:00 AM - 9:00 PM",
                "Tuesday": "11:00 AM - 9:00 PM",
                "Wednesday": "11:00 AM - 9:00 PM",
                "Thursday": "11:00 AM - 10:00 PM",
                "Friday": "11:00 AM - 10:00 PM",
                "Saturday": "11:00 AM - 10:00 PM",
                "Sunday": "11:00 AM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "4ec4d7f2-834a-4715-ad34-f55a4d9876c3",
            "name": "Punjabi Plates",
            "cuisine": [
                {
                    "label": "Indian",
                    "flag": "🇮🇳",
                    "description": "Diverse and aromatic, spanning spicy curries to flavorful biryanis, reflecting India's regional culinary traditions"
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "Excludes all animal products, including dairy, eggs, and often honey."
                }
            ],
            "price": "££",
            "rating": 4.7,
            "review_count": 289,
            "ambience": [
                {
                    "label": "Family-Friendly",
                    "description": "Welcoming to families with children, offering a comfortable dining environment."
                },
                {
                    "label": "Casual",
                    "description": "A relaxed and informal atmosphere for everyday dining."
                }
            ],
            "accessibility": "Wheelchair accessible facilities, kid-friendly menus, and high chairs available.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "11:00 AM - 10:00 PM",
                "Tuesday": "11:00 AM - 10:00 PM",
                "Wednesday": "11:00 AM - 10:00 PM",
                "Thursday": "11:00 AM - 10:00 PM",
                "Friday": "11:00 AM - 11:00 PM",
                "Saturday": "11:00 AM - 11:00 PM",
                "Sunday": "11:00 AM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "9d82c5a8-ac4d-4a5f-89c5-586f281d3e76",
            "name": "Garden of Vegan",
            "cuisine": [
                {
                    "label": "Vegan",
                    "description": "Excludes all animal products, including dairy, eggs, and often honey."
                }
            ],
            "dietary": [
                {
                    "label": "Plant Based",
                    "description": "Primarily focuses on foods derived from plants, including vegetables, grains, nuts, and fruits, with minimal or no animal products."
                }
            ],
            "price": "££££",
            "rating": 4.8,
            "review_count": 312,
            "ambience": [
                {
                    "label": "Rooftop/Garden",
                    "description": "Outdoor or semi-outdoor spaces with panoramic views or lush gardens."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "Reserved and serene, ideal for private conversations and peaceful meals."
                }
            ],
            "accessibility": "Accessible garden dining area, restrooms with wheelchair access, and menu options for various dietary restrictions.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "12:00 PM - 9:00 PM",
                "Wednesday": "12:00 PM - 9:00 PM",
                "Thursday": "12:00 PM - 9:00 PM",
                "Friday": "12:00 PM - 10:00 PM",
                "Saturday": "10:00 AM - 10:00 PM",
                "Sunday": "10:00 AM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "e5ec3133-7d67-4428-9233-4f4d6aceb6c0",
            "name": "The Szechuan Serenade",
            "cuisine": [
                {
                    "label": "Chinese",
                    "flag": "🇨🇳",
                    "description": "A vast culinary landscape offering everything from dim sum to Sichuan spice, showcasing China's regional diversity"
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "Avoids gluten-containing grains such as wheat, barley, and rye."
                }
            ],
            "price": "£££",
            "rating": 4.5,
            "review_count": 278,
            "ambience": [
                {
                    "label": "Modern/Contemporary",
                    "description": "Sleek and contemporary, with innovative designs and modern cuisine."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "Energetic and vibrant, often with music or entertainment."
                }
            ],
            "accessibility": "Spacious dining area accessible for wheelchair users, with allergy-friendly menu options.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "5:00 PM - 11:00 PM",
                "Wednesday": "5:00 PM - 11:00 PM",
                "Thursday": "5:00 PM - 11:00 PM",
                "Friday": "5:00 PM - 12:00 AM",
                "Saturday": "12:00 PM - 12:00 AM",
                "Sunday": "12:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "3f8b3b9e-3339-46b8-8b22-2f2752f55f8c",
            "name": "The Levantine Lantern",
            "cuisine": [
                {
                    "label": "Lebanese",
                    "flag": "🇱🇧",
                    "description": "Offers an array of mezze, grilled meats, and salads, known for its vibrant flavors and freshness."
                },
                {
                    "label": "Mediterranean",
                    "description": "Sun-drenched flavors from the Mediterranean coast, emphasising fresh ingredients and healthy dishes."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Excludes meat and fish, but may include dairy products and eggs."
                },
                {
                    "label": "Halal",
                    "description": "Adheres to Islamic dietary laws, including specific methods of slaughter."
                }
            ],
            "price": "££",
            "rating": 4.6,
            "review_count": 165,
            "ambience": [
                {
                    "label": "Artistic/Bohemian",
                    "description": "Unique and creative spaces filled with art and an eclectic atmosphere."
                },
                {
                    "label": "Family-Friendly",
                    "description": "Welcoming to families with children, offering a comfortable dining environment."
                }
            ],
            "accessibility": "Wheelchair accessible, family-friendly facilities including baby changing stations.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "11:00 AM - 10:00 PM",
                "Wednesday": "11:00 AM - 10:00 PM",
                "Thursday": "11:00 AM - 10:00 PM",
                "Friday": "11:00 AM - 11:00 PM",
                "Saturday": "10:00 AM - 11:00 PM",
                "Sunday": "10:00 AM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "1d7a8a4d-e9bf-4b25-a8a5-608bae50a0f2",
            "name": "Indigo Indulgence",
            "cuisine": [
                {
                    "label": "Indian",
                    "flag": "🇮🇳",
                    "description": "Spicy curries, rice dishes, and fish, reflecting India's rich culinary traditions and flavors"
                },
                {
                    "label": "Fusion",
                    "description": "A blend of culinary traditions and techniques, creating innovative and unique dishes"
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "Excludes all animal products, including dairy, eggs, and often honey."
                },
                {
                    "label": "Gluten Free",
                    "description": "Avoids gluten-containing grains such as wheat, barley, and rye."
                }
            ],
            "price": "£££",
            "rating": 4.7,
            "review_count": 202,
            "ambience": [
                {
                    "label": "Modern/Contemporary",
                    "description": "Sleek and contemporary, with innovative designs and modern cuisine."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "Reserved and serene, ideal for private conversations and peaceful meals."
                }
            ],
            "accessibility": "Fully accessible, with options for diners with specific dietary requirements.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "5:00 PM - 10:00 PM",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "5c6b3a8e-6431-4f3b-abc3-7d6d8d2a159f",
            "name": "Cape Town Eats",
            "cuisine": [
                {
                    "label": "South African",
                    "description": "A rich blend of indigenous and international influences, featuring game meats, seafood, and spicy curries."
                }
            ],
            "dietary": [
                {
                    "label": "Halal",
                    "description": "Adheres to Islamic dietary laws, including specific methods of slaughter."
                },
                {
                    "label": "Gluten Free",
                    "description": "Avoids gluten-containing grains such as wheat, barley, and rye."
                }
            ],
            "price": "£££",
            "rating": 4.9,
            "review_count": 184,
            "ambience": [
                {
                    "label": "Panoramic View",
                    "description": "Restaurants with high vantage points for breathtaking city or landscape views."
                },
                {
                    "label": "Elegant",
                    "description": "Sophisticated atmosphere with a focus on luxury and fine dining."
                }
            ],
            "accessibility": "Elevator access to dining area, wheelchair-accessible restrooms, menu in braille.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 11:00 PM",
                "Wednesday": "6:00 PM - 11:00 PM",
                "Thursday": "6:00 PM - 11:00 PM",
                "Friday": "6:00 PM - 12:00 AM",
                "Saturday": "6:00 PM - 12:00 AM",
                "Sunday": "6:00 PM - 11:00 PM"
            }
        },
        {
            "restaurant_id": "9d7b23b4-d6f6-49c4-91b2-2f6e9d6739ac",
            "name": "Baltic Bistro",
            "cuisine": [
                {
                    "label": "Scandinavian",
                    "description": "A celebration of simplicity and freshness, featuring seafood, pickled vegetables, and hearty breads."
                }
            ],
            "dietary": [
                {
                    "label": "Pescatarian",
                    "description": "Excludes meat except for fish and seafood, may include dairy and eggs."
                }
            ],
            "price": "££",
            "rating": 4.8,
            "review_count": 211,
            "ambience": [
                {
                    "label": "Casual",
                    "description": "A relaxed and informal atmosphere for everyday dining."
                },
                {
                    "label": "Family-Friendly",
                    "description": "Welcoming to families with children, offering a comfortable dining environment."
                }
            ],
            "accessibility": "Fully accessible for wheelchairs, offering a comfortable dining experience for everyone.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "11:00 AM - 8:00 PM",
                "Tuesday": "11:00 AM - 8:00 PM",
                "Wednesday": "11:00 AM - 8:00 PM",
                "Thursday": "11:00 AM - 8:00 PM",
                "Friday": "11:00 AM - 9:00 PM",
                "Saturday": "11:00 AM - 9:00 PM",
                "Sunday": "11:00 AM - 8:00 PM"
            }
        },
        {
            "restaurant_id": "ac9e52f7-a6f1-46c2-bfb2-22e59a8d0ecd",
            "name": "The Andean Alcove",
            "cuisine": [
                {
                    "label": "Spanish",
                    "description": "Features a mix of indigenous spanish and influences from various immigrant groups, known for ceviche, potatoes, and rich, flavorful stews."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "Offers a variety of dishes without gluten-containing grains, catering to celiac and gluten-sensitive diners."
                }
            ],
            "price": "£££",
            "rating": 4.7,
            "review_count": 197,
            "ambience": [
                {
                    "label": "Modern/Contemporary",
                    "description": "Sleek and stylish décor with a modern twist, providing a fresh and vibrant dining experience."
                },
                {
                    "label": "Casual",
                    "description": "A relaxed and friendly environment perfect for a laid-back meal."
                }
            ],
            "accessibility": "Provides full wheelchair accessibility, including restrooms and parking.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "5:00 PM - 10:00 PM",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "d4cceb85-56d4-4a57-9351-eeb5b21ca09d",
            "name": "Arctic Aromas",
            "cuisine": [
                {
                    "label": "Scandinavian",
                    "description": "Emphasizes meals prepared with local, seasonal ingredients, including a variety of seafood, wild game, and foraged vegetables."
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "Provides an array of plant-based dishes, ensuring a delightful dining experience without animal products."
                }
            ],
            "price": "££",
            "rating": 4.6,
            "review_count": 162,
            "ambience": [
                {
                    "label": "Quiet/Intimate",
                    "description": "An ideal setting for those seeking a peaceful meal in a cozy, intimate environment."
                },
                {
                    "label": "Elegant",
                    "description": "Offers an upscale dining experience with a focus on fine ingredients and exceptional service."
                }
            ],
            "accessibility": "Accessible dining options with menu descriptions for visually impaired guests.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "6:00 PM - 11:00 PM",
                "Sunday": "6:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "f3b3b3b3-3b3b-3b3b-3b3b-3b3b3b3b3b3b",
            "name": "The Moroccan Medina",
            "cuisine": [
                {
                    "label": "Moroccan",
                    "flag": "🇲🇦",
                    "description": "Aromatic and flavorful, featuring tagines, couscous, and a blend of sweet and savory spices."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Excludes meat and fish, but may include dairy products and eggs."
                },
                {
                    "label": "Halal",
                    "description": "Adheres to Islamic dietary laws, including specific methods of slaughter."
                }
            ],
            "price": "££",
            "rating": 4.5,
            "review_count": 198,
            "ambience": [
                {
                    "label": "Exotic",
                    "description": "A vibrant and colorful setting, transporting diners to the heart of Morocco."
                },
                {
                    "label": "Casual",
                    "description": "A relaxed and informal atmosphere for everyday dining."
                }
            ],
            "accessibility": "Fully accessible, including wheelchair-friendly facilities and braille menus.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "b6ff76e8-8f23-4c92-b5e9-f54b9f73738c",
            "name": "Ocean's Whisper",
            "cuisine": [
                {
                    "label": "Seafood",
                    "description": "Specializing in fresh, sustainable seafood dishes, offering everything from oysters to meticulously prepared fish entrees."
                }
            ],
            "dietary": [
                {
                    "label": "Pescatarian",
                    "description": "Caters exclusively to pescatarian diets, with a wide variety of fish and shellfish options."
                }
            ],
            "price": "£££",
            "rating": 4.8,
            "review_count": 225,
            "ambience": [
                {
                    "label": "Seaside/Beachfront",
                    "description": "Enjoy the gentle sea breeze and the sound of waves in a relaxed, beachfront setting."
                },
                {
                    "label": "Romantic",
                    "description": "Perfect for date nights, with stunning views and a cozy atmosphere."
                }
            ],
            "accessibility": "Features wheelchair-accessible entrances and restrooms, with attentive staff ready to assist.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "8823ac1c-55f5-4b48-a4e2-f2ceb9d8a7fc",
            "name": "The Spice Route",
            "cuisine": [
                {
                    "label": "Indian",
                    "description": "Showcases the rich diversity of Indian cuisine, from northern creamy gravies to southern spicy treats."
                },
                {
                    "label": "Fusion",
                    "description": "Blends traditional Indian flavors with global culinary techniques, creating unique and innovative dishes."
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "A broad selection of vegan dishes that do not compromise on traditional flavors."
                },
                {
                    "label": "Gluten Free",
                    "description": "Offers a variety of gluten-free options to cater to sensitive diets."
                }
            ],
            "price": "££",
            "rating": 4.5,
            "review_count": 250,
            "ambience": [
                {
                    "label": "Trendy/Chic",
                    "description": "A stylish and contemporary atmosphere that’s perfect for foodies looking for the latest dining trends."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "A vibrant and energetic setting, ideal for those who enjoy dining in a lively atmosphere."
                }
            ],
            "accessibility": "Ensures a comfortable dining experience for all guests, with accessible seating and menu options for dietary restrictions.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "6:00 PM - 10:00 PM",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "1f0e3dad-9993-4e3e-a91e-c1ec342b7b51",
            "name": "Bella Napoli",
            "cuisine": [
                {
                    "label": "Italian",
                    "description": "Authentic Neapolitan pizzas and a range of classic Italian pasta dishes, emphasizing fresh ingredients and traditional techniques."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "A wide selection of vegetarian options, celebrating Italy's love for garden-fresh produce."
                }
            ],
            "price": "££",
            "rating": 4.6,
            "review_count": 189,
            "ambience": [
                {
                    "label": "Family-Friendly",
                    "description": "A warm, welcoming atmosphere perfect for family gatherings and celebrations."
                },
                {
                    "label": "Casual",
                    "description": "A laid-back setting that's ideal for a relaxed dining experience."
                }
            ],
            "accessibility": "Fully accessible for all guests, ensuring a comfortable and enjoyable visit for everyone.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "11:00 AM - 10:00 PM",
                "Tuesday": "11:00 AM - 10:00 PM",
                "Wednesday": "11:00 AM - 10:00 PM",
                "Thursday": "11:00 AM - 10:00 PM",
                "Friday": "11:00 AM - 11:00 PM",
                "Saturday": "11:00 AM - 11:00 PM",
                "Sunday": "11:00 AM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "98dce83d-ae0e-4c31-ba53-1b1c3df17b5d",
            "name": "Saffron Silk",
            "cuisine": [
                {
                    "label": "Middle Eastern",
                    "description": "Offers a tapestry of flavors from across the Middle East, including aromatic kebabs, hummus, and baklava."
                }
            ],
            "dietary": [
                {
                    "label": "Halal",
                    "description": "All meats are prepared according to Halal principles, catering to Muslim dietary requirements."
                }
            ],
            "price": "££",
            "rating": 4.7,
            "review_count": 174,
            "ambience": [
                {
                    "label": "Romantic",
                    "description": "An intimate and cozy setting, perfect for date nights and special occasions."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "Provides a serene dining environment for guests seeking a peaceful meal."
                }
            ],
            "accessibility": "Offers accessible dining options for guests with mobility challenges.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "5:00 PM - 11:00 PM",
                "Sunday": "5:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "3da541b9-89b8-4f6a-b92b-fd7119c6eb5d",
            "name": "The Zen Garden",
            "cuisine": [
                {
                    "label": "Japanese",
                    "description": "Focuses on the art of sushi and kaiseki cuisine, offering a tranquil dining experience reminiscent of a Zen garden."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Includes a selection of vegetarian sushi and dishes inspired by Buddhist vegetarian cooking."
                }
            ],
            "price": "£££",
            "rating": 4.9,
            "review_count": 210,
            "ambience": [
                {
                    "label": "Quiet/Intimate",
                    "description": "A peaceful, Zen-like atmosphere that offers a retreat from the busy world outside."
                },
                {
                    "label": "Modern/Contemporary",
                    "description": "Blends traditional Japanese aesthetics with modern design elements for a unique dining environment."
                }
            ],
            "accessibility": "Mindfully designed to be accessible, with attention to detail that ensures a comfortable experience for all guests.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "e2f8902e-5e2f-4f7b-834b-3c7bbea3c7e3",
            "name": "Caribe Cantina",
            "cuisine": [
                {
                    "label": "Caribbean",
                    "description": "A vibrant fusion of African, Creole, and Latin American flavors, offering seafood, jerk chicken, and rum-infused desserts."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "A wide selection of gluten-free dishes, emphasizing fresh fruits, vegetables, and naturally gluten-free grains."
                }
            ],
            "price": "££",
            "rating": 4.5,
            "review_count": 143,
            "ambience": [
                {
                    "label": "Lively/Bustling",
                    "description": "A colorful and energetic setting that mirrors the lively spirit of the Caribbean."
                },
                {
                    "label": "Outdoor Dining",
                    "description": "Offers an al fresco dining experience, allowing guests to enjoy the vibrant atmosphere in a natural setting."
                }
            ],
            "accessibility": "Easily accessible with ample outdoor seating, accommodating guests with mobility needs.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "12:00 PM - 10:00 PM",
                "Wednesday": "12:00 PM - 10:00 PM",
                "Thursday": "12:00 PM - 10:00 PM",
                "Friday": "12:00 PM - 11:00 PM",
                "Saturday": "11:00 AM - 11:00 PM",
                "Sunday": "11:00 AM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "8d726217-3e3c-4d92-85b9-c1234567890a",
            "name": "Polar Bites",
            "cuisine": [
                {
                    "label": "Scandinavian",
                    "description": "Simplistic yet profound flavors from the north, focusing on seafood, wild game, and foraged berries."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "A selection of dishes that cater to vegetarians, utilizing seasonal and local produce."
                }
            ],
            "price": "£££",
            "rating": 4.6,
            "review_count": 132,
            "ambience": [
                {
                    "label": "Modern/Contemporary",
                    "description": "Minimalistic design paired with a cozy atmosphere, embodying the essence of Nordic simplicity."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "A tranquil dining environment perfect for those seeking a peaceful meal experience."
                }
            ],
            "accessibility": "Equipped with features to ensure accessibility for all, including wheelchair-accessible dining areas.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "5:00 PM - 10:00 PM",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "9e837c4d-359c-4d21-a5b3-c9876543210b",
            "name": "Marrakesh Mosaic",
            "cuisine": [
                {
                    "label": "Moroccan",
                    "description": "An exotic blend of North African flavors, featuring tagines, couscous, and mint tea."
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "Offers a variety of vegan options, highlighting Morocco's rich assortment of vegetables and legumes."
                }
            ],
            "price": "££",
            "rating": 4.7,
            "review_count": 159,
            "ambience": [
                {
                    "label": "Artistic/Bohemian",
                    "description": "Decor inspired by Moroccan art and architecture, providing a colorful and vibrant dining setting."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "A dynamic atmosphere that reflects the bustling streets of Marrakesh."
                }
            ],
            "accessibility": "Designed to be welcoming for all, with accessible entrances and comfortable seating arrangements.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "12:00 PM - 10:00 PM",
                "Wednesday": "12:00 PM - 10:00 PM",
                "Thursday": "12:00 PM - 10:00 PM",
                "Friday": "12:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "adbc1234-5678-9abc-def0-1234567890c",
            "name": "Tapas Trails",
            "cuisine": [
                {
                    "label": "Spanish",
                    "description": "Small plates packed with big flavors, perfect for sharing. Features classic dishes like patatas bravas and gambas al ajillo."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "Many naturally gluten-free options available, ensuring a worry-free dining experience for those with sensitivities."
                }
            ],
            "price": "££",
            "rating": 4.8,
            "review_count": 187,
            "ambience": [
                {
                    "label": "Casual",
                    "description": "A relaxed atmosphere that’s ideal for informal dining and socializing."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "Emulates the lively tapas bars of Spain, creating a vibrant dining experience."
                }
            ],
            "accessibility": "Accommodates guests with mobility and dietary needs, ensuring a comfortable visit for everyone.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "a1b2c3d4-e5f6-7890-1234-g5h6i7j8k9l0",
            "name": "The Silk Road",
            "cuisine": [
                {
                    "label": "Central Asian",
                    "description": "A culinary journey along the ancient Silk Road, featuring a blend of spices and flavors from East and Central Asia."
                }
            ],
            "dietary": [
                {
                    "label": "Halal",
                    "description": "Offering a selection of halal-certified meats and dishes prepared according to Islamic dietary laws."
                }
            ],
            "price": "£££",
            "rating": 4.9,
            "review_count": 120,
            "ambience": [
                {
                    "label": "Historic/Classic",
                    "description": "Evokes the spirit of ancient caravanserais with traditional decor and music."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "A serene atmosphere, ideal for enjoying deep conversations over a shared meal."
                }
            ],
            "accessibility": "The dining area and restrooms are fully accessible, ensuring a welcoming experience for all guests.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "5:00 PM - 10:00 PM",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "m9n8o7p6-q5r4s3t2-1u2v3w4x-5y6z7a8b",
            "name": "Garden of Eden",
            "cuisine": [
                {
                    "label": "Vegan",
                    "description": "A paradise for plant-based cuisine, focusing on innovative and delicious vegan dishes made with organic ingredients."
                }
            ],
            "dietary": [
                {
                    "label": "Plant Based",
                    "description": "Exclusively serving dishes derived from plants, free from animal products and by-products."
                }
            ],
            "price": "££",
            "rating": 4.8,
            "review_count": 140,
            "ambience": [
                {
                    "label": "Rustic/Country",
                    "description": "A cozy, earthy environment that celebrates nature with an abundance of plants and natural light."
                },
                {
                    "label": "Outdoor Dining",
                    "description": "Features a beautiful garden dining area where guests can enjoy their meals surrounded by greenery."
                }
            ],
            "accessibility": "Includes garden paths and seating that are accessible for wheelchairs and mobility devices.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "12:00 PM - 9:00 PM",
                "Wednesday": "12:00 PM - 9:00 PM",
                "Thursday": "12:00 PM - 9:00 PM",
                "Friday": "12:00 PM - 10:00 PM",
                "Saturday": "11:00 AM - 10:00 PM",
                "Sunday": "11:00 AM - 8:00 PM"
            }
        },
        {
            "restaurant_id": "x1y2z3a4-b5c6d7e8-f9g0h1i2-j3k4l5m6",
            "name": "Azure Horizon",
            "cuisine": [
                {
                    "label": "Mediterranean",
                    "description": "Celebrating the sun-kissed flavors of the Mediterranean coast, from fresh seafood to vibrant salads."
                }
            ],
            "dietary": [
                {
                    "label": "Pescatarian",
                    "description": "A fantastic array of fish and seafood options, alongside vegetarian Mediterranean classics."
                }
            ],
            "price": "£££",
            "rating": 4.7,
            "review_count": 134,
            "ambience": [
                {
                    "label": "Seaside/Beachfront",
                    "description": "Guests can dine with an unrivaled view of the sea, enhancing the Mediterranean dining experience."
                },
                {
                    "label": "Romantic",
                    "description": "Ideal for couples seeking a romantic meal with breathtaking sunset views."
                }
            ],
            "accessibility": "Beachfront dining accessible to all, with pathways and seating designed for ease of access.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "v7w8x9y0-z1a2b3c4-d5e6f7g8-h9i0j1k2",
            "name": "The Underground",
            "cuisine": [
                {
                    "label": "Gastropub",
                    "description": "A modern take on traditional pub fare, with an emphasis on local ingredients and craft beers."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "Offers a selection of gluten-free versions of classic pub dishes and snacks."
                }
            ],
            "price": "££",
            "rating": 4.6,
            "review_count": 153,
            "ambience": [
                {
                    "label": "Trendy/Chic",
                    "description": "A stylish, subterranean space that's both cozy and contemporary, perfect for casual gatherings."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "Buzzing with energy, mirroring the lively spirit of the best gastropubs."
                }
            ],
            "accessibility": "Designed with accessibility in mind, offering easy access for everyone and an inclusive dining experience.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "4:00 PM - 11:00 PM",
                "Tuesday": "4:00 PM - 11:00 PM",
                "Wednesday": "4:00 PM - 11:00 PM",
                "Thursday": "4:00 PM - 11:00 PM",
                "Friday": "4:00 PM - 12:00 AM",
                "Saturday": "12:00 PM - 12:00 AM",
                "Sunday": "12:00 PM - 11:00 PM"
            }
        },
        {
            "restaurant_id": "001a2b3c-4d5e-6f7g-8h9i-0j1k2l3m4n",
            "name": "The Alpine Lodge",
            "cuisine": [
                {
                    "label": "Swiss",
                    "description": "Specializes in traditional Swiss cuisine, featuring fondue, raclette, and rosti, set in a cozy, mountain-lodge-inspired atmosphere."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Offers a variety of vegetarian options, including cheese fondue and vegetarian rosti."
                }
            ],
            "price": "£££",
            "rating": 4.8,
            "review_count": 102,
            "ambience": [
                {
                    "label": "Rustic/Country",
                    "description": "Evokes the warmth and coziness of a mountain lodge, complete with a fireplace and wooden decor."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "A perfect spot for a quiet, intimate meal, away from the hustle and bustle."
                }
            ],
            "accessibility": "Accessibility-friendly with ramp entrances and ample space for maneuverability.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "5:00 PM - 10:00 PM",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "5n6o7p8q-9r0s-t1u2-v3w4-x5y6z7a8",
            "name": "Crimson Kimono",
            "cuisine": [
                {
                    "label": "Japanese",
                    "description": "An elegant sushi and kaiseki restaurant that brings the refined flavors and aesthetics of Japan to the heart of Bristol."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "Provides an extensive selection of gluten-free sushi and traditional dishes."
                }
            ],
            "price": "££££",
            "rating": 4.9,
            "review_count": 89,
            "ambience": [
                {
                    "label": "Elegant",
                    "description": "A sophisticated, serene setting with traditional Japanese decor and a tranquil koi pond."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "Designed for peaceful dining experiences, ideal for special occasions or romantic evenings."
                }
            ],
            "accessibility": "Offers full accessibility, including entrance ramps and an ADA-compliant restroom.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "6:00 PM - 11:00 PM",
                "Sunday": "6:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "9a8b7c6d-5e4f-3g2h-1i0j-k9l8m7n6",
            "name": "Bourbon Street Bistro",
            "cuisine": [
                {
                    "label": "Cajun",
                    "description": "Brings the vibrant flavors of New Orleans to your table, offering gumbo, jambalaya, and beignets in a lively setting."
                }
            ],
            "dietary": [
                {
                    "label": "Dairy Free",
                    "description": "Includes a selection of dairy-free Cajun classics to accommodate lactose intolerant diners."
                }
            ],
            "price": "££",
            "rating": 4.7,
            "review_count": 157,
            "ambience": [
                {
                    "label": "Lively/Bustling",
                    "description": "A vibrant atmosphere with jazz music, echoing the lively spirit of New Orleans."
                },
                {
                    "label": "Casual",
                    "description": "An informal and friendly environment perfect for family dining or a night out with friends."
                }
            ],
            "accessibility": "The bistro is accessible, ensuring all guests can enjoy the vibrant Cajun flavors.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "12:00 PM - 10:00 PM",
                "Tuesday": "12:00 PM - 10:00 PM",
                "Wednesday": "12:00 PM - 10:00 PM",
                "Thursday": "12:00 PM - 10:00 PM",
                "Friday": "12:00 PM - 11:00 PM",
                "Saturday": "11:00 AM - 11:00 PM",
                "Sunday": "11:00 AM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "5f4e3d2c-1b2a-9d8c-7e6f-5g4h3i2j",
            "name": "Himalayan Hearth",
            "cuisine": [
                {
                    "label": "Nepalese",
                    "description": "Features traditional Nepalese dishes like momo (dumplings), dal bhat (lentil soup), and tandoor-cooked meats, inspired by the Himalayas."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "A rich variety of vegetarian dishes, showcasing the diversity of Nepalese cuisine."
                }
            ],
            "price": "££",
            "rating": 4.6,
            "review_count": 134,
            "ambience": [
                {
                    "label": "Cozy",
                    "description": "A warm, welcoming atmosphere that feels like dining in a Nepalese home."
                },
                {
                    "label": "Family-Friendly",
                    "description": "A comfortable spot for family meals, with options to please everyone."
                }
            ],
            "accessibility": "Comfortably accessible for all patrons, including families with young children and guests with mobility aids.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "5:00 PM - 10:00 PM",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "828e9a8b-77e4-4d04-82f8-8d639a8b9c10",
            "name": "Argentine Ember",
            "cuisine": [
                {
                    "label": "Argentinian",
                    "description": "Emphasizes traditional Argentine grilling techniques, offering a selection of premium cuts of beef, chorizo, and chimichurri."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "A variety of gluten-free options, focusing on naturally gluten-free ingredients like meats and vegetables."
                }
            ],
            "price": "£££",
            "rating": 4.7,
            "review_count": 98,
            "ambience": [
                {
                    "label": "Casual",
                    "description": "A relaxed and welcoming atmosphere, perfect for enjoying a meal with friends and family."
                },
                {
                    "label": "Rustic/Country",
                    "description": "Features a rustic decor reminiscent of an Argentine estancia, offering a warm and inviting dining experience."
                }
            ],
            "accessibility": "Fully accessible, with step-free access and spacious dining areas to accommodate guests with mobility needs.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "92ac88db-4a23-4b8b-9c24-8a2c98d4c5d6",
            "name": "Oceanic Odyssey",
            "cuisine": [
                {
                    "label": "Seafood",
                    "description": "Specializes in sustainably sourced seafood, offering everything from fresh oysters to exotic fish dishes, prepared with international flavors."
                }
            ],
            "dietary": [
                {
                    "label": "Pescatarian",
                    "description": "A pescatarian's dream, with a wide array of seafood selections that cater to fish-based diets."
                }
            ],
            "price": "££££",
            "rating": 4.9,
            "review_count": 120,
            "ambience": [
                {
                    "label": "Elegant",
                    "description": "An upscale dining environment with sophisticated decor, perfect for special occasions."
                },
                {
                    "label": "Panoramic View",
                    "description": "Located by the water, offering diners stunning oceanic views as they enjoy their meals."
                }
            ],
            "accessibility": "Provides barrier-free access to the dining area and restrooms, with attentive service to assist guests as needed.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "5:00 PM - 11:00 PM",
                "Sunday": "5:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "a3b4c5d6-e7f8-9101-1121-314151617181",
            "name": "The Grecian Grove",
            "cuisine": [
                {
                    "label": "Greek",
                    "description": "A homage to Greek cuisine, serving authentic dishes such as moussaka, souvlaki, and a variety of mezze, in a setting inspired by the groves of Greece."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Includes a rich selection of vegetarian dishes, embracing the diversity of Greek cuisine."
                }
            ],
            "price": "££",
            "rating": 4.8,
            "review_count": 134,
            "ambience": [
                {
                    "label": "Outdoor Dining",
                    "description": "Features outdoor seating among olive trees and Mediterranean plants, providing a tranquil dining atmosphere."
                },
                {
                    "label": "Family-Friendly",
                    "description": "A welcoming spot for families, offering a relaxed dining experience for guests of all ages."
                }
            ],
            "accessibility": "Outdoor dining area is accessible, ensuring a comfortable experience for guests with mobility aids.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "12:00 PM - 10:00 PM",
                "Tuesday": "12:00 PM - 10:00 PM",
                "Wednesday": "12:00 PM - 10:00 PM",
                "Thursday": "12:00 PM - 10:00 PM",
                "Friday": "12:00 PM - 11:00 PM",
                "Saturday": "11:00 AM - 11:00 PM",
                "Sunday": "11:00 AM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "b7c8d9e0-f1g2-h3i4-j5k6-l7m8n9o0",
            "name": "The Raj Mahal",
            "cuisine": [
                {
                    "label": "Indian",
                    "description": "An exquisite Indian dining experience, offering a wide range of dishes from various regions of India, prepared with traditional spices and cooking methods."
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "A comprehensive selection of vegan Indian dishes, full of flavor and variety."
                }
            ],
            "price": "££",
            "rating": 4.6,
            "review_count": 110,
            "ambience": [
                {
                    "label": "Elegant",
                    "description": "A luxurious dining space that reflects the grandeur of India's royal palaces."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "Designed for intimate dining, the restaurant offers a serene environment for a memorable meal."
                }
            ],
            "accessibility": "Thoughtfully designed to be fully accessible, with staff trained to provide assistance as needed.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "5:00 PM - 11:00 PM",
                "Sunday": "5:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "10a20b30-c40d-50e6-f70g-80h90i00",
            "name": "Soul of Seoul",
            "cuisine": [
                {
                    "label": "Korean",
                    "description": "Authentic Korean dishes with a modern twist, including bulgogi, bibimbap, and a variety of kimchi."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "A selection of gluten-free Korean classics for those with dietary restrictions."
                }
            ],
            "price": "££",
            "rating": 4.8,
            "review_count": 146,
            "ambience": [
                {
                    "label": "Modern/Contemporary",
                    "description": "A sleek, modern interior that pays homage to traditional Korean aesthetics."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "A vibrant atmosphere, inspired by the bustling streets of Seoul."
                }
            ],
            "accessibility": "Designed to be fully accessible, featuring spacious dining areas and accessible restrooms.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "5:00 PM - 10:00 PM",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "restaurant_id": "21b31c41-d52e-63f7-g84h-95i06j70",
            "name": "Aurora Borealis",
            "cuisine": [
                {
                    "label": "Nordic",
                    "description": "Features foraged ingredients and seafood from the northern coasts, presenting dishes in the style of New Nordic Cuisine."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Highlights the region's best vegetarian offerings, with a focus on seasonal and wild produce."
                }
            ],
            "price": "££££",
            "rating": 4.9,
            "review_count": 102,
            "ambience": [
                {
                    "label": "Elegant",
                    "description": "An elegant dining experience that captures the mystique and beauty of the Northern Lights."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "Offers a peaceful and intimate setting, ideal for special occasions."
                }
            ],
            "accessibility": "Provides a fully accessible dining environment, ensuring comfort for all guests.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "6:00 PM - 11:00 PM",
                "Sunday": "6:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "32c42d53-e64f-75g8-h89i-97j08k90",
            "name": "Rustic Rendezvous",
            "cuisine": [
                {
                    "label": "American",
                    "description": "A farm-to-table experience offering rustic American cuisine, from artisanal burgers to fresh farm salads."
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "Provides a thoughtful assortment of vegan options, emphasizing organic ingredients."
                }
            ],
            "price": "££",
            "rating": 4.7,
            "review_count": 130,
            "ambience": [
                {
                    "label": "Rustic/Country",
                    "description": "A cozy, country-style setting that feels like a home away from home."
                },
                {
                    "label": "Family-Friendly",
                    "description": "A welcoming space for families, offering a relaxed dining experience for all ages."
                }
            ],
            "accessibility": "Features no-step entry, wide aisles, and accessible seating to accommodate all guests comfortably.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "11:00 AM - 9:00 PM",
                "Tuesday": "11:00 AM - 9:00 PM",
                "Wednesday": "11:00 AM - 9:00 PM",
                "Thursday": "11:00 AM - 9:00 PM",
                "Friday": "11:00 AM - 10:00 PM",
                "Saturday": "11:00 AM - 10:00 PM",
                "Sunday": "11:00 AM - 8:00 PM"
            }
        },
        {
            "restaurant_id": "43d53e64-f75g-86h8-i79j-010k11l2",
            "name": "Taste of Tuscany",
            "cuisine": [
                {
                    "label": "Italian",
                    "description": "Classic Tuscan dishes, focusing on the simplicity and purity of local ingredients, including hand-made pasta and traditional Florentine steaks."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "A selection of gluten-free Italian favorites, ensuring everyone can enjoy the tastes of Tuscany."
                }
            ],
            "price": "£££",
            "rating": 4.6,
            "review_count": 115,
            "ambience": [
                {
                    "label": "Romantic",
                    "description": "Provides a romantic backdrop with its intimate seating and warm, inviting decor."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "A perfect setting for quiet, intimate meals, where the food and your company are the focus."
                }
            ],
            "accessibility": "Accommodates all guests with accessible dining options and attentive service to meet everyone's needs.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "6:00 PM - 11:00 PM",
                "Sunday": "6:00 PM - 10:00 PM"
            }
        },
        {
            "restaurant_id": "10a20b30-c40d-50e6-f70g-80h90i00",
            "name": "Soul of Seoul",
            "cuisine": [
                {
                    "label": "Korean",
                    "description": "Authentic Korean dishes with a modern twist, including bulgogi, bibimbap, and a variety of kimchi."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "A selection of gluten-free Korean classics for those with dietary restrictions."
                }
            ],
            "price": "££",
            "rating": 4.8,
            "review_count": 146,
            "ambience": [
                {
                    "label": "Modern/Contemporary",
                    "description": "A sleek, modern interior that pays homage to traditional Korean aesthetics."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "A vibrant atmosphere, inspired by the bustling streets of Seoul."
                }
            ],
            "accessibility": "Designed to be fully accessible, featuring spacious dining areas and accessible restrooms.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879,
            },
            "opening_hours": {
                "Monday": "5:00 PM - 10:00 PM",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "id": "21b31c41-d52e-63f7-g84h-95i06j70",
            "name": "Aurora Borealis",
            "cuisine": [
                {
                    "label": "Nordic",
                    "description": "Features foraged ingredients and seafood from the northern coasts, presenting dishes in the style of New Nordic Cuisine."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "Highlights the region's best vegetarian offerings, with a focus on seasonal and wild produce."
                }
            ],
            "price": "££££",
            "rating": 4.9,
            "review_count": 102,
            "ambience": [
                {
                    "label": "Elegant",
                    "description": "An elegant dining experience that captures the mystique and beauty of the Northern Lights."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "Offers a peaceful and intimate setting, ideal for special occasions."
                }
            ],
            "accessibility": "Provides a fully accessible dining environment, ensuring comfort for all guests.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "6:00 PM - 11:00 PM",
                "Sunday": "6:00 PM - 10:00 PM"
            }
        },
        {
            "id": "32c42d53-e64f-75g8-h89i-97j08k90",
            "name": "Rustic Rendezvous",
            "cuisine": [
                {
                    "label": "American",
                    "description": "A farm-to-table experience offering rustic American cuisine, from artisanal burgers to fresh farm salads."
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "Provides a thoughtful assortment of vegan options, emphasizing organic ingredients."
                }
            ],
            "price": "££",
            "rating": 4.7,
            "review_count": 130,
            "ambience": [
                {
                    "label": "Rustic/Country",
                    "description": "A cozy, country-style setting that feels like a home away from home."
                },
                {
                    "label": "Family-Friendly",
                    "description": "A welcoming space for families, offering a relaxed dining experience for all ages."
                }
            ],
            "accessibility": "Features no-step entry, wide aisles, and accessible seating to accommodate all guests comfortably.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "11:00 AM - 9:00 PM",
                "Tuesday": "11:00 AM - 9:00 PM",
                "Wednesday": "11:00 AM - 9:00 PM",
                "Thursday": "11:00 AM - 9:00 PM",
                "Friday": "11:00 AM - 10:00 PM",
                "Saturday": "11:00 AM - 10:00 PM",
                "Sunday": "11:00 AM - 8:00 PM"
            }
        },
        {
            "id": "43d53e64-f75g-86h8-i79j-010k11l2",
            "name": "Taste of Tuscany",
            "cuisine": [
                {
                    "label": "Italian",
                    "description": "Classic Tuscan dishes, focusing on the simplicity and purity of local ingredients, including hand-made pasta and traditional Florentine steaks."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "A selection of gluten-free Italian favorites, ensuring everyone can enjoy the tastes of Tuscany."
                }
            ],
            "price": "£££",
            "rating": 4.6,
            "review_count": 115,
            "ambience": [
                {
                    "label": "Romantic",
                    "description": "Provides a romantic backdrop with its intimate seating and warm, inviting decor."
                },
                {
                    "label": "Quiet/Intimate",
                    "description": "A perfect setting for quiet, intimate meals, where the food and your company are the focus."
                }
            ],
            "accessibility": "Accommodates all guests with accessible dining options and attentive service to meet everyone's needs.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "6:00 PM - 11:00 PM",
                "Sunday": "6:00 PM - 10:00 PM"
            }
        },
        {
            "id": "5401a2e3-b4c5-d6f7-8901-234a5b6c7d8e",
            "name": "Indigo Istanbul",
            "cuisine": [
                {
                    "label": "Turkish",
                    "description": "Offering a rich array of Turkish delights, from savory kebabs to sweet baklava, infused with the exotic flavors of the East."
                }
            ],
            "dietary": [
                {
                    "label": "Vegetarian",
                    "description": "A generous selection of vegetarian dishes inspired by the vibrant markets of Istanbul."
                }
            ],
            "price": "££",
            "rating": 4.8,
            "review_count": 178,
            "ambience": [
                {
                    "label": "Cultural/Theme",
                    "description": "Immerse yourself in the captivating atmosphere of Istanbul, with decor that celebrates its rich history and culture."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "Experience the energy of a Turkish bazaar, with a lively and vibrant dining environment."
                }
            ],
            "accessibility": "Accessible for all, with facilities designed to welcome guests with varying needs.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "5:00 PM - 10:00 PM",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "id": "890a2b3c-4d5e-6f7g-8h9i-0j1k2l3m",
            "name": "The Parisian Pantry",
            "cuisine": [
                {
                    "label": "French",
                    "description": "Classical French cuisine with a modern touch, featuring dishes like coq au vin, ratatouille, and a selection of artisanal cheeses."
                }
            ],
            "dietary": [
                {
                    "label": "Dairy Free",
                    "description": "Curated dairy-free options that maintain the essence and flavors of traditional French cooking."
                }
            ],
            "price": "£££",
            "rating": 4.7,
            "review_count": 190,
            "ambience": [
                {
                    "label": "Romantic",
                    "description": "An intimate setting that evokes the charm of Parisian cafes, perfect for romantic dinners."
                },
                {
                    "label": "Elegant",
                    "description": "Sophisticated decor that provides a backdrop for an exquisite dining experience."
                }
            ],
            "accessibility": "Ensures a comfortable dining experience for everyone, with attention to detail in accessibility features.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "Closed",
                "Tuesday": "6:00 PM - 10:00 PM",
                "Wednesday": "6:00 PM - 10:00 PM",
                "Thursday": "6:00 PM - 10:00 PM",
                "Friday": "6:00 PM - 11:00 PM",
                "Saturday": "6:00 PM - 11:00 PM",
                "Sunday": "6:00 PM - 10:00 PM"
            }
        },
        {
            "id": "4b5c6d7e-8f90-g1h2-i3j4-k5l6m7n8",
            "name": "Bangkok Bites",
            "cuisine": [
                {
                    "label": "Thai",
                    "description": "From street food favorites to royal Thai dishes, experience the heat and sweetness of Thai cuisine."
                }
            ],
            "dietary": [
                {
                    "label": "Gluten Free",
                    "description": "An array of gluten-free Thai dishes, rich in flavor and free from gluten-based ingredients."
                }
            ],
            "price": "££",
            "rating": 4.6,
            "review_count": 165,
            "ambience": [
                {
                    "label": "Casual",
                    "description": "A casual, friendly environment that's all about celebrating the flavors of Thailand."
                },
                {
                    "label": "Outdoor Dining",
                    "description": "Enjoy the vibrant tastes of Thailand in our outdoor dining area, reminiscent of Bangkok's bustling street food scene."
                }
            ],
            "accessibility": "Committed to accessibility, with thoughtful amenities to ensure a comfortable visit for all guests.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "12:00 PM - 10:00 PM",
                "Tuesday": "12:00 PM - 10:00 PM",
                "Wednesday": "12:00 PM - 10:00 PM",
                "Thursday": "12:00 PM - 10:00 PM",
                "Friday": "12:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },
        {
            "id": "9o8p7q6r-5s4t-3u2v-1w0x-yz9x8w7v",
            "name": "Cape Town Corners",
            "cuisine": [
                {
                    "label": "South African",
                    "description": "Explore South Africa's culinary diversity, from braai (barbecue) to bunny chow, in a setting that's as vibrant as its dishes."
                }
            ],
            "dietary": [
                {
                    "label": "Vegan",
                    "description": "Vegan interpretations of South African classics, using plant-based ingredients for a fresh take on traditional flavors."
                }
            ],
            "price": "££",
            "rating": 4.5,
            "review_count": 121,
            "ambience": [
                {
                    "label": "Cultural/Theme",
                    "description": "Immersive South African decor and music set the scene for an authentic dining experience."
                },
                {
                    "label": "Lively/Bustling",
                    "description": "A lively atmosphere that mirrors the energetic spirit of Cape Town's dining scene."
                }
            ],
            "accessibility": "Welcoming to all, with accessible options that ensure everyone can enjoy the taste of South Africa.",
            "location": "Bristol",
            "coordinates": {
                "latitude": 51.4545,
                "longitude": -2.5879
            },
            "opening_hours": {
                "Monday": "5:00 PM - 10:00 PM",
                "Tuesday": "5:00 PM - 10:00 PM",
                "Wednesday": "5:00 PM - 10:00 PM",
                "Thursday": "5:00 PM - 10:00 PM",
                "Friday": "5:00 PM - 11:00 PM",
                "Saturday": "12:00 PM - 11:00 PM",
                "Sunday": "12:00 PM - 9:00 PM"
            }
        },

        

    ]
}
restaurants_list = data["restaurants"]
results = collection.insert_many(restaurants_list)
print("Inserted IDs:", results.inserted_ids)
