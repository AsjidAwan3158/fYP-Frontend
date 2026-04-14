import React from 'react'

interface ToggleProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

function Toggle({ enabled, onChange, size = 'md', disabled = false }: ToggleProps) {
    const sizeClasses = {
        sm: {
            track: 'w-8 h-5',
            thumb: 'w-3.5 h-3.5',
            translateOff: 'translate-x-0.5',
            translateOn: 'translate-x-[14px]'
        },
        md: {
            track: 'w-11 h-6',
            thumb: 'w-5 h-5',
            translateOff: 'translate-x-0.5',
            translateOn: 'translate-x-[22px]'
        },
        lg: {
            track: 'w-14 h-7',
            thumb: 'w-6 h-6',
            translateOff: 'translate-x-0.5',
            translateOn: 'translate-x-[30px]'
        }
    };

    const sizes = sizeClasses[size];

    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            disabled={disabled}
            onClick={() => !disabled && onChange(!enabled)}
            className={`
                relative inline-flex items-center shrink-0 cursor-pointer rounded-full
                transition-colors duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${sizes.track}
                ${enabled ? 'bg-blue-600' : 'bg-gray-300'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            <span
                className={`
                    pointer-events-none inline-block rounded-full bg-white shadow-md
                    transition-transform duration-200 ease-in-out
                    ${sizes.thumb}
                    ${enabled ? sizes.translateOn : sizes.translateOff}
                `}
            />
        </button>
    );
}

export default Toggle
