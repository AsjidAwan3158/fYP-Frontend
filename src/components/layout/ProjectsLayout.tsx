import React, { useState, createContext, useContext, useCallback, useMemo } from 'react'
import type { JSX } from 'react/jsx-runtime'

import HiddenContainer from '../common/links/HiddenContainer.tsx'
import ApplyFilterButton from '../features/filters/ApplyFilterButton.tsx'
import DocumentationLink from '../common/links/DocumentationLink.tsx'
import SidebarFiltersHeader from '../features/filters/SidebarFiltersHeader.tsx'
import SidebarToggleSection from './SidebarToggleSection.tsx'
import HeaderActionsSection from '../common/links/HeaderActionsSection.tsx'
import JobTasksTable from '../features/jobs/JobTasksTable.tsx'
import FiltersPanel from '../features/filters/FiltersPanel.tsx'


// Create context for sidebar visibility
export const SidebarContext = createContext<{
    isVisible: boolean;
    toggleSidebar: () => void;
}>({
    isVisible: true,
    toggleSidebar: () => {}
});

export const useSidebar = () => useContext(SidebarContext);

// Component

        function ProjectsLayout() {
            const [isSidebarVisible, setIsSidebarVisible] = useState(true);

            const toggleSidebar = useCallback(() => {
                setIsSidebarVisible(prev => !prev);
            }, []);

            const contextValue = useMemo(() => ({
                isVisible: isSidebarVisible,
                toggleSidebar
            }), [isSidebarVisible, toggleSidebar]);

            return (
                <SidebarContext.Provider value={contextValue}>
                <main id={"content"} role={"main"} className={"max-h-full overflow-auto rounded-lg max-w-screen mx-auto flex w-full flex-1 px-2 pb-2"}>
                    <div className={"w-full border border-gray-950/10 rounded-lg bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900"} data-sidebar-container data-sidebar-visible="true">
                        <div className={"flex flex-col lg:flex-row h-full align-stretch"}>
                            <div className={"sidebar-backdrop js-close-sidebar fixed inset-0 bg-black/50 z-40 hidden lg:hidden sf-hidden"}>
                            </div>
                            <div
                                className={"sidebar border-r pb-16 hidden lg:block fixed inset-0 z-50 bg-white lg:bg-gray-50 lg:rounded-l-lg lg:relative lg:inset-auto lg:z-auto lg:h-full transition-all duration-300 ease-in-out lg:w-[350px] lg:opacity-100"}
                                style={{ minHeight: "530px" }}
                            >
                                <form id={"filter"} className={"h-full flex flex-col"}>
                                    <SidebarFiltersHeader />
                                    <HiddenContainer />
                                    <FiltersPanel />
                                </form>
                                <div className={"absolute bottom-0 left-0 right-0 z-20 p-3 bg-white border-t border-gray-200 rounded-bl-lg"}>
                                    <ApplyFilterButton />
                                    <DocumentationLink label="Documentation" />
                                </div>
                            </div>
                            <div className={"main flex-1 flex flex-col h-full bg-white rounded-lg"}>
                                <div className={"flex align-center px-3 py-3"}>
                                    <SidebarToggleSection />
                                    <h1 className={"text-sm font-medium m-0 mr-5 ml-3 flex items-center gap-4"}>
                                        <span id={"total"}>
                                            5 586 projects
                                        </span>
                                        <span id={"searching-state"} className={"text-xs text-gray-600 pt-[3px] hidden"} style={{ display: "none" }}>
                                            Searching projects
                                        </span>
                                    </h1>
                                    <HeaderActionsSection />
                                </div>
                                <div className={"flex-1 overflow-hidden flex flex-col h-full"}>
                                    <div className={"table-responsive-md u-datatable flex-1 overflow-hidden flex flex-col h-full"}>
                                        <div className={"js-new-projects-notification"}>
                                            <div className={"notification notice hidden sf-hidden"}>
                                            </div>
                                        </div>
                                        <div className={"w-full h-full"}>
                                            <div className={"flex flex-col h-full"}>
                                                <div className={"h-full"}>
                                                    <div className={"min-w-full inline-block align-middle h-full"}>
                                                        <div className={"overflow-y-auto h-full"}>
                                                            <JobTasksTable dataId="0" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <audio id={"notification-sound"} preload={"auto"} className={"sf-hidden"} src="images/e68c6b5f-1f4a-4f7c-a537-158bb2de0772.mp3">
                        </audio>
                        <div id={"hs-modal-configure-columns"} className={"hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none sf-hidden"}>
                        </div>
                        <div id={"hs-modal-instructions"} className={"hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none sf-hidden"}>
                        </div>
                        <div id={"hs-modal-freelancer-location"} className={"hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none sf-hidden"}>
                        </div>
                        <div id={"hs-duplicate-filter-modal"} className={"hs-overlay hidden w-full h-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto text-start sf-hidden"}>
                        </div>
                        <div id={"hs-rename-filter-modal"} className={"hs-overlay hidden w-full h-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto text-start sf-hidden"}>
                        </div>
                        <div id={"hs-remove-filter-modal"} className={"hs-overlay hidden w-full h-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto text-start sf-hidden"}>
                        </div>
                        <div id={"hs-share-filter-modal"} className={"hs-overlay hidden w-full h-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto text-start sf-hidden"}>
                        </div>
                        <div id={"filter-ai-qualifier-modal-31310"} className={"hs-overlay hidden w-full h-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto text-start sf-hidden"}>
                        </div>
                        <div id={"hs-notifications-setup-modal"} className={"hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none sf-hidden"}>
                        </div>
                        <div id={"hs-proposal-generator-modal"} className={"hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none sf-hidden"}>
                        </div>
                    </div>
                </main>
                </SidebarContext.Provider>
            );
        }


export default ProjectsLayout
