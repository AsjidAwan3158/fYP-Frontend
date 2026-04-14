import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import LogoLink from './LogoLink.tsx'
import MobileMenuToggle from './MobileMenuToggle.tsx'
import MainMenu from './MainMenu.tsx'
import CreditsUsageLink from './CreditsUsageLink.tsx'
import NotificationButton from './NotificationButton.tsx'
import DropdownButton from './DropdownButton.tsx'
import DropdownMenu from './DropdownMenu.tsx'


// Component

        function GlobalNavbar() {
            return (
                <nav className={"px-3 py-0 flex items-center justify-between w-full mx-auto min-h-12"}>
                    <div className={"pl-3 mr-5 md:mr-8 flex items-center"}>
                        <LogoLink />
                        <MobileMenuToggle />
                        <MainMenu />
                    </div>
                    <div className={"flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3 py-2"}>
                        <div className={"flex flex-row items-center justify-end gap-0.5"}>
                            <div className={"hidden sf-hidden"}>
                            </div>
                            <div className={"relative group hidden lg:inline-block"}>
                                <CreditsUsageLink percentage="14%" />
                                <div className={"absolute top-full right-0 z-40 hidden pt-1 group-hover:block group-focus-within:block sf-hidden"}>
                                </div>
                            </div>
                            <NotificationButton />
                            <HeaderDropdown
                                buttonId="hs-dropdown-help-and-support"
                                buttonClassName="py-1.5 px-1.5 xl:px-3 inline-flex justify-center items-center gap-x-1 xl:gap-x-2 text-sm rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 group-[.open]:text-gray-600 group-[.open]:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 dark:group-[.open]:text-gray-300 dark:group-[.open]:bg-gray-800"
                                buttonDataId="0"
                                menuClassName="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 z-20 bg-white border shadow-md rounded-lg p-2 dark:bg-gray-900 dark:border dark:border-gray-700 sf-hidden"
                            />
                            <HeaderDropdown
                                buttonId="hs-dropdown-with-header"
                                buttonClassName="max-w-40 xl:max-w-60 2xl:max-w-80 py-1.5 pl-1.5 pr-1 xl:pl-3 xl:pr-2 inline-flex justify-center items-center gap-x-1 xl:gap-x-2 text-sm rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 group-[.open]:text-gray-600 group-[.open]:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 dark:group-[.open]:text-gray-300 dark:group-[.open]:bg-gray-800"
                                buttonDataId="1"
                                menuClassName="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 z-50 bg-white shadow-md border border-gray-200 rounded-lg p-2 dark:bg-gray-900 dark:border dark:border-gray-700 sf-hidden"
                            />
                        </div>
                    </div>
                </nav>
            );
        }
    

// Subcomponents

        function HeaderDropdown({
            buttonId,
            buttonClassName,
            buttonDataId,
            menuClassName
        }: {
            buttonId: string;
            buttonClassName: string;
            buttonDataId: string;
            menuClassName: string;
        }) {
            return (
                <div className={"group hs-dropdown relative inline-flex [--placement:bottom-right] [--offset:4px]"}>
                    <DropdownButton
                        id={buttonId}
                        className={buttonClassName}
                        dataId={buttonDataId}
                    />
                    <DropdownMenu className={menuClassName} />
                </div>
            );
        }
    

export default GlobalNavbar
