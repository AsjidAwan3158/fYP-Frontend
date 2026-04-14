import React, { useState, useRef, useEffect } from 'react'

// Icons
const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
)

const UpgradeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
)

const TeamSettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
)

const InviteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/>
        <line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
)

const ApiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
    </svg>
)

const WebhooksIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"/>
        <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"/>
        <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"/>
    </svg>
)

const UpworkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4"/>
        <path d="m6.41 6.41-2.83 2.83"/>
        <path d="M2 12h4"/>
        <path d="m6.41 17.59-2.83-2.83"/>
        <path d="M12 18v4"/>
        <path d="m17.59 17.59 2.83-2.83"/>
        <path d="M18 12h4"/>
        <path d="m17.59 6.41 2.83 2.83"/>
    </svg>
)

const EarnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
)

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
)

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
    </svg>
)

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"/>
    </svg>
)

interface UserProfileDropdownProps {
    teamName: string;
    email?: string;
}

function UserProfileDropdown({ teamName, email = "usman.ak508@gmail.com" }: UserProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuItems = [
        { icon: <SettingsIcon />, label: 'Account settings', onClick: () => {} },
        { icon: <UpgradeIcon />, label: 'Upgrade Vollna', onClick: () => {} },
        { icon: <TeamSettingsIcon />, label: 'Team settings', onClick: () => {} },
        { icon: <InviteIcon />, label: 'Invite team members', onClick: () => {} },
        { icon: <ApiIcon />, label: 'API tokens', onClick: () => {} },
        { icon: <WebhooksIcon />, label: 'Webhooks', onClick: () => {} },
        { icon: <UpworkIcon />, label: 'Upwork Profiles', onClick: () => {} },
    ];

    return (
        <div className="relative inline-flex" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`max-w-40 xl:max-w-60 2xl:max-w-80 py-1.5 pl-1.5 pr-1 xl:pl-3 xl:pr-2 inline-flex justify-center items-center gap-x-1 xl:gap-x-2 text-sm rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 ${isOpen ? 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-800' : ''}`}
            >
                <span className="hidden md:inline whitespace-nowrap text-ellipsis overflow-hidden">
                    {teamName}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-1 min-w-60 z-50 bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700"
                    role="menu"
                >
                    {/* Header Section */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">{email}</p>
                    </div>

                    {/* Team Selection */}
                    <div className="px-2 py-2 border-b border-gray-200 dark:border-gray-700">
                        <button
                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            onClick={() => {}}
                        >
                            <span>{teamName}</span>
                            <CheckIcon />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="px-2 py-2 border-b border-gray-200 dark:border-gray-700">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => {
                                    item.onClick();
                                    setIsOpen(false);
                                }}
                            >
                                <span className="text-gray-500 dark:text-gray-400">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Earn with Vollna */}
                    <div className="px-2 py-2 border-b border-gray-200 dark:border-gray-700">
                        <button
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="text-gray-500 dark:text-gray-400"><EarnIcon /></span>
                            <span>Earn with Vollna</span>
                        </button>
                    </div>

                    {/* Logout */}
                    <div className="px-2 py-2">
                        <button
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="text-red-500"><LogoutIcon /></span>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfileDropdown
