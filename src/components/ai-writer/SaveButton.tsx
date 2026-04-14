import React from 'react'
import type { JSX } from 'react/jsx-runtime'



// Component
function SaveButton() {
    return <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 rounded-md h-9 cursor-pointer px-6 text-sm"}>
    	Save
    </button>}


export default SaveButton
