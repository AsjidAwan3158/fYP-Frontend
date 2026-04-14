import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Downward_chevron from './icons/Downward_chevron.tsx'
import Bold_uppercase_b from './icons/Bold_uppercase_b.tsx'
import Downward_chevron2 from './icons/Downward_chevron2.tsx'
import Italic_uppercase_i from './icons/Italic_uppercase_i.tsx'


    
// Component

        function ToolbarButton({
            className,
            title,
            icon
        }: {
            className: string;
            title: string;
            icon: "bold" | "italic" | "chevron";
        }) {
            return (
                <button
                    type={"button"}
                    className={className}
                    title={title}
                >
                    {icon === "bold" && <Bold_uppercase_b />}
                    {icon === "italic" && <Italic_uppercase_i />}
                    {icon === "chevron" && <Downward_chevron2 />}
                </button>
            );
        }
    

export default ToolbarButton
