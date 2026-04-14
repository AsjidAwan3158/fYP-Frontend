import React, { useState, useRef, useEffect } from 'react'

// Icons
const HelpQuestionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M12 17l0 .01"></path>
        <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"></path>
    </svg>
)

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M6 9l6 6l6 -6"></path>
    </svg>
)

const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
)

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
)

const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6"></path>
        <path d="M10 22h4"></path>
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
    </svg>
)

const ChatBubbleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
)

function HelpDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (action: string) => {
        console.log(`${action} clicked`);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Help Button */}
            <button
                onClick={handleToggle}
                className={`py-1.5 px-1.5 xl:px-3 inline-flex justify-center items-center gap-x-1 xl:gap-x-2 text-sm rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 ${isOpen ? 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-800' : ''}`}
            >
                <HelpQuestionIcon />
                <span className="hidden md:inline">Help</span>
                <ChevronDownIcon isOpen={isOpen} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-lg shadow-lg py-1" style={{ zIndex: 2147483646 }}>
                    {/* Documentation */}
                    <button
                        onClick={() => handleItemClick('Documentation')}
                        className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-gray-500">
                                <DocumentIcon />
                            </span>
                            <span>Documentation</span>
                        </div>
                        <span className="text-gray-400">
                            <ExternalLinkIcon />
                        </span>
                    </button>

                    {/* Share feedback */}
                    <button
                        onClick={() => handleItemClick('Share feedback')}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-gray-500">
                            <LightbulbIcon />
                        </span>
                        <span>Share feedback</span>
                    </button>

                    {/* Contact us */}
                    <button
                        onClick={() => handleItemClick('Contact us')}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-gray-500">
                            <ChatBubbleIcon />
                        </span>
                        <span>Contact us</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default HelpDropdown
