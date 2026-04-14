import React from 'react'

function ModelDropdown({
    value,
    onChange,
    options
}: {
    value: string;
    onChange?: (value: string) => void;
    options?: { value: string; label: string; provider: string }[];
}) {
    const [isOpen, setIsOpen] = React.useState(false);

    const defaultOptions = [
        { value: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI' },
        { value: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI' },
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'OpenAI' },
        { value: 'claude-3-opus', label: 'Claude 3 Opus', provider: 'Anthropic' },
    ];

    const allOptions = options || defaultOptions;
    const selectedOption = allOptions.find(opt => opt.value === value) || allOptions[0];

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-900 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>
                    <span>{selectedOption.label}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{selectedOption.provider}</span>
                </div>
                <svg
                    className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                    {allOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange?.(option.value);
                                setIsOpen(false);
                            }}
                            className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                                option.value === value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                            }`}
                        >
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                            <span>{option.label}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{option.provider}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ModelDropdown
