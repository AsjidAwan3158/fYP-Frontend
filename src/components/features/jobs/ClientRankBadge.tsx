import React, { useState, useRef, useEffect } from 'react'

// Icons
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#22C55E" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
)

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={filled ? "#FBBF24" : "none"}
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
)

export interface ClientRankData {
    rankLevel: 1 | 2 | 3 | 4 | 5;
    paymentVerified: boolean;
    totalSpent: string;
    hires: number;
    jobsPosted: number;
    hireRate: number;
    openJobs: number;
    starRating: number;
    reviewCount: number;
    registeredDate: string;
    country: string;
    countryFlag: string;
    localTime: string;
    city?: string;
}

interface ClientRankBadgeProps {
    data: ClientRankData;
}

function ClientRankBadge({ data }: ClientRankBadgeProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState<'left' | 'right'>('left');
    const badgeRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Determine rank label and color based on rankLevel
    const getRankInfo = (level: number) => {
        if (level === 5) {
            return { label: 'Excellent', colorClass: 'text-green-600' };
        } else if (level === 4) {
            return { label: 'Medium', colorClass: 'text-yellow-500' };
        } else {
            return { label: 'Low', colorClass: 'text-red-500' };
        }
    };

    // Get badge color based on rank level
    const getBadgeColorClass = (level: number) => {
        switch (level) {
            case 1:
            case 2:
                return 'border-red-500 text-red-500 bg-red-50';
            case 3:
                return 'border-yellow-500 text-yellow-500 bg-yellow-50';
            case 4:
                return 'border-lime-500 text-lime-500 bg-lime-50';
            case 5:
                return 'border-green-600 text-green-600 bg-green-50';
            default:
                return 'border-gray-400 text-gray-400 bg-gray-50';
        }
    };

    const rankInfo = getRankInfo(data.rankLevel);
    const badgeColorClass = getBadgeColorClass(data.rankLevel);

    // Calculate popover position to keep it within viewport
    useEffect(() => {
        if (isHovered && badgeRef.current) {
            const rect = badgeRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            // If there's not enough space on the left, position on the right
            if (rect.left < 280) {
                setPopoverPosition('right');
            } else {
                setPopoverPosition('left');
            }
        }
    }, [isHovered]);

    // Generate star rating display
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(data.starRating);

        for (let i = 0; i < 5; i++) {
            stars.push(<StarIcon key={i} filled={i < fullStars} />);
        }
        return stars;
    };

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={badgeRef}
        >
            {/* Badge */}
            <div
                className={`flex items-center justify-center text-xs font-semibold h-5 w-5 px-1 border rounded cursor-pointer transition-colors ${badgeColorClass}`}
            >
                {data.rankLevel}
            </div>

            {/* Popover */}
            {isHovered && (
                <div
                    ref={popoverRef}
                    className={`absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[260px] ${
                        popoverPosition === 'left' ? 'right-full mr-2' : 'left-full ml-2'
                    } top-1/2 -translate-y-1/2`}
                    style={{
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-semibold text-gray-800">Client Rank -</span>
                        <span className={`text-sm font-semibold ${rankInfo.colorClass}`}>
                            {rankInfo.label}
                        </span>
                    </div>

                    {/* Payment Verified */}
                    {data.paymentVerified && (
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircleIcon />
                            <span className="text-sm text-gray-700">Payment method verified</span>
                        </div>
                    )}

                    {/* Total Spent & Hires */}
                    <div className="mb-2">
                        <div className="text-sm font-bold text-gray-900">{data.totalSpent} total spent</div>
                        <div className="text-sm text-gray-500">{data.hires} hires</div>
                    </div>

                    {/* Jobs Posted & Hire Rate */}
                    <div className="mb-3">
                        <div className="text-sm text-gray-700">{data.jobsPosted} jobs posted</div>
                        <div className="text-sm text-gray-500">
                            {data.hireRate}% hire rate, {data.openJobs} open job{data.openJobs !== 1 ? 's' : ''}
                        </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center gap-0.5">
                            {renderStars()}
                        </div>
                        <span className="text-sm text-gray-700">
                            {data.starRating.toFixed(2)} of {data.reviewCount} review{data.reviewCount !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {/* Registered Date */}
                    <div className="text-sm text-gray-700 mb-3">
                        Registered: {data.registeredDate}
                    </div>

                    {/* Country & Time */}
                    <div className="flex items-start gap-2">
                        <span className="text-lg leading-none">{data.countryFlag}</span>
                        <div>
                            <div className="text-sm font-medium text-gray-800">{data.country}</div>
                            <div className="text-sm text-gray-500 uppercase">
                                {data.city && `${data.city} `}{data.localTime}
                            </div>
                        </div>
                    </div>

                    {/* Arrow pointer */}
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white border-gray-200 transform rotate-45 ${
                            popoverPosition === 'left'
                                ? 'right-0 translate-x-1/2 border-r border-t'
                                : 'left-0 -translate-x-1/2 border-l border-b'
                        }`}
                    />
                </div>
            )}
        </div>
    );
}

export default ClientRankBadge
