import { Container } from "../Container";
import countries from "world-countries";
import FlagAvatar from "../FlagAvatar";
import CategoryList from "./CategoryList";
import { usePathname, useSearchParams } from "next/navigation";

export const cuisineCategories = [
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
        label: "Indonesian",
        flag: countries.find((country) => country.name.common === "Indonesia")?.flag,
        description:
            "Indonesian cuisine is a vibrant tapestry of flavors and textures, offering a diverse range of dishes from spicy rendang and savory satay to the richly spiced nasi goreng",
    },

    {
        label: "Vietnamese",
        flag: countries.find((country) => country.name.common === "Vietnam")?.flag,
        description:
            "Fresh, light, and fragrant, characterised by its use of herbs, noodles, and distinctive pho",
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
            "Fresh, flavorful, and steeped in tradition, Greek cuisine offers a feast of Mediterranean delights, every dish is a celebration of simplicity and zest.",
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
            "Characterised by spicy stews and injera bread, offering a communal dining experience.",
    },
    {
        label: "Bangladeshi",
        flag: countries.find((country) => country.name.common === "Bangladesh")?.flag,
        description:
            "Spicy curries, rice dishes, and fish, reflecting Bangladesh's rich culinary traditions and flavors",
    },
    {
        label: "Brazilian",
        flag: countries.find((country) => country.name.common === "Brazil")?.flag,
        description:
            "Celebrates the diverse culinary heritage of Brazil, from churrasco (barbecue) to feijoada (black bean stew), highlighting the country's rich flavors and ingredients.",
    },
    {
        label: "Nigerian",
        flag: countries.find((country) => country.name.common === "Nigeria")?.flag,
        description:
            "A vibrant feast of flavors, Nigerian cuisine offers a rich palette of spicy stews, fragrant soups, and hearty dishes like jollof rice and pounded yam, celebrating Nigeria's diverse culinary traditions",
    },
    {
        label: "Ghanaian",
        flag: countries.find((country) => country.name.common === "Ghana")?.flag,
        description:
            "Bursting with flavor, Ghanaian cuisine brings you a colorful array of dishes from spicy to savory, including the famous jollof rice, peanut soup, and kelewele, showcasing Ghana's rich culinary heritage",
    },
    {
        label: "Moroccan",
        flag: countries.find((country) => country.name.common === "Morocco")?.flag,
        description:
            "A sensory journey through spices and aromas, Moroccan cuisine offers a tantalizing array of tagines, couscous, and pastilla, infused with the exotic flavors of saffron, mint, and lemon.",
    },
    {
        label: "Russian",
        flag: countries.find((country) => country.name.common === "Russia")?.flag,
        description:
            "Hearty and comforting, Russian cuisine serves up a warming selection of soups like borscht, robust salads like Olivier, and rich dishes such as beef stroganoff, embodying the soul of Russia.",
    },
    {
        label: "German",
        flag: countries.find((country) => country.name.common === "Germany")?.flag,
        description:
            "Robust and hearty, German cuisine delights with its variety of sausages (Wurst), schnitzels, and pretzels, complemented by the world-renowned tradition of beer brewing",
    },
    {
        label: "Scandinavian",
        flag: "",
        description:
            "A celebration of simplicity and freshness, Scandinavian cuisine offers a clean palette of flavors, from seafood delicacies like gravlax to foraged berries and rye bread, reflecting the Nordic connection to nature",
    },
    {
        label: "Middle Eastern",
        flag: "",
        description:
            "Flavorful and aromatic, featuring mezze, kebabs, and richly spiced dishes from across the Middle East",
    },
    {
        label: "Mediterranean",
        flag: "",
        description:
            "Sun-drenched flavors from the Mediterranean coast, emphasising fresh ingredients and healthy dishes.",
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
        label: "Fusion",
        flag: "",
        description:
            "A blend of culinary traditions and techniques, creating innovative and unique dishes",
    },
];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isDashboard = pathname === "/dashboard";
    if (!isDashboard) return null;

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {cuisineCategories.map((item) => (
                    <CategoryList
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.flag}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;