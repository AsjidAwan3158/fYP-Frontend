import React, { useState } from 'react'
import type { JSX } from 'react/jsx-runtime'

import Notification_bell from '@/components/icons/Notification_bell.tsx'
import Notification_bell1 from '@/components/icons/Notification_bell1.tsx'
import ManageNotificationsModal from '@/components/common/modals/ManageNotificationsModal.tsx'


// Component
function ManageAlertsButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                type="button"
                id="notifications-setup-btn"
                onClick={handleOpenModal}
                className="hs-tooltip-toggle group pl-3 pr-3 py-1 text-sm flex items-center gap-1.5 shadow-xs rounded-lg border transition-all duration-200 relative bg-blue-50/50 border-blue-200/75 text-blue-800 hover:bg-blue-50"
            >
                <span id="notifications-btn-icon" className="text-blue-600 transition-colors">
                    <Notification_bell1 />
                </span>
                <span id="notifications-btn-text" className="hidden md:inline">
                    Manage Alerts
                </span>
                <span id="email-issue-indicator" className="hidden absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 sf-hidden">
                </span>
            </button>

            <ManageNotificationsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}


export default ManageAlertsButton
