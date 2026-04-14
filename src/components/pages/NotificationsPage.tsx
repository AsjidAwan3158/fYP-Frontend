import React, { useState } from 'react'
import Toggle from '../common/links/Toggle.tsx'
import { getRecentAlerts, type MonitoringAlert } from '../../lib/backendApi'

// Icons
const DiscordIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
)

const GmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    </svg>
)

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
)

const MoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"/>
        <circle cx="12" cy="5" r="1"/>
        <circle cx="12" cy="19" r="1"/>
    </svg>
)

interface NotificationItem {
    id: string;
    type: 'discord' | 'email';
    name: string;
    details: string;
    isTrialPreview: boolean;
    filtersCount: number;
    frequency: string;
    lastNotification: string;
    enabled: boolean;
}

const defaultNotifications: NotificationItem[] = [
    {
        id: '1',
        type: 'discord',
        name: 'Notification to Discord',
        details: "Server: Event's Exhibitor's Extractor, Channel: cost-estimators",
        isTrialPreview: true,
        filtersCount: 1,
        frequency: 'Instantly',
        lastNotification: '1 hour ago',
        enabled: false
    },
    {
        id: '2',
        type: 'discord',
        name: 'Notification to Discord',
        details: "Server: Event's Exhibitor's Extractor, Channel: website-framer",
        isTrialPreview: true,
        filtersCount: 1,
        frequency: 'Instantly',
        lastNotification: '13 minutes ago',
        enabled: false
    },
    {
        id: '3',
        type: 'discord',
        name: 'Notification to Discord',
        details: "Server: Event's Exhibitor's Extractor, Channel: automators",
        isTrialPreview: true,
        filtersCount: 1,
        frequency: 'Instantly',
        lastNotification: '41 minutes ago',
        enabled: false
    },
    {
        id: '4',
        type: 'discord',
        name: 'Notification to Discord',
        details: "Server: Event's Exhibitor's Extractor, Channel: framer",
        isTrialPreview: true,
        filtersCount: 1,
        frequency: 'Instantly',
        lastNotification: '48 minutes ago',
        enabled: false
    },
    {
        id: '5',
        type: 'email',
        name: 'Notification to Email',
        details: 'usman.ak508@gmail.com',
        isTrialPreview: false,
        filtersCount: 1,
        frequency: 'Every 10 minutes',
        lastNotification: '--',
        enabled: false
    }
];

function NotificationsPage() {
    const [notifications, setNotifications] = useState<NotificationItem[]>(defaultNotifications);
    const [liveAlerts, setLiveAlerts] = useState<MonitoringAlert[] | null>(null);
    const [loadingAlerts, setLoadingAlerts] = useState(false);
    const [alertError, setAlertError] = useState<string | null>(null);

    const toggleNotification = (id: string) => {
        setNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, enabled: !n.enabled } : n
            )
        );
    };

    const handleShowLatest = async () => {
        setLoadingAlerts(true);
        setAlertError(null);
        try {
            const res = await getRecentAlerts(50);
            setLiveAlerts(res.alerts);
        } catch (e: any) {
            setAlertError(e.message ?? 'Failed to load alerts from backend.');
        } finally {
            setLoadingAlerts(false);
        }
    };

    return (
        <main className="flex-1 bg-white">
            <div className="px-8 py-6">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>

                    <div className="flex items-center gap-2">
                        {/* Add New Button */}
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-50 transition-colors">
                            <PlusIcon />
                            Add new
                        </button>

                        {/* Show Latest Notifications Button */}
                        <button
                            id="show-latest-notifications-btn"
                            onClick={handleShowLatest}
                            disabled={loadingAlerts}
                            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-60 transition-colors"
                        >
                            {loadingAlerts ? 'Loading…' : 'Show latest notifications'}
                        </button>
                    </div>
                </div>

                {/* Alert error */}
                {alertError && (
                    <div className="mb-4 px-4 py-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                        {alertError}
                    </div>
                )}

                {/* Live alerts from backend */}
                {liveAlerts && liveAlerts.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Live Alerts from Backend ({liveAlerts.length})</h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Job ID</th>
                                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Webhook URL</th>
                                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Sent At</th>
                                        <th className="text-center px-4 py-3 font-semibold text-gray-600">HTTP Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {liveAlerts.map((a, i) => (
                                        <tr key={a.alert_id} className={`hover:bg-gray-50/50 ${i < liveAlerts.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                            <td className="px-4 py-2 font-mono text-gray-700">{a.job_id.slice(0, 14)}…</td>
                                            <td className="px-4 py-2 text-gray-500 truncate max-w-xs">{a.webhook_url}</td>
                                            <td className="px-4 py-2 text-gray-500">{new Date(a.sent_at).toLocaleString()}</td>
                                            <td className="px-4 py-2 text-center">
                                                {a.response_status ? (
                                                    <span className={`px-2 py-0.5 rounded-full font-semibold ${a.response_status < 300 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {a.response_status}
                                                    </span>
                                                ) : '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {liveAlerts && liveAlerts.length === 0 && (
                    <div className="mb-4 text-sm text-gray-500 text-center py-4 bg-gray-50 border border-gray-200 rounded-lg">
                        No webhook alerts found in backend yet.
                    </div>
                )}

                {/* Table Container */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-white">
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Name</th>
                                <th className="text-center px-6 py-4 text-sm font-medium text-gray-600">Filters</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Frequency</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Last notification</th>
                                <th className="text-center px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                                <th className="px-4 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((notification, index) => (
                                <tr
                                    key={notification.id}
                                    className={`bg-white hover:bg-gray-50/50 transition-colors ${
                                        index < notifications.length - 1 ? 'border-b border-gray-200' : ''
                                    }`}
                                >
                                    {/* Name Column */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                notification.type === 'discord'
                                                    ? 'bg-indigo-100 text-indigo-600'
                                                    : 'bg-red-100 text-red-600'
                                            }`}>
                                                {notification.type === 'discord' ? <DiscordIcon /> : <GmailIcon />}
                                            </div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-sm text-gray-900">
                                                    {notification.name} ({notification.details})
                                                </span>
                                                {notification.isTrialPreview && (
                                                    <span className="px-2 py-0.5 text-xs font-medium text-orange-700 bg-orange-100 rounded border border-orange-200">
                                                        Trial preview
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Filters Column */}
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-blue-600 bg-white border border-blue-300 rounded-md">
                                            {notification.filtersCount} filters
                                        </span>
                                    </td>

                                    {/* Frequency Column */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-900">{notification.frequency}</span>
                                    </td>

                                    {/* Last Notification Column */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-500">{notification.lastNotification}</span>
                                    </td>

                                    {/* Status Column */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center">
                                            <Toggle
                                                enabled={notification.enabled}
                                                onChange={() => toggleNotification(notification.id)}
                                                size="sm"
                                            />
                                        </div>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="px-4 py-4">
                                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                                            <MoreIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {notifications.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center border border-gray-200 rounded-lg">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <DiscordIcon />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                        <p className="text-sm text-gray-500 mb-6">Create your first notification channel to start receiving alerts</p>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            <PlusIcon />
                            Add new
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default NotificationsPage
