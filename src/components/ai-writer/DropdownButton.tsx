import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Question_mark_circle from './icons/Question_mark_circle.tsx'
import Downward_chevron from './icons/Downward_chevron.tsx'
import User_profile_outline from './icons/User_profile_outline.tsx'
import User_profile from './icons/User_profile.tsx'


        type DropdownButtonData = {
            leading: JSX.Element;
        }
    
// Component

        function DropdownButton({
            id,
            className,
            dataId
        }: {
            id: string;
            className: string;
            dataId: string;
        }) {
            const { leading }: DropdownButtonData = getDropdownButtonData(dataId);

            return (
                <button
                    id={id}
                    type={"button"}
                    className={className}
                >
                    {leading}
                    <Downward_chevron />
                </button>
            );
        }
    


        function getDropdownButtonData(id: string): DropdownButtonData {
            const key = String(id);

            const map: Record<string, DropdownButtonData> = {
                "0": {
                    leading: (
                        <>
                            <Question_mark_circle />
                            <span className={"hidden md:inline"}>
                                Help
                            </span>
                        </>
                    )
                },
                "1": {
                    leading: (
                        <>
                            <span className={"hidden md:inline whitespace-nowrap text-ellipsis overflow-hidden"}>
                                {`
     Usman team
     `}
                            </span>
                            <span className={"inline md:hidden sf-hidden"}>
                                <User_profile_outline />
                            </span>
                        </>
                    )
                }
            };

            return map[key] ?? map["0"];
        }
    

export default DropdownButton
