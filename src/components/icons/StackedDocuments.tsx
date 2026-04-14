import React from 'react';

export const StackedDocuments = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            {/* Back document */}
            <rect x="14" y="8" width="36" height="44" rx="4" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.5"/>
            {/* Middle document */}
            <rect x="10" y="12" width="36" height="44" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
            {/* Front document */}
            <rect x="6" y="16" width="36" height="44" rx="4" fill="white" stroke="#3B82F6" strokeWidth="1.5"/>
            {/* Lines on front document */}
            <line x1="14" y1="28" x2="34" y2="28" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
            <line x1="14" y1="36" x2="30" y2="36" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
            <line x1="14" y1="44" x2="32" y2="44" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
}

export default StackedDocuments;
