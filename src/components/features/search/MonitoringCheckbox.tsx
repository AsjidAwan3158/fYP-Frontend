import React from 'react'
import type { JSX } from 'react/jsx-runtime'

interface MonitoringCheckboxProps {
    id: string;
    name: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
}

// Component
function MonitoringCheckbox({
    id,
    name,
    checked,
    onChange,
}: MonitoringCheckboxProps) {
    return (
        <input
            type="checkbox"
            id={id}
            name={name}
            className={"shrink-0 border-gray-200 rounded-sm text-blue-600 focus:ring-2 focus:ring-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"}
            value="1"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
        />
    );
}

export default MonitoringCheckbox
