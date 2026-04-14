import React from 'react'
import type { JSX } from 'react/jsx-runtime'
import { useNavigate } from 'react-router-dom'

import DropdownButton from '@/components/common/dropdowns/DropdownButton.tsx'



// Component

        function FilterDropdownButton({
            id,
            className,
            children,
            arrow
        }: {
            id: string;
            className: string;
            children: React.ReactNode;
            arrow: React.ReactNode;
        }) {
            const navigate = useNavigate();

            const handleClick = () => {
                navigate('/filters');
            };

            return (
                <button id={id} type={"button"} className={className} onClick={handleClick}>
                    {children}
                    {arrow}
                </button>
            );
        }


export default FilterDropdownButton
