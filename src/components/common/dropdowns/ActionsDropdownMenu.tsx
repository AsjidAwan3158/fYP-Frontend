import React, { useState } from 'react'

// Icon components for menu items
const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
)

const HideIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line x1="2" y1="2" x2="22" y2="22"></line>
    </svg>
)

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
)

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
        <path d="m9 11 3 3L22 4"></path>
    </svg>
)

const ReplyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <polyline points="9 17 4 12 9 7"></polyline>
        <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
    </svg>
)

const UserCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M2 21a8 8 0 0 1 13.292-6"></path>
        <circle cx="10" cy="8" r="5"></circle>
        <path d="m16 19 2 2 4-4"></path>
    </svg>
)

interface MenuItemProps {
    icon: React.ReactNode
    label: string
    onClick?: () => void
}

function MenuItem({ icon, label, onClick }: MenuItemProps) {
    const [isPressed, setIsPressed] = useState(false)

    return (
        <button
            type="button"
            className={`
                w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 rounded-md
                transition-all duration-150 ease-in-out
                hover:bg-gray-100 hover:text-gray-900
                focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                active:bg-gray-200 active:scale-[0.98]
                ${isPressed ? 'bg-gray-200 scale-[0.98]' : ''}
            `}
            onClick={onClick}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            role="menuitem"
        >
            <span className="text-gray-500 group-hover:text-gray-700 transition-colors">
                {icon}
            </span>
            <span className="whitespace-nowrap">{label}</span>
        </button>
    )
}

interface ActionsDropdownMenuProps {
    isOpen: boolean
    onClose: () => void
    onAction?: (action: string) => void
}

function ActionsDropdownMenu({ isOpen, onClose, onAction }: ActionsDropdownMenuProps) {
    const handleAction = (action: string) => {
        if (onAction) {
            onAction(action)
        }
        onClose()
    }

    if (!isOpen) return null

    return (
        <div
            className="absolute top-full right-0 mt-1 bg-white shadow-lg border border-gray-200 rounded-lg z-50 min-w-[180px] py-1.5 animate-in fade-in slide-in-from-top-2 duration-150"
            role="menu"
            tabIndex={-1}
        >
            <MenuItem
                icon={<BookmarkIcon />}
                label="Save job"
                onClick={() => handleAction('save')}
            />
            <MenuItem
                icon={<HideIcon />}
                label="Hide project"
                onClick={() => handleAction('hide')}
            />
            <div className="border-t border-gray-100 my-1.5"></div>
            <MenuItem
                icon={<EyeIcon />}
                label="Mark as viewed"
                onClick={() => handleAction('viewed')}
            />
            <MenuItem
                icon={<CheckCircleIcon />}
                label="Mark as applied"
                onClick={() => handleAction('applied')}
            />
            <MenuItem
                icon={<ReplyIcon />}
                label="Mark as replied"
                onClick={() => handleAction('replied')}
            />
            <MenuItem
                icon={<UserCheckIcon />}
                label="Mark as hired"
                onClick={() => handleAction('hired')}
            />
        </div>
    )
}

export default ActionsDropdownMenu
