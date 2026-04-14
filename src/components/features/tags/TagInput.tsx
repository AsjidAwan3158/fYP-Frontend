import React from 'react'
import type { JSX } from 'react/jsx-runtime'

// Tags 

    
// Component

        function TagInput({
            name,
            className,
            defaultValue
        }: {
            name: string;
            className: string;
            defaultValue: string;
        }) {
            return (
                <input
                    type={"hidden"}
                    name={name}
                    className={className}
                    defaultValue={defaultValue}
                    aria-hidden={true}
                >
                </input>
            );
        }
    

export default TagInput