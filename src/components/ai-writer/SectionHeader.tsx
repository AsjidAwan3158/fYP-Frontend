import React from 'react'
import type { JSX } from 'react/jsx-runtime'



// Component

        function SectionHeader({
            title,
            description
        }: {
            title: string;
            description: string;
        }) {
            return (
                <div>
                    <h2 className={"text-base font-semibold"}>
                        {title}
                    </h2>
                    <p className={"text-sm text-gray-700"}>
                        {description}
                    </p>
                </div>
            );
        }
    

export default SectionHeader
