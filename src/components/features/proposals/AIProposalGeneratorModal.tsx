import React from 'react';
import Modal from '../../ui/Modal';
import FeatureGrid from '../../common/links/FeatureGrid';
import InfoAlert from '../../common/alerts/InfoAlert';
import StackedDocuments from '../../icons/StackedDocuments';
import Cross_mark from '../../icons/Cross_mark';

interface AIProposalGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function AIProposalGeneratorModal({ isOpen, onClose }: AIProposalGeneratorModalProps) {
    if (!isOpen) return null;

    const features = [
        { text: 'Auto-insert client name & details' },
        { text: 'Reference work history & budgets' },
        { text: 'Showcase your profile & portfolio' },
        { text: 'Learns from winning proposals' }
    ];

    const infoMessage = "Re-usable templates help you save time and be more productive, especially if you repeat the same work over and over for every new project.";

    return (
        <Modal onClose={onClose}>
            <div
                className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4"
                style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">
                        AI Proposal Generator
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100"
                        aria-label="Close modal"
                    >
                        <Cross_mark />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="px-6 py-6">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <StackedDocuments />
                    </div>

                    {/* Heading */}
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                        Stop copy-pasting generic proposals
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-center text-sm leading-relaxed mb-6">
                        Let AI draft unique, personalized cover letters for you. It analyzes the job description and your profile to answer client questions and craft the perfect pitch in seconds.
                    </p>

                    {/* Feature Grid */}
                    <div className="flex justify-center mb-6">
                        <FeatureGrid features={features} columns={2} />
                    </div>

                    {/* Informational Footer */}
                    <InfoAlert message={infoMessage} />
                </div>
            </div>
        </Modal>
    );
}

export default AIProposalGeneratorModal;
