import React from 'react'
import type { JSX } from 'react/jsx-runtime'



    
// Component

        function ToggleSwitch({
            id,
            isOn,
            onToggle
        }: {
            id: string;
            isOn: boolean;
            onToggle?: () => void;
        }) {
            return (
                <button
                    type={"button"}
                    role={"switch"}
                    id={id}
                    aria-checked={isOn}
                    onClick={onToggle}
                    className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${isOn ? "bg-blue-600" : "bg-gray-200"}`}
                >
                    <span
                        className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${isOn ? "translate-x-5" : "translate-x-0"}`}
                    >
                    </span>
                </button>
            );
        }
    

export default ToggleSwitch
