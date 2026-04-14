import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Arrow_down_thick from '@/components/icons/Arrow_down_thick.tsx'
import Arrow_down from '@/components/icons/Arrow_down.tsx'


    
// Component

        function DropdownButton({
            id,
            className,
            children
        }: {
            id: string;
            className: string;
            children: React.ReactNode;
        }) {
            return (
                <button id={id} type={"button"} className={className}>
                    {children}
                    <Arrow_down_thick />
                </button>
            );
        }
    

export default DropdownButton
