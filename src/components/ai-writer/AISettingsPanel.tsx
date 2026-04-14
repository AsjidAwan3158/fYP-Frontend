import React from 'react'
import ModelDropdown from './ModelDropdown.tsx'
import TemperatureSlider from './TemperatureSlider.tsx'

function AISettingsPanel() {
    const [model, setModel] = React.useState('gpt-4o-mini');
    const [temperature, setTemperature] = React.useState(1.21);

    return (
        <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                {/* Card Header */}
                <div className="mb-6 flex items-start gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-pink-100">
                        <svg className="h-7 w-7 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A1.5 1.5 0 0 0 6 14.5A1.5 1.5 0 0 0 7.5 16A1.5 1.5 0 0 0 9 14.5A1.5 1.5 0 0 0 7.5 13m9 0a1.5 1.5 0 0 0-1.5 1.5a1.5 1.5 0 0 0 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5M12 9a5 5 0 0 0-5 5v1h10v-1a5 5 0 0 0-5-5Z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="mb-0.5 text-base font-semibold text-gray-900">
                            Advanced AI Settings
                        </h3>
                        <p className="text-sm text-gray-600">
                            Fine-tune AI model selection and parameters for optimal proposal generation. These settings affect creativity and model performance.
                        </p>
                    </div>
                </div>

                {/* Model Dropdown */}
                <div className="space-y-6 pl-18">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">
                            Model
                        </label>
                        <ModelDropdown
                            value={model}
                            onChange={setModel}
                        />
                    </div>

                    {/* Temperature Slider */}
                    <TemperatureSlider
                        value={temperature}
                        onChange={setTemperature}
                    />
                </div>
            </div>
        </div>
    );
}

export default AISettingsPanel
