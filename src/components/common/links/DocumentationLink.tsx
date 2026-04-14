import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Arrow_up_right from '@/components/icons/Arrow_up_right.tsx'
import Closed_book from '@/components/icons/Closed_book.tsx'
import Arrow_up_right1 from '@/components/icons/Arrow_up_right1.tsx'


// Component

        function DocumentationLink({
            label
        }: {
            label: string;
        }) {
            return (
                <a target={"_blank"} className={"group flex items-center gap-x-2 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"}>
                    <Closed_book />
                    <span>
                        {label}
                    </span>
                    <Arrow_up_right1 />
                </a>
            )
        }
    

export default DocumentationLink
