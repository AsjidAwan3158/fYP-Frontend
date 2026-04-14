import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Hamburger_menu_bars from './icons/Hamburger_menu_bars.tsx'


// Component
function MobileMenuToggle() {
    return <button type={"button"} className={"mt-0.5 menu-toggle py-1.5 px-1.5 md:px-3 ml-4 inline-flex lg:hidden justify-center items-center gap-x-2 text-sm font-semibold rounded-md text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800 sf-hidden"}>
    	<Hamburger_menu_bars />
    </button>}


export default MobileMenuToggle
