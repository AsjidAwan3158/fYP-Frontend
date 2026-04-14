import React from 'react'
import type { JSX } from 'react/jsx-runtime'



    
// Component

        function TextareaField({
            id,
            placeholder,
            height,
            content
        }: {
            id: string;
            placeholder: string;
            height: string;
            content: string;
        }) {
            return (
                <textarea
                    className={"resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"}
                    id={id}
                    placeholder={placeholder}
                    style={{ height: height }}
                >
                    {content}
                </textarea>
            );
        }
    

export default TextareaField
