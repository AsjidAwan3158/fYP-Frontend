import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import ToolbarButton from './ToolbarButton.tsx'


    
// Component

        function ToolbarButton1({
            icon,
            label,
            className
        }: {
            icon: React.ReactNode;
            label?: string;
            className: string;
        }) {
            return (
                <button type={"button"} className={className}>
                    {icon}
                    {label}
                </button>
            );
        }
    

export default ToolbarButton1
