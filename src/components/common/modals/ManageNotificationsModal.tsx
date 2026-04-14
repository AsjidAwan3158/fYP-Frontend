import React, { useState, useEffect } from 'react'
import Toggle from '@/components/common/links/Toggle.tsx'

// Icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
)

const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
    </svg>
)

const PushIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
)

const SlackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="13" y="2" width="3" height="8" rx="1.5"/>
        <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5"/>
        <rect x="8" y="14" width="3" height="8" rx="1.5"/>
        <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5"/>
        <rect x="14" y="13" width="8" height="3" rx="1.5"/>
        <path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5"/>
        <rect x="2" y="8" width="8" height="3" rx="1.5"/>
        <path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5"/>
    </svg>
)

const DiscordIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="12" r="1"/>
        <circle cx="15" cy="12" r="1"/>
        <path d="M7.5 7.5c3.5-1 5.5-1 9 0"/>
        <path d="M7 16.5c3.5 1 6.5 1 10 0"/>
        <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"/>
        <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.476-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"/>
    </svg>
)

const TelegramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z"/>
        <path d="M22 2 11 13"/>
    </svg>
)

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
)

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
    </svg>
)

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
    </svg>
)

interface NotificationOption {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    enabled: boolean;
    connected?: boolean;
    requiresSetup?: boolean;
}

interface ManageNotificationsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function ManageNotificationsModal({ isOpen, onClose }: ManageNotificationsModalProps) {
    const [notifications, setNotifications] = useState<NotificationOption[]>([
        {
            id: 'email',
            name: 'Email',
            description: 'Receive job alerts via email',
            icon: <EmailIcon />,
            enabled: true,
            connected: true
        },
        {
            id: 'push',
            name: 'Push Notifications',
            description: 'Browser push notifications',
            icon: <PushIcon />,
            enabled: true,
            connected: true
        },
        {
            id: 'slack',
            name: 'Slack',
            description: 'Get alerts in Slack channels',
            icon: <SlackIcon />,
            enabled: false,
            connected: false,
            requiresSetup: true
        },
        {
            id: 'discord',
            name: 'Discord',
            description: 'Receive alerts in Discord',
            icon: <DiscordIcon />,
            enabled: false,
            connected: false,
            requiresSetup: true
        },
        {
            id: 'telegram',
            name: 'Telegram',
            description: 'Get instant Telegram alerts',
            icon: <TelegramIcon />,
            enabled: false,
            connected: true
        }
    ]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const toggleNotification = (id: string) => {
        setNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, enabled: !n.enabled } : n
            )
        );
    };

    const handleConnect = (id: string) => {
        // Simulate connecting to a service
        setNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, connected: true, requiresSetup: false } : n
            )
        );
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-white rounded-xl shadow-2xl w-full max-w-md pointer-events-auto transform transition-all duration-300 scale-100 opacity-100"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                            Manage Notifications
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Close modal"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Notification Options */}
                    <div className="px-6 py-4">
                        <div className="space-y-3">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${
                                            notification.enabled && notification.connected
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-gray-200 text-gray-500'
                                        }`}>
                                            {notification.icon}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {notification.name}
                                                </span>
                                                {notification.connected && notification.enabled && (
                                                    <span className="flex items-center gap-1 text-xs text-green-600">
                                                        <CheckIcon />
                                                        Connected
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {notification.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {notification.requiresSetup && !notification.connected ? (
                                            <button
                                                onClick={() => handleConnect(notification.id)}
                                                className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                            >
                                                Connect
                                            </button>
                                        ) : (
                                            <Toggle
                                                enabled={notification.enabled}
                                                onChange={() => toggleNotification(notification.id)}
                                                size="sm"
                                                disabled={!notification.connected}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer - Advanced Options */}
                    <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-600">
                                <SettingsIcon />
                                <span className="text-sm">Advanced notification settings</span>
                            </div>
                            <button
                                onClick={() => {}}
                                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                Explore
                                <ChevronRightIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageNotificationsModal
