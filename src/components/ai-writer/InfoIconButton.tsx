import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Circle_info from './icons/Circle_info.tsx'
import IconButton from './IconButton.tsx'


// Component

        function InfoIconButton() {
            return (
                <button
                    type={"button"}
                    tabIndex={"0"}
                    className={"m-0 cursor-pointer border-0 bg-transparent p-0"}
                >
                    <Circle_info />
                </button>
            );
        }
    

export default InfoIconButton
