import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Heartbeat_line from './icons/Heartbeat_line.tsx'


// Component

        function CreditsUsageLink({
            percentage
        }: {
            percentage: string;
        }) {
            return (
                <a className={"py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-md bg-white text-gray-600 hover:text-gray-700 group-hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800"}>
                    <Heartbeat_line />
                    <span className={"whitespace-nowrap"}>
                        Credits usage
                    </span>
                    <span className={"inline-flex items-center gap-x-1 rounded-full border px-1.5 py-0.5 text-[10px] leading-none font-medium border-emerald-200 bg-emerald-50 text-emerald-700"}>
                        <span className={"size-1.5 rounded-full bg-emerald-500"}>
                        </span>
                        <span>
                            {percentage}
                        </span>
                    </span>
                </a>
            );
        }
    

export default CreditsUsageLink
