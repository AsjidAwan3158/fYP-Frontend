import React, { useState } from 'react'

// Icons for the expanded content
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
)

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
    </svg>
)

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
)

const BadgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z"/>
    </svg>
)

const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
)

const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v5h5"/>
        <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
        <path d="M12 7v5l4 2"/>
    </svg>
)

const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
)

const ThumbsDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 14V2"/>
        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/>
    </svg>
)

const LightningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
)

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
)

interface JobExpandedContentProps {
    jobData: {
        requiredConnects: number;
        rating: number;
        reviewCount: number;
        totalSpent: string;
        avgHourlyRate: string;
        clientLocation: string;
        countryFlag: string;
        description: string[];
        clientQuestions: string[];
        skills: { name: string; highlighted: boolean }[];
        hoursPerWeek: string;
        duration: string;
        expertiseLevel: string;
        projectType: string;
        clientWorkHistory: number;
        category: string;
    };
}

function JobExpandedContent({ jobData }: JobExpandedContentProps) {
    const [markAs, setMarkAs] = useState({
        viewed: false,
        applied: false,
        replied: false,
        hired: false
    });

    const handleMarkAsChange = (field: keyof typeof markAs) => {
        setMarkAs(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-white">
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4 pb-3 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                    <span className="font-medium text-gray-700">Required Connects:</span>
                    <span>{jobData.requiredConnects}</span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1">
                    <span className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} />
                        ))}
                    </span>
                    <span className="font-medium">{jobData.rating}</span>
                    <span className="text-gray-500">({jobData.reviewCount} reviews)</span>
                </span>
                <span className="font-medium">{jobData.totalSpent} Spent</span>
                <span>
                    <span className="font-medium">{jobData.avgHourlyRate}</span>
                    <span className="text-gray-500 text-xs ml-1">(avg hourly rate)</span>
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="text-lg">{jobData.countryFlag}</span>
                    <span>{jobData.clientLocation}</span>
                </span>
            </div>

            {/* Job Description */}
            <div className="mb-4 space-y-3 text-gray-700 text-sm leading-relaxed">
                {jobData.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* Client's Questions */}
            {jobData.clientQuestions.length > 0 && (
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Client's questions:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                        {jobData.clientQuestions.map((question, index) => (
                            <li key={index}>{question}</li>
                        ))}
                    </ol>
                </div>
            )}

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {jobData.skills.map((skill, index) => (
                    <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm border ${
                            skill.highlighted
                                ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`} style={{paddingLeft: "8px", paddingRight: "8px", paddingTop: "1px", paddingBottom: "1px"}}
                    >
                        {skill.name}
                    </span>
                ))}
            </div>

            {/* Engagement Terms */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1.5">
                    <ClockIcon />
                    <span>{jobData.hoursPerWeek}</span>
                </span>
                <span className="flex items-center gap-1.5">
                    <CalendarIcon />
                    <span>{jobData.duration}</span>
                </span>
                <span className="flex items-center gap-1.5">
                    <BadgeIcon />
                    <span>{jobData.expertiseLevel}</span>
                </span>
                <span className="flex items-center gap-1.5">
                    <FolderIcon />
                    <span>{jobData.projectType}</span>
                </span>
                <span className="flex items-center gap-1.5 text-blue-600 hover:underline cursor-pointer">
                    <HistoryIcon />
                    <span>Client's Work History ({jobData.clientWorkHistory} projects)</span>
                </span>
            </div>

            {/* Category */}
            <div className="text-sm text-gray-500 mb-4">
                {jobData.category}
            </div>

            {/* Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-100">
                {/* Mark As Checkboxes */}
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Mark as:</span>
                    {(['viewed', 'applied', 'replied', 'hired'] as const).map((field) => (
                        <label key={field} className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                            <input
                                type="checkbox"
                                checked={markAs[field]}
                                onChange={() => handleMarkAsChange(field)}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="capitalize">{field}</span>
                        </label>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                        aria-label="Thumbs down"
                    >
                        <ThumbsDownIcon />
                    </button>

                    <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                        <BookmarkIcon />
                        <span>Save job</span>
                    </button>

                    <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-400 rounded-full hover:bg-blue-50 transition-colors">
                        <LightningIcon />
                        <span>Generate Proposal & Apply</span>
                    </button>

                    <a
                        href="#"
                        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <span>Open project</span>
                        <ExternalLinkIcon />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default JobExpandedContent
