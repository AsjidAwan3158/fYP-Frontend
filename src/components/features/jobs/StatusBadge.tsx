import React from 'react'
import type { JSX } from 'react/jsx-runtime'



    
// Component

        function StatusBadge({
            sizeClass,
            content
        }: {
            sizeClass: string;
            content: React.ReactNode;
        }) {
            return (
                <div className={`text-xs ${sizeClass} bg-blue-100 text-blue-600 rounded-sm flex items-center justify-center`}>
                    {content}
                </div>
            );
        }
    

export default StatusBadge
