import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Help_question_circle from '../icons/Help_question_circle.tsx'
import User_profile_avatar from '../icons/User_profile_avatar.tsx'
import LogoLink from '../common/links/LogoLink.tsx'
import MenuToggleButton from './MenuToggleButton.tsx'
import MainMenu from './MainMenu.tsx'
import CreditsUsageLink from '../common/links/CreditsUsageLink.tsx'
import WhatsNewButton from '../common/links/WhatsNewButton.tsx'
import DropdownButton from '../common/dropdowns/DropdownButton.tsx'
import DropdownMenu from '../common/dropdowns/DropdownMenu.tsx'
import UserProfileDropdown from '../common/dropdowns/UserProfileDropdown.tsx'
import HelpDropdown from '../common/dropdowns/HelpDropdown.tsx'


// Component

        function TopNavigation({ teamName }: { teamName: string }) {
            return (
                <nav className={"px-3 py-0 flex items-center justify-between w-full mx-auto min-h-12"}>
                    <div className={"pl-3 mr-5 md:mr-8 flex items-center"}>
                        <LogoLink />
                        <MenuToggleButton />
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
                            <WhatsNewButton />
                            <HelpDropdown />
                            <UserProfileDropdown teamName={teamName} />
                        </div>
                    </div>
                </nav>
            );
        }
    

// Subcomponents

        function HeaderDropdown({
            button,
            menu
        }: {
            button: React.ReactNode;
            menu: React.ReactNode;
        }) {
            return (
                <div className={"group hs-dropdown relative inline-flex [--placement:bottom-right] [--offset:4px]"}>
                    {button}
                    {menu}
                </div>
            );
        }
    

export default TopNavigation
