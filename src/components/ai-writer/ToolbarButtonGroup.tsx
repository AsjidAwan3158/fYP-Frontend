import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import ToolbarButton from './ToolbarButton.tsx'


    
// Component

        function ToolbarButtonGroup({
            leftClassName,
            leftTitle,
            leftIcon,
            rightClassName,
            rightTitle
        }: {
            leftClassName: string;
            leftTitle: string;
            leftIcon: string;
            rightClassName: string;
            rightTitle: string;
        }) {
            return (
                <div className={"flex h-full group"}>
                    <ToolbarButton
                        className={leftClassName}
                        title={leftTitle}
                        icon={leftIcon}
                    />
                    <ToolbarButton
                        className={rightClassName}
                        title={rightTitle}
                        icon="chevron"
                    />
                </div>
            );
        }
    

export default ToolbarButtonGroup
