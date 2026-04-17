import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import JobExpandedContent from './JobExpandedContent.tsx'
import Checkmark_circle from '@/components/icons/Checkmark_circle.tsx'
import ExternalProjectLink from '@/components/common/links/ExternalProjectLink.tsx'
import ActionsDropdownInvoker from '@/components/common/dropdowns/ActionsDropdownInvoker.tsx'
import ClientRankBadge, { ClientRankData } from './ClientRankBadge.tsx'

// Context for accordion behavior - only one row can be expanded at a time
interface AccordionContextType {
    expandedRowId: string | null;
    setExpandedRowId: (id: string | null) => void;
}

export const AccordionContext = createContext<AccordionContextType>({
    expandedRowId: null,
    setExpandedRowId: () => {}
});

export const AccordionProvider = ({ children }: { children: React.ReactNode }) => {
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    const contextValue = useMemo(() => ({
        expandedRowId,
        setExpandedRowId
    }), [expandedRowId]);

    return (
        <AccordionContext.Provider value={contextValue}>
            {children}
        </AccordionContext.Provider>
    );
};

export const useAccordion = () => useContext(AccordionContext);

// Caret icon that rotates when expanded
const CaretIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
    >
        <polyline points="6 9 12 15 18 9"/>
    </svg>
);

interface ExpandableJobRowProps {
    rowId: string;
    rowVariant: "even" | "odd";
    title: React.ReactNode;
    budget: React.ReactNode;
    published: string;
    dropdownInvokerId: string;
    clientRankData: ClientRankData;
    jobData: {
        requiredConnects: number;
        rating: number;
        reviewCount: number;
        totalSpent: string;
        avgHourlyRate: string;
        clientLocation: string;
        countryFlag: string;
        description: React.ReactNode[];
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

function ExpandableJobRow({
    rowId,
    rowVariant,
    title,
    budget,
    published,
    dropdownInvokerId,
    clientRankData,
    jobData
}: ExpandableJobRowProps) {
    const { expandedRowId, setExpandedRowId } = useAccordion();
    const isExpanded = expandedRowId === rowId;

    const handleToggle = useCallback(() => {
        setExpandedRowId(isExpanded ? null : rowId);
    }, [isExpanded, rowId, setExpandedRowId]);

    const handleRowClick = (e: React.MouseEvent) => {
        // Don't toggle if clicking on interactive elements
        const target = e.target as HTMLElement;
        if (
            target.closest('button') ||
            target.closest('a') ||
            target.closest('input') ||
            target.closest('[role="menu"]')
        ) {
            return;
        }
        handleToggle();
    };

    const rowClassName = `
        task-listing group transition-colors duration-150
        ${rowVariant === "odd" ? "bg-slate-50" : "bg-white"}
        ${isExpanded ? "bg-blue-50/50" : "hover:bg-gray-50"}
    `;

    return (
        <>
            {/* Collapsed Row (Header) */}
            <tr className={rowClassName} onClick={handleRowClick}>
                <td className="cursor-pointer border-b border-gray-100 align-middle text-gray-600 font-normal min-w-40 w-full py-2 pl-3 last:pr-3 relative max-w-0 table-column-title">
                    <div className="flex items-center gap-2 pl-0.5 min-h-[30px]">
                        <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? '' : ''}`}>
                            <CaretIcon isExpanded={isExpanded} />
                        </span>
                        <span className="flex items-center">
                            <i className="icon-site-upwork-com mr-0"></i>
                        </span>
                        <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-1">
                                <span className="whitespace-nowrap text-ellipsis overflow-hidden text-sm">
                                    {title}
                                </span>
                                <span className="flex items-center gap-x-1.5 ml-auto pr-3">
                                    <span className="items-center gap-x-1 rounded-md border pl-1.5 pr-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 text-[11px] bg-blue-100 text-blue-700 border-blue-200 hidden sf-hidden">
                                        <Checkmark_circle />
                                        Applied
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="cursor-pointer border-b border-gray-100 text-nowrap text-left py-2 pl-3 last:pr-3 text-sm table-column-budget" style={{ width: "1px" }}>
                    {budget}
                </td>
                <td className="cursor-pointer border-b border-gray-100 text-nowrap text-center py-2 pl-3 last:pr-3 table-column-published" style={{ width: "1px" }}>
                    <span className="block align-middle text-sm text-gray-600">
                        {published}
                    </span>
                </td>
                <td className="border-b border-gray-100 align-middle py-2 pl-3 last:pr-3 min-w-7 table-column-client-rank" onClick={(e) => e.stopPropagation()}>
                    <div className="client-rank-indicator flex h-full items-center justify-center w-full">
                        <ClientRankBadge data={clientRankData} />
                    </div>
                </td>
                <td className="border-b border-gray-100 align-middle text-end py-2 pl-3 last:pr-3 table-column-actions" colSpan={2}>
                    <div className="inline-flex rounded-lg m-0 justify-end nowrap" onClick={(e) => e.stopPropagation()}>
                        <ExternalProjectLink />
                        <ActionsDropdownInvoker id={dropdownInvokerId} />
                    </div>
                </td>
            </tr>

            {/* Expanded Content Row */}
            <tr className={`transition-all duration-300 ease-in-out ${isExpanded ? '' : 'hidden'}`}>
                <td colSpan={6} className="p-0 border-b border-gray-200 bg-white">
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <JobExpandedContent jobData={jobData} />
                    </div>
                </td>
            </tr>
        </>
    );
}

export default ExpandableJobRow
