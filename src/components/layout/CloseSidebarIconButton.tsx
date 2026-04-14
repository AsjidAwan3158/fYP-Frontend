import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Cross_mark from '@/components/icons/Cross_mark.tsx'


// Component
function CloseSidebarIconButton() {
    return <button type={"button"} className={"js-close-sidebar lg:hidden flex items-center justify-center size-8 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 mr-1 sf-hidden"}>
    	<Cross_mark />
    </button>}


export default CloseSidebarIconButton
