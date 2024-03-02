import { Slider } from "./ui/slider";

const TimeRangePreferences = () => {
    return (
        <div>
            <div className="text-center mb-4">
                <h2 className="text-md text-center">Selected Time</h2>
                <h3 className="text-2xl font-semibold text-green-600">{}</h3>
                <p className="text-xs text-center font-light">{}</p>
            </div>
            <Slider
                value={[]}
                defaultValue={[0]}
                max={100}
                step={20}
            />
        </div>
    );
};

export default TimeRangePreferences;
