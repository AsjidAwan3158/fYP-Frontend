import React, { useState, useEffect } from 'react'
import type { JSX } from 'react/jsx-runtime'

import Pagination_arrow_next from '@/components/icons/Pagination_arrow_next.tsx'
import Pagination_arrow_previous from '@/components/icons/Pagination_arrow_previous.tsx'


// Component
function ToggleFilterArrowsButton() {
    const [isVisible, setIsVisible] = useState(true);

    const handleToggle = () => {
        setIsVisible(prev => {
            const newValue = !prev;
            // Toggle the sidebar visibility using a data attribute on the main container
            const mainContainer = document.querySelector('[data-sidebar-container]');
            if (mainContainer) {
                mainContainer.setAttribute('data-sidebar-visible', String(newValue));
            }
            return newValue;
        });
    };

    // Initialize on mount
    useEffect(() => {
        const mainContainer = document.querySelector('[data-sidebar-container]');
        if (mainContainer) {
            mainContainer.setAttribute('data-sidebar-visible', 'true');
        }
    }, []);

    return (
        <button
            type={"button"}
            className={"js-toggle-filter hs-tooltip-toggle flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400 transition-colors duration-150 shadow-sm"}
            onClick={handleToggle}
            aria-label={isVisible ? "Hide sidebar" : "Show sidebar"}
        >
            {isVisible ? <Pagination_arrow_previous /> : <Pagination_arrow_next />}
        </button>
    );
}


export default ToggleFilterArrowsButton
