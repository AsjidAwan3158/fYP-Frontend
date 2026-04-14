import React from 'react'
import type { JSX } from 'react/jsx-runtime'



    
// Component

        function SectionLabel({
            label
        }: {
            label: string;
        }) {
            return (
                <div className={"text-sm font-medium"}>
                	{`
     ${label}
     `}
                </div>
            );
        }
    

export default SectionLabel
