import React from 'react'
import type { JSX } from 'react/jsx-runtime'



// Component
function LoadMoreButton() {
    return <button type={"button"} className={"js-load-more-btn py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"}>
    	{`
     Load more
     `}
    </button>}


export default LoadMoreButton
