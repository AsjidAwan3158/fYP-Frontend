import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Downward_chevron from './icons/Downward_chevron.tsx'
import Downward_chevron1 from './icons/Downward_chevron1.tsx'


// Component

        function ChevronMenuButton() {
            return (
                <button
                    className={"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-md text-xs h-6 w-6 p-0"}
                    type={"button"}
                    id={"radix-:r0:"}
                >
                    <Downward_chevron1 />
                </button>
            );
        }
    

export default ChevronMenuButton
