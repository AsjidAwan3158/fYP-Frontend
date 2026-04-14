import React from 'react'
import type { JSX } from 'react/jsx-runtime'



    
// Component

        function FormLabel({
            text,
            htmlFor,
            className
        }: {
            text: string;
            htmlFor: string;
            className: string;
        }) {
            return (
                <label className={className} htmlFor={htmlFor}>
                    {text}
                </label>
            );
        }
    

export default FormLabel
