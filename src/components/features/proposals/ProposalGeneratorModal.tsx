import React from 'react'
import Modal from '../../ui/Modal.tsx'
import FeatureGrid from '../../common/links/FeatureGrid.tsx'
import InfoAlert from '../../common/alerts/InfoAlert.tsx'

// Close icon
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
)

// Stacked documents icon (blue)
const StackedDocumentsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        {/* Back document */}
        <rect x="16" y="8" width="32" height="40" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        <line x1="22" y1="18" x2="42" y2="18" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="26" x2="42" y2="26" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="34" x2="36" y2="34" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />

        {/* Front document */}
        <rect x="20" y="16" width="32" height="40" rx="4" fill="#eff6ff" stroke="#60a5fa" strokeWidth="2" />
        <line x1="26" y1="26" x2="46" y2="26" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="34" x2="46" y2="34" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="42" x2="40" y2="42" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

interface ProposalGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const features = [
    { text: 'Auto-insert client name & details' },
    { text: 'Reference work history & budgets' },
    { text: 'Showcase your profile & portfolio' },
    { text: 'Learns from winning proposals' },
];

function ProposalGeneratorModal({ isOpen, onClose }: ProposalGeneratorModalProps) {
    if (!isOpen) return null;

    return (
        <Modal onClose={onClose}>
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900">AI Proposal Generator</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="px-6 py-6">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <StackedDocumentsIcon />
                    </div>

                    {/* Heading */}
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                        Stop copy-pasting generic proposals
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-center mb-6 leading-relaxed">
                        Let AI draft unique, personalized cover letters for you. It analyzes the job description and your profile to answer client questions and craft the perfect pitch in seconds.
                    </p>

                    {/* Feature Grid */}
                    <div className="flex justify-center mb-6">
                        <FeatureGrid features={features} columns={2} />
                    </div>

                    {/* Info Alert */}
                    <InfoAlert
                        message="Re-usable templates help you save time and be more productive, especially if you repeat the same work over and over for every new project."
                    />
                </div>
            </div>
        </Modal>
    );
}

export default ProposalGeneratorModal
