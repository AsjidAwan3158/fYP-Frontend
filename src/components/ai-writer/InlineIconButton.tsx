import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Sparkles_shiny from './icons/Sparkles_shiny.tsx'
import Lightbulb_idea from './icons/Lightbulb_idea.tsx'
import Sparkles_shiny1 from './icons/Sparkles_shiny1.tsx'
import IconButton from './IconButton.tsx'


    
// Component

        function InlineIconButton({
            label,
            icon
        }: {
            label: string;
            icon: "idea" | "sparkles";
        }) {
            return (
                <button className={"inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-6 px-2 text-xs gap-1 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 rounded-full hover:bg-violet-50"}>
                    {icon === "idea" ? <Lightbulb_idea /> : <Sparkles_shiny1 />}
                    {label}
                </button>
            );
        }
    

export default InlineIconButton
