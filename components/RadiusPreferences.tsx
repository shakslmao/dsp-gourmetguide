import { Slider } from "./ui/slider";

const RadiusPreference = () => {
    return (
        <div>
            <div className="text-center mb-4">
                <h2 className="text-sm text-center">Selected Price Range</h2>
                <h3 className="text-2xl font-semibold text-green-600">{}</h3>
                <p className="text-xs text-center font-light">{}</p>
            </div>
            <Slider
                value={[]}
                defaultValue={[0]}
                max={20}
                step={1}
            />
        </div>
    );
};
export default RadiusPreference;
