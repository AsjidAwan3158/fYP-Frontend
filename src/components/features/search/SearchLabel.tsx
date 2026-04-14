import React from 'react'
import type { JSX } from 'react/jsx-runtime'



interface SearchLabelProps {
    text?: string;
}

// Component
function SearchLabel({ text = 'Search keywords or phrases:' }: SearchLabelProps) {
    return (
        <label className={"block text-sm font-medium mb-1 dark:text-white"}>
            {text}
        </label>
    );
}


export default SearchLabel
