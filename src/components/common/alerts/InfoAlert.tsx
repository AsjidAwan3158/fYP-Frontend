import React from 'react'

// Lightbulb icon
const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M9 18h6"></path>
        <path d="M10 22h4"></path>
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
    </svg>
)

interface InfoAlertProps {
    message: string;
    icon?: React.ReactNode;
}

function InfoAlert({ message, icon }: InfoAlertProps) {
    return (
        <div className="w-full bg-blue-50 rounded-lg px-4 py-3 flex items-start gap-3">
            <span className="text-blue-500 mt-0.5">
                {icon || <LightbulbIcon />}
            </span>
            <p className="text-sm text-blue-600 leading-relaxed">
                {message}
            </p>
        </div>
    );
}

export default InfoAlert
