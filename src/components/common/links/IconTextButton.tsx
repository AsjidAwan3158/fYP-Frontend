import React from 'react'
import type { JSX } from 'react/jsx-runtime'



    
// Component

        function IconTextButton({
            icon,
            label,
            className,
            onClick
        }: {
            icon: React.ReactNode;
            label: string;
            className: string;
            onClick?: () => void;
        }) {
            return (
                <button type={"button"} className={className} onClick={onClick}>
                    {icon}
                    <span className={"hidden md:inline"}>
                        {label}
                    </span>
                </button>
            );
        }
    

export default IconTextButton
