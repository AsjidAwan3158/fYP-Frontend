import React from 'react'
import type { JSX } from 'react/jsx-runtime'



// Component

        function MainMenu() {
            return (
                <nav
                    id={"main-menu"}
                    className={"hidden lg:block fixed top-0 left-0 w-3/4 -mb-px h-full bg-white lg:bg-transparent z-50 m-0 lg:relative lg:w-auto text-sm font-medium text-gray-800 lg:ml-5 border-r border-gray-200 lg:border-none shadow-xs lg:shadow-none dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200"}
                >
                    <div className={"flex items-center text-gray-600 justify-between lg:hidden font-medium text-sm px-6 py-2.5 dark:text-gray-400 sf-hidden"}>
                    </div>
                    <div className={"pt-3 lg:pt-0 pl-4 lg:pl-0 snap-x w-full flex flex-col lg:flex-row lg:items-center gap-x-1 mx-auto lg:[&>div]:border-b-2 [&>div]:border-b-transparent [&>.active]:border-blue-600 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-800 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600"}>
                        <NavItem label="Dashboard" />
                        <NavItem label="Job Filters" />
                        <NavItem label="Notifications" />
                        <NavItem label="Proposal Generator" isActive />
                        <NavItem label="Auto Bidding" isRelative />
                    </div>
                </nav>
            );
        }
    

// Subcomponents

        function NavItem({
            label,
            isActive,
            isRelative
        }: {
            label: string;
            isActive?: boolean;
            isRelative?: boolean;
        }) {
            return (
                <div
                    className={`snap-center shrink-0 pb-2 lg:pt-2 border-t-2 border-t-transparent!${isActive ? " active" : ""}`}
                >
                    <a
                        className={`${isRelative ? "relative " : ""}py-1.5 px-2.5 inline-flex items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
                    >
                        {`
     ${label}
     `}
                    </a>
                </div>
            );
        }
    

export default MainMenu
