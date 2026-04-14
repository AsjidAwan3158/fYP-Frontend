import React from 'react'

// Green checkmark icon
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#22c55e" />
        <path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

interface FeatureItem {
    text: string;
}

interface FeatureGridProps {
    features: FeatureItem[];
    columns?: 2 | 3 | 4;
}

function FeatureGrid({ features, columns = 2 }: FeatureGridProps) {
    const gridColsClass = columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-4';

    return (
        <div className={`grid ${gridColsClass} gap-x-8 gap-y-3`}>
            {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                    <CheckIcon />
                    <span className="text-sm text-gray-700">{feature.text}</span>
                </div>
            ))}
        </div>
    );
}

export default FeatureGrid
