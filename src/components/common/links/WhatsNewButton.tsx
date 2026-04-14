import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Notification_bell from '@/components/icons/Notification_bell.tsx'


// Component
function WhatsNewButton() {
    return <button type={"button"} className={"js-whats-new-btn py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"}>
        <Notification_bell />
        <span className={"hidden md:inline"}>
            Whats new
        </span> 
    </button>
    
}


export default WhatsNewButton
