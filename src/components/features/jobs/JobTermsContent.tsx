import React, { useState } from 'react'

function JobTermsContent() {
    const [hourlyRateChecked, setHourlyRateChecked] = useState(true);
    const [fixedPriceChecked, setFixedPriceChecked] = useState(true);
    const [hideWithoutBudget, setHideWithoutBudget] = useState(false);
    const [filterByLowerRange, setFilterByLowerRange] = useState(false);

    return (
        <div className="space-y-3">
            {/* Hourly Rate Section */}
            <div>
                <div className="flex items-center mb-1">
                    <input
                        type="checkbox"
                        id="hourly_rate"
                        checked={hourlyRateChecked}
                        onChange={(e) => setHourlyRateChecked(e.target.checked)}
                        className="shrink-0 border-gray-200 rounded-sm text-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <label htmlFor="hourly_rate" className="text-gray-900 ms-2 font-medium text-sm cursor-pointer">
                        Hourly Rate
                    </label>
                </div>
                <div className="text-xs text-gray-500 mb-1 ml-5">
                    Hourly rate range (optional):
                </div>
                <div className="flex items-center gap-2 ml-5">
                    <div className="relative w-20">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                        <input
                            type="text"
                            placeholder="from"
                            className="w-full pl-5 pr-2 py-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <div className="relative w-20">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                        <input
                            type="text"
                            placeholder="to"
                            className="w-full pl-5 pr-2 py-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <span className="text-gray-500 text-xs">/hr</span>
                </div>
            </div>

            {/* Fixed Price Section */}
            <div>
                <div className="flex items-center mb-1">
                    <input
                        type="checkbox"
                        id="fixed_price"
                        checked={fixedPriceChecked}
                        onChange={(e) => setFixedPriceChecked(e.target.checked)}
                        className="shrink-0 border-gray-200 rounded-sm text-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <label htmlFor="fixed_price" className="text-gray-900 ms-2 font-medium text-sm cursor-pointer">
                        Fixed Price
                    </label>
                </div>
                <div className="text-xs text-gray-500 mb-1 ml-5">
                    Budget range (optional):
                </div>
                <div className="flex items-center gap-2 ml-5">
                    <div className="relative w-20">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                        <input
                            type="text"
                            placeholder="from"
                            className="w-full pl-5 pr-2 py-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                    <div className="relative w-20">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                        <input
                            type="text"
                            placeholder="to"
                            className="w-full pl-5 pr-2 py-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-400"
                        />
                    </div>
                </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-1.5 pt-1">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="hide_without_budget"
                        checked={hideWithoutBudget}
                        onChange={(e) => setHideWithoutBudget(e.target.checked)}
                        className="shrink-0 border-gray-200 rounded-sm text-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <label htmlFor="hide_without_budget" className="text-gray-900 ms-2 text-xs cursor-pointer">
                        Hide projects without budget
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="filter_lower_range"
                        checked={filterByLowerRange}
                        onChange={(e) => setFilterByLowerRange(e.target.checked)}
                        className="shrink-0 border-gray-200 rounded-sm text-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <label htmlFor="filter_lower_range" className="text-gray-900 ms-2 text-xs cursor-pointer">
                        Filter by lower range value
                    </label>
                </div>
            </div>

            {/* Required Connects Section */}
            <div className="pt-1">
                <div className="text-xs font-medium text-gray-900 mb-1">
                    Required Connects:
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="min"
                        className="w-16 px-2 py-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="max"
                        className="w-16 px-2 py-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-400"
                    />
                </div>
            </div>
        </div>
    );
}

export default JobTermsContent;
