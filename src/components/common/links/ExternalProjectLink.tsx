import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import External_link_arrow from '@/components/icons/External_link_arrow.tsx'


// Component
function ExternalProjectLink() {
    return <a rel={"nofollow"} target={"_blank"} className={"opacity-fade js-open-project p-1.5 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"}>
    	<External_link_arrow />
    </a>}


export default ExternalProjectLink
