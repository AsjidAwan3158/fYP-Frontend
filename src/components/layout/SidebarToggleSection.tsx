import React from 'react'
import type { JSX } from 'react/jsx-runtime'


import ToggleFilterArrowsButton from '../features/filters/ToggleFilterArrowsButton.tsx'
import MobileFilterButton from '../common/links/MobileFilterButton.tsx'

    
// Component

        function SidebarToggleSection() {
            return (
                <div className={"flex items-center"}>
                    <div className={"hs-tooltip inline-block"}>
                        <ToggleFilterArrowsButton />
                        <span
                            className={"hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-sm shadow-xs dark:bg-gray-700"}
                            style={{ position: "fixed", left: "339.513px", top: "37.8125px" }}
                        >
                            {`
     Hide sidebar
     `}
                        </span>
                    </div>
                    <MobileFilterButton />
                </div>
            );
        }
    

export default SidebarToggleSection
