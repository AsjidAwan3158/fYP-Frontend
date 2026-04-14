import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Notification_bell from './icons/Notification_bell.tsx'


// Component
function NotificationButton() {
    return <button type={"button"} className={"beamerTrigger py-1.5 px-1.5 md:px-3 inline-flex justify-center items-center gap-x-2 text-sm rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800 beamer_beamerSelector beamer_beamerSelectorRelative"}>
    	<Notification_bell />
    	<span className={"hidden xl:inline whitespace-nowrap"}>
    		What's new?
    	</span>
    	<div className={"beamer_icon noBouncy"} style={{display:"none", right:"-6px"}}>
    		1
    	</div>
    </button>}


export default NotificationButton
