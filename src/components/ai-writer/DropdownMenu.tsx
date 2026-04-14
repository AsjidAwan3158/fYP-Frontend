import React from 'react'
import type { JSX } from 'react/jsx-runtime'



    
// Component

        function DropdownMenu({
            className
        }: {
            className: string;
        }) {
            return (
                <div
                    className={className}
                    role={"menu"}
                    tabIndex={"-1"}
                >
                </div>
            );
        }
    

export default DropdownMenu
