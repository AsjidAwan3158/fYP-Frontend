import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import IconButton from './IconButton.tsx'
import InlineIconButton from './InlineIconButton.tsx'


// Component

        function InlineIconButtonRow({
            label1,
            icon1,
            label2,
            icon2
        }: {
            label1: string;
            icon1: string;
            label2: string;
            icon2: string;
        }) {
            return (
                <div className={"flex items-center gap-2"}>
                    <InlineIconButton label={label1} icon={icon1} />
                    <InlineIconButton label={label2} icon={icon2} />
                </div>
            );
        }
    

export default InlineIconButtonRow
