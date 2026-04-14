import React, { useState } from 'react'
import type { JSX } from 'react/jsx-runtime'

import Arrow_down_thick from './icons/Arrow_down_thick.tsx'
import Hash_symbol from './icons/Hash_symbol.tsx'
import Arrow_down_thick3 from './icons/Arrow_down_thick3.tsx'
import Circle_dollar_sign from './icons/Circle_dollar_sign.tsx'
import User_check from './icons/User_check.tsx'
import Check_mark from './icons/Check_mark.tsx'
import Map_location_marker from './icons/Map_location_marker.tsx'
import User_focus from './icons/User_focus.tsx'
import Settings_sliders from './icons/Settings_sliders.tsx'
import Hierarchical_structure from './icons/Hierarchical_structure.tsx'
import Connection_links from './icons/Connection_links.tsx'
import Arrow_down from './icons/Arrow_down.tsx'
import SectionLabel from './common/links/SectionLabel.tsx'
import StatusBadge from './features/jobs/StatusBadge.tsx'
import SearchLabel from './features/search/SearchLabel.tsx'
import SearchTextarea from './features/search/SearchTextarea.tsx'
import HelpLink from './common/links/HelpLink.tsx'
import MonitoringCheckbox from './features/search/MonitoringCheckbox.tsx'
import MonitoringSearchOptions from './features/search/MonitoringSearchOptions.tsx'
import SearchKeywordsCollapsible from './SearchKeywordsCollapsible.tsx'
import ExcludeKeywordsSection from '@/components/features/search/ExcludeKeywordsSection.tsx'
import JobTermsContent from './features/jobs/JobTermsContent.tsx'


// Component

function FiltersPanel() {
    return (
        <fieldset className={"h-full overflow-y-auto"}>
            <div className={"font-size-1 px-2 pb-2 space-y-2 [&>.filter-section]:rounded-lg [&>.filter-section]:border [&>.filter-section]:border-transparent [&>.filter-section:hover]:bg-white [&>.filter-section:hover]:border-gray-200 [&>.active]:border-gray-200! [&>.active]:bg-white [&>.active]:rounded-lg"}>
                
                {/* Keywords section */}
                <FilterSection 
                    defaultOpen={true}
                    icon={<Hash_symbol />}
                    label="Keywords"
                    statusBadge={
                        <StatusBadge
                            sizeClass="h-4 min-w-4"
                            content={
                                <span className={"px-1"}>
                                    15
                                </span>
                            }
                        />
                    }
                    bodyClassName={"filter-section-body px-3 py-3"}
                >
                    <div className={"mb-2 js-search-keywords-block"}>
                        <SearchLabel /> {/* Keywords label component to test the sidebar layout */}
                        <SearchKeywordsCollapsible /> {/* Input Keywords component to the sidebar layout */}
                    </div>
                    <div className={"hidden search-keywords-recommendation my-3 bg-blue-100 border border-blue-200 text-blue-600 rounded-lg p-2 dark:bg-blue-800/10 dark:border-blue-900 dark:text-white sf-hidden"} role={"alert"}>
                    </div>
                    <div className={"mt-4 mb-4 js-negative-keywords-block"}>
                        <ExcludeKeywordsSection />
                    </div>
                    <SearchTextarea />
                    <div className={"mb-4"}>
                        <HelpLink label="How to use" />
                    </div>
                    <div>
                        {/* <AdvancedKeywordsOptionsLabel /> */}
                        <SearchLabel text='Advanced Keywords Options:'/>
                        <MonitoringSearchOptions />
                     
                        {/* <div className={"mb-5"}>
                            <div className={"flex items-center mb-1"}>
                                <MonitoringCheckbox
                                    id="monitoring_form_highlight"
                                    name="highlight_keywords"
                                    checked={true}
                                />
                                <label className={"text-gray-900 ms-2 dark:text-gray-400 cursor-pointer text-sm"} htmlFor={"monitoring_form_highlight"}>
                                    {`     Highlight keywords     `}
                                </label>
                            </div>
                        </div>
                        <div className={"mb-0"}>
                            <div className={"flex items-center mb-1"}>
                                <MonitoringCheckbox
                                    id="monitoring_form_searchQuery"
                                    name="use_search_query"
                                />
                                <label className={"text-gray-900 ms-2 dark:text-gray-400 cursor-pointer text-sm"} htmlFor={"monitoring_form_searchQuery"}>
                                    {`      Advanced Search Mode      `}
                                </label>
                            </div>
                        </div> */}
                    </div>
                </FilterSection>


                {/* Job terms section */}
                <FilterSection
                    icon={<Circle_dollar_sign />}
                    label="Job terms"
                    bodyClassName={"filter-section-body px-3 py-3"}
                >
                    <JobTermsContent />
                </FilterSection>

                {/* Client details section */}
                <FilterSection
                    icon={<User_check />}
                    label="Client details"
                    statusBadge={
                        <StatusBadge
                            sizeClass="size-4"
                            content={<Check_mark />}
                        />
                    }
                    bodyClassName={"filter-section-body px-3 py-3"}
                />

                {/* Advanced filters section */}
                <FilterSection
                    icon={<Connection_links />}
                    label="Advanced Filters"
                    bodyClassName={"filter-section-body px-3 py-3 sf-hidden"}
                />

            </div>
        </fieldset>
    );
}
    

// Subcomponents

function FilterSection({
    icon,
    label,
    statusBadge,
    defaultOpen = false,
    bodyClassName,
    children
}: {
    icon: React.ReactNode;
    label: string;
    statusBadge?: React.ReactNode;
    defaultOpen?: boolean;
    bodyClassName: string;
    children?: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className={`group/container filter-section${isOpen ? " active" : ""}`}>
            <div
                className={"group/title filter-section-title px-4 py-4 flex align-center cursor-pointer rounded-lg"}
                onClick={handleToggle}
            >
                <div className={"mr-2 flex items-center justify-center"}>
                    {icon}
                </div>
                <div className={"flex items-center gap-x-2"}>
                    <SectionLabel label={label} />
                </div>
                <div className={"ml-auto flex items-center gap-x-2"}>
                    {statusBadge}
                    <div style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                        <Arrow_down_thick3 />
                    </div>
                </div>
            </div>
            <div
                className={bodyClassName}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                {children}
            </div>
        </div>
    );
}
    

export default FiltersPanel
