import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Horizontal_sliders_settings from '@/components/icons/Horizontal_sliders_settings.tsx'


// Component
function MobileFilterButton() {
    return <button type={"button"} className={"lg:hidden p-0.5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-white dark:text-white dark:hover:text-gray-300 dark:hover:border-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 js-toggle-filter sf-hidden"}>
    	<Horizontal_sliders_settings />
    </button>}


export default MobileFilterButton
