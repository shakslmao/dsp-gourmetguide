"use client";

import countries from "world-countries";
import { Card, CardContent } from "./ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import { Avatar, AvatarImage } from "./ui/avatar";
import UserAvatar from "./Avatar";

export const cusineCategories = [
    {
        label: "British",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description:
            "A rich tapestry of hearty classics and contemporary dishes, celebrating local produce",
    },
    {
        label: "Indian",
        flag: countries.find((country) => country.name.common === "India")?.flag,
        description:
            "Diverse and aromatic, spanning spicy curries to flavorful biryanis, reflecting India's regional culinary traditions",
    },
    {
        label: "Italian",
        flag: countries.find((country) => country.name.common === "Italy")?.flag,
        description:
            "From comforting pasta dishes to exquisite seafood, Italian cuisine combines simplicity with depth of flavor",
    },
    {
        label: "Chinese",
        flag: countries.find((country) => country.name.common === "China")?.flag,
        description:
            "A vast culinary landscape offering everything from dim sum to Sichuan spice, showcasing China's regional diversity",
    },
    {
        label: "Middle Eastern",
        flag: "",
        description:
            "Flavorful and aromatic, featuring mezze, kebabs, and richly spiced dishes from across the Middle East",
    },
    {
        label: "Japanese",
        flag: countries.find((country) => country.name.common === "Japan")?.flag,
        description: "Elegant and diverse, ranging from sushi and sashimi to warming ramen bowls.",
    },
    {
        label: "Thai",
        flag: countries.find((country) => country.name.common === "Thailand")?.flag,
        description:
            "Vibrant and bold flavors from sweet to spicy, famous for its curries, noodle dishes, and street food",
    },
    {
        label: "Lebanese",
        flag: countries.find((country) => country.name.common === "Lebanon")?.flag,
        description:
            "Offers an array of mezze, grilled meats, and salads, known for its vibrant flavors and freshness.",
    },
    {
        label: "French",
        flag: countries.find((country) => country.name.common === "France")?.flag,
        description:
            "Renowned for its sophistication, from rustic countryside fare to the heights of fine dining",
    },
    {
        label: "Vietnamese",
        flag: countries.find((country) => country.name.common === "Vietnam")?.flag,
        description:
            "Fresh, light, and fragrant, characterized by its use of herbs, noodles, and distinctive pho",
    },
    {
        label: "Mediterranean",
        flag: "",
        description:
            "Sun-drenched flavors from the Mediterranean coast, emphasizing fresh ingredients and healthy dishes.",
    },
    {
        label: "African",
        flag: "",
        description:
            "Diverse cuisines from across the continent, known for their use of grains, beans, and rich spices.",
    },
    {
        label: "Caribbean",
        flag: "",
        description:
            "A fusion of African, European, and East Indian flavors, featuring seafood, tropical fruits, and spicy meats",
    },
    {
        label: "Korean",
        flag: countries.find((country) => country.name.common === "South Korea")?.flag,
        description:
            "Bold and spicy, with dishes like kimchi, BBQ, and bibimbap, highlighting Korea's rich culinary heritage",
    },
    {
        label: "Mexican",
        flag: countries.find((country) => country.name.common === "Mexico")?.flag,
        description:
            "Colorful and diverse, from street food tacos to complex mole sauces, blending native and Spanish influences",
    },
    {
        label: "Spanish",
        flag: countries.find((country) => country.name.common === "Spain")?.flag,
        description:
            "Famous for tapas, paella, and seafood, Spanish cuisine is all about sharing and enjoying meals together",
    },
    {
        label: "Greek",
        flag: countries.find((country) => country.name.common === "Greece")?.flag,
        description:
            "Fresh, flavorful, and steeped in tradition, Greek cuisine offers a feast of Mediterranean delights. From succulent grilled meats and seafood to vibrant salads, creamy tzatziki, and crisp phyllo pastries, every dish is a celebration of simplicity and zest.",
    },
    {
        label: "Portuguese",
        flag: countries.find((country) => country.name.common === "Portugal")?.flag,
        description: "Known for its seafood, spicy piri-piri chicken, and rich egg-based desserts.",
    },
    {
        label: "American",
        flag: countries.find((country) => country.name.common === "United States")?.flag,
        description:
            "Diverse and eclectic, from classic burgers and BBQ to innovative fusion dishes",
    },
    {
        label: "Turkish",
        flag: countries.find((country) => country.name.common === "Turkey")?.flag,
        description:
            "Rich and diverse, spanning kebabs, mezze, and sweet pastries, influenced by Ottoman cuisine",
    },
    {
        label: "Malaysian",
        flag: countries.find((country) => country.name.common === "Malaysia")?.flag,
        description:
            "Rich in flavors and spices, Malaysian cuisine offers a blend of Malay, Chinese, and Indian influences with dishes like laksa, nasi lemak, and satay.",
    },
    {
        label: "Singaporean",
        flag: countries.find((country) => country.name.common === "Singapore")?.flag,
        description:
            "Singaporean cuisine is a melting pot of culinary influences, featuring iconic dishes such as Hainanese chicken rice, chili crab, and laksa, showcasing the city-state's diverse culture.",
    },

    {
        label: "Ethiopian",
        flag: countries.find((country) => country.name.common === "Ethiopia")?.flag,
        description:
            "Characterized by spicy stews and injera bread, offering a communal dining experience.",
    },
    {
        label: "Bangladeshi",
        flag: countries.find((country) => country.name.common === "Bangladesh")?.flag,
        description:
            "Spicy curries, rice dishes, and fish, reflecting Bangladesh's rich culinary traditions and flavors",
    },
    {
        label: "Fusion",
        flag: "",
        description:
            "A blend of culinary traditions and techniques, creating innovative and unique dishes",
    },
];

const CuisineCategories = () => {
    return (
        <div>
            <Carousel
                opts={{ align: "start" }}
                className="w-full max-w-sm">
                <CarouselContent>
                    {cusineCategories.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-2/2 lg:basis-3/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6 mx-6">
                                        <UserAvatar src={item.flag} />
                                        <h3 className="text-3xl font-semibold mb-4">
                                            {item.label}
                                        </h3>
                                        <p className="text-sm text-center font-light">
                                            {" "}
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CuisineCategories;
