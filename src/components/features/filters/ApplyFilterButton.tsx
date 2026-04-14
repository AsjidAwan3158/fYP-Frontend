import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Checkmark from '@/components/icons/Checkmark.tsx'


// Component
function ApplyFilterButton() {
    return <button type={"button"} className={"js-close-sidebar lg:hidden w-full mb-2 py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none sf-hidden"}>
    	<Checkmark />
    	{`
     Apply filter
     `}
    </button>}


export default ApplyFilterButton
