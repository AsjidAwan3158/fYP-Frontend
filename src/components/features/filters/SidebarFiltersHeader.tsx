import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Arrow_down_thick from '@/components/icons/Arrow_down_thick.tsx'
import Folder_outline from '@/components/icons/Folder_outline.tsx'
import Arrow_down_thick1 from '@/components/icons/Arrow_down_thick1.tsx'
import Arrow_down_thick2 from '@/components/icons/Arrow_down_thick2.tsx'
import Arrow_down from '@/components/icons/Arrow_down.tsx'
import DropdownButton from '@/components/common/dropdowns/DropdownButton.tsx'
import DropdownMenu from '@/components/common/dropdowns/DropdownMenu.tsx'
import CloseSidebarIconButton from '@/components/layout/CloseSidebarIconButton.tsx'
import FilterDropdownButton from './FilterDropdownButton.tsx'


// Component

        function SidebarFiltersHeader() {
            return (
                <div className={"relative flex items-center gap-x-1.5 px-3 py-3"}>
                    <CloseSidebarIconButton />
                    <div className={"group/filter-dropdown hs-dropdown relative [--auto-close:inside] [--offset:4]"}>
                        <FilterDropdownButton
                            id="hs-dropdown-filters"
                            className="hs-dropdown-toggle flex items-center gap-x-2 hover:bg-gray-200 rounded-lg px-2 py-1.5 text-gray-600 text-sm group-[.open]/filter-dropdown:bg-gray-200"
                            arrow={<Arrow_down_thick1 />}
                        >
                            <Folder_outline />
                            <span className="truncate">
                                {`
         Filters
         `}
                            </span>
                        </FilterDropdownButton>
                        <DropdownMenu className={"hs-dropdown-menu relative z-9999 overflow-hidden transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md border border-gray-200 rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full sf-hidden"} />
                    </div>
                    <div className={"flex items-center text-gray-300 text-base py-2"}>
                        {`
     /
     `}
                    </div>
                    <div className={"group/filter-dropdown hs-dropdown relative flex overflow-hidden [--offset:4]"}>
                        <FilterDropdownButton
                            id="hs-dropdown-filter-menu"
                            className="hs-dropdown-toggle flex items-center gap-x-2 hover:bg-gray-200 rounded-lg px-2 py-1.5 text-gray-900 text-sm overflow-hidden group-[.open]/filter-dropdown:bg-gray-200"
                            arrow={<Arrow_down_thick2 />}
                        >
                            <span className="flex-1 w-full truncate text-left">
                                <span className="current-filter-name">
                                    {`
         Framer
         `}
                                </span>
                            </span>
                        </FilterDropdownButton>
                        <DropdownMenu className={"hs-dropdown-menu relative z-9999 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md border border-gray-200 rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full sf-hidden"} />
                    </div>
                    <div
                        id={"scrollBorder"}
                        className={"absolute bottom-0 left-0 right-0 h-px bg-gray-200 opacity-0 transition-opacity duration-200"}
                        style={{ opacity: "0" }}
                    >
                    </div>
                </div>
            );
        }
    

export default SidebarFiltersHeader
