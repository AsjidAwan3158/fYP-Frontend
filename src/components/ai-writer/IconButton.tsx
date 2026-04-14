import React from 'react'
import type { JSX } from 'react/jsx-runtime'



    
// Component

        function IconButton({
            className,
            label,
            icon
        }: {
            className: string;
            label: string;
            icon: JSX.Element;
        }) {
            return (
                <button className={className}>
                    {icon}
                    {label}
                </button>
            );
        }
    

export default IconButton
