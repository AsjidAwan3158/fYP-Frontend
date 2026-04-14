import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Circle_question_mark from '@/components/icons/Circle_question_mark.tsx'
import Arrow_up_right from '@/components/icons/Arrow_up_right.tsx'


// Component

        function HelpLink({
            label
        }: {
            label: string;
        }) {
            return (
                <a target={"_blank"} className={"text-blue-600 flex items-center gap-x-1 hover:opacity-90 group"}>
                    <Circle_question_mark />
                    <span className={"text-sm group-hover:underline"}>
                        {`
     ${label}
     `}
                    </span>
                    <Arrow_up_right />
                </a>
            )
        }
    

export default HelpLink
