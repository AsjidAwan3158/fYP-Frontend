import React from 'react'

function TemperatureSlider({
    value,
    onChange,
    min = 0,
    max = 2,
    step = 0.01
}: {
    value: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}) {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
                Temperature: {value.toFixed(2)}
            </label>

            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange?.(parseFloat(e.target.value))}
                    className="w-full h-2 appearance-none cursor-pointer rounded-full"
                    style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
                    }}
                />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
                <span>Focused</span>
                <span>Balanced</span>
                <span>Creative</span>
            </div>

            <p className="text-sm text-gray-500">
                Lower values produce more focused, consistent responses. Higher values create more creative, varied content.
            </p>
        </div>
    );
}

export default TemperatureSlider
