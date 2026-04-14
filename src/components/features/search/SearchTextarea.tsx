import React from 'react'
import type { JSX } from 'react/jsx-runtime'



// Component
function SearchTextarea() {
    return <textarea name={"search_query"} rows={"5"} className={"mb-4 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 hidden sf-hidden"} placeholder={"Write your query here"}>
    
    </textarea>}


export default SearchTextarea
