import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Checkmark from '@/components/icons/Checkmark.tsx'
import Arrow_down from '@/components/icons/Arrow_down.tsx'
import Checkmark_circle from '@/components/icons/Checkmark_circle.tsx'
import ExternalProjectLink from '@/components/common/links/ExternalProjectLink.tsx'
import ActionsDropdownInvoker from '@/components/common/dropdowns/ActionsDropdownInvoker.tsx'
import TaskRow from './TaskRow.tsx'


        type TaskRowData = {
            rowParity: "odd" | "even";
            title: React.ReactNode;
            budget: 
                | { type: "hourly"; amount: string; suffix: string }
                | { type: "fixed"; amount: string }
                | { type: "none"; label: string };
            published: string;
            clientLevel: 1 | 3 | 4 | 5;
            dropdownId: string;
            dropdownInvokerId: string;
            appliedBadgeClass: string;
        }
    
// Component

        function TaskRow1({ dataId }: { dataId: string }) {
            const {
                rowParity,
                title,
                budget,
                published,
                clientLevel,
                dropdownId,
                dropdownInvokerId,
                appliedBadgeClass
            }: TaskRowData = getTaskRowData(dataId);

            const rowClassName =
                rowParity === "odd"
                    ? "task-listing group odd bg-slate-50 js-datatabale-details [&.opened]:bg-transparent"
                    : "task-listing group even js-datatabale-details [&.opened]:bg-transparent";

            return (
                <tr className={rowClassName}>
                    <td className={"open-details cursor-pointer border-b group-[.opened]:border-b-transparent align-middle text-gray-600 font-normal min-w-40 w-full py-1 pl-3 last:pr-3 relative max-w-0 table-column-title"}>
                        <div className={"flex items-center gap-1.5 pl-0.5 min-h-[30px]"}>
                            <span className={"pt-1 opacity-fade"}>
                                <Arrow_down />
                            </span>
                            <span className={"flex items-center pt-1 opacity-fade"}>
                                <i className={"icon-site-upwork-com mr-0"}></i>
                            </span>
                            <div className={"flex flex-col min-w-0 flex-1"}>
                                <div className={"flex items-center gap-1.5 flex-1"}>
                                    <span className={"whitespace-nowrap text-ellipsis overflow-hidden text-sm opacity-fade"}>
                                        <TitleContent content={title} />
                                    </span>
                                    <span className={"flex items-center gap-x-1.5 ml-auto pr-3"}>
                                        <span className={`${appliedBadgeClass} items-center gap-x-1 rounded-md border pl-1.5 pr-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 text-[11px] bg-blue-100 text-blue-700 border-blue-200 hidden sf-hidden`}>
                                            <Checkmark_circle />
                                            {` Applied `}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </td>

                    <BudgetCell budget={budget} />

                    <td className={"js-projects-table-time open-details cursor-pointer border-b group-[.opened]:border-b-transparent text-nowrap text-center py-1 pl-3 last:pr-3 table-column-published"} style={{ width: "1px" }}>
                        <span className={"opacity-fade block align-middle text-sm"}>
                            {published}
                        </span>
                    </td>

                    <ClientRank level={clientLevel} />

                    <ActionsCell dropdownId={dropdownId} dropdownInvokerId={dropdownInvokerId} />
                </tr>
            );
        }
    

// Subcomponents

        function TitleContent({ content }: { content: React.ReactNode }) {
            return <>{content}</>;
        }

        function BudgetCell({
            budget
        }: {
            budget:
                | { type: "hourly"; amount: string; suffix: string }
                | { type: "fixed"; amount: string }
                | { type: "none"; label: string };
        }) {
            if (budget.type === "none") {
                return (
                    <td className={"open-details cursor-pointer border-b group-[.opened]:border-b-transparent text-nowrap text-left py-1 pl-3 last:pr-3 text-sm table-column-budget"} style={{ width: "1px" }}>
                        <span className={"opacity-fade text-xs text-gray-500"}>
                            {budget.label}
                        </span>
                    </td>
                );
            }

            return (
                <td className={"open-details cursor-pointer border-b group-[.opened]:border-b-transparent text-nowrap text-left py-1 pl-3 last:pr-3 text-sm table-column-budget"} style={{ width: "1px" }}>
                    <div className={"opacity-fade flex items-center gap-1 justify-start"}>
                        <strong className={"align-middle text-red-500"}>
                            {budget.amount}
                        </strong>
                        {budget.type === "hourly" && (
                            <span className={"text-xs text-gray-500"}>
                                {budget.suffix}
                            </span>
                        )}
                    </div>
                </td>
            );
        }

        function ClientRank({ level }: { level: 1 | 3 | 4 | 5 }) {
            return (
                <td className={"border-b group-[.opened]:border-b-transparent align-middle py-1 pl-3 last:pr-3 min-w-7 table-column-client-rank"}>
                    <div className={"client-rank-indicator block h-full items-center justify-center w-full"}>
                        <div className={"hidden sf-hidden"}></div>
                        <div className={`opacity-fade flex items-center justify-center w-full group level-${level}`}>
                            <div className={"flex items-center justify-center text-xs font-semibold h-5 w-5 px-1 border rounded cursor-pointer group-[.level-1]:border-red-500 group-[.level-1]:text-red-500 group-[.level-1]:bg-red-50 group-[.level-3]:border-yellow-500 group-[.level-3]:text-yellow-500 group-[.level-3]:bg-yellow-50 group-[.level-4]:border-lime-500 group-[.level-4]:text-lime-500 group-[.level-4]:bg-lime-50 group-[.level-5]:border-green-600 group-[.level-5]:text-green-600 group-[.level-5]:bg-green-50"}>
                                {` ${level} `}
                            </div>
                        </div>
                    </div>
                </td>
            );
        }

        function ActionsCell({
            dropdownId,
            dropdownInvokerId
        }: {
            dropdownId: string;
            dropdownInvokerId: string;
        }) {
            return (
                <td className={"border-b group-[.opened]:border-b-transparent align-middle text-end py-1 pl-3 last:pr-3 table-column-actions"} colSpan={"2"}>
                    <div className={"inline-flex rounded-lg m-0 justify-end nowrap"}>
                        <ExternalProjectLink />
                        <ActionsDropdownInvoker id={dropdownInvokerId} />
                    </div>
                </td>
            );
        }
    

function getTaskRowData(id): TaskRowData  {
    switch (String(id)) {
    case "0":
        return {
            "rowParity": "odd",
            "title": <> Web Designer Needed for Recipe Blog using GeneratePress + GenerateBlocks </>,
            "budget": { "type": "hourly", "amount": " $15 - $30 ", "suffix": " / hr " },
            "published": "2 hours ago",
            "clientLevel": 3,
            "dropdownId": "actionsDropdown74034672",
            "dropdownInvokerId": "actionsDropdown74034672Invoker",
            "appliedBadgeClass": "js-applied-badge-74034672"
        };
    case "1":
        return {
            "rowParity": "even",
            "title": (
                <>
                    <span className="keyword-highlighted">WordPress</span>
                    {" 10Web "}
                    <span className="keyword-highlighted">Landing Page</span>
                    {" Build — Clear Instructions, Fast Execution "}
                </>
            ),
            "budget": { type: "fixed", amount: " $80 " },
            "published": "2 hours ago",
            "clientLevel": 3,
            "dropdownId": "actionsDropdown74034667",
            "dropdownInvokerId": "actionsDropdown74034667Invoker",
            "appliedBadgeClass": "js-applied-badge-74034667"
        };
    case "2":
        return {
            "rowParity": "odd",
            "title": <>Google Knowledge Panel Creation Specialist Needed</>,
            "budget": { "type": "fixed", "amount": " $150 " },
            "published": "2 hours ago",
            "clientLevel": 4,
            "dropdownId": "actionsDropdown74034660",
            "dropdownInvokerId": "actionsDropdown74034660Invoker",
            "appliedBadgeClass": "js-applied-badge-74034660"
        };
    case "3":
        return {
            "rowParity": "even",
            "title": "Dynamic Website Design Expert Needed",
            "budget": { "type": "none", "label": "not specified" },
            "published": "3 hours ago",
            "clientLevel": 5,
            "dropdownId": "actionsDropdown74034604",
            "dropdownInvokerId": "actionsDropdown74034604Invoker",
            "appliedBadgeClass": "js-applied-badge-74034604"
        };
    case "4":
        return {
            "rowParity": "odd",
            "title": (
                <>
                    <span className="keyword-highlighted">WordPress</span>
                    {" Developer Needed to Build a Software Directory Website (Custom Post Types + Filtering) "}
                </>
            ),
            "budget": { "type": "fixed", "amount": " $450 " },
            "published": "3 hours ago",
            "clientLevel": 3,
            "dropdownId": "actionsDropdown74034586",
            "dropdownInvokerId": "actionsDropdown74034586Invoker",
            "appliedBadgeClass": "js-applied-badge-74034586"
        };
    case "5":
        return {
            "rowParity": "even",
            "title": (
                <>
                    <span className="keyword-highlighted">WordPress</span>
                    {" Elementor Expert Needed to Design a High-Converting "}
                    <span className="keyword-highlighted">Landing Page</span>
                </>
            ),
            "budget": { "type": "fixed", "amount": " $30 " },
            "published": "3 hours ago",
            "clientLevel": 5,
            "dropdownId": "actionsDropdown74034501",
            "dropdownInvokerId": "actionsDropdown74034501Invoker",
            "appliedBadgeClass": "js-applied-badge-74034501"
        };
    case "6":
        return {
            "rowParity": "odd",
            "title": <>Claude AI Expert for Integration in Consulting Agency</>,
            "budget": { "type": "fixed", "amount": " $1,000 " },
            "published": "3 hours ago",
            "clientLevel": 4,
            "dropdownId": "actionsDropdown74035068",
            "dropdownInvokerId": "actionsDropdown74035068Invoker",
            "appliedBadgeClass": "js-applied-badge-74035068"
        };
    case "7":
        return {
            "rowParity": "even",
            "title": (
                <>
                    <span className="keyword-highlighted">WordPress</span>
                    {" Website Functionality and SEO Audit"}
                </>
            ),
            "budget": { "type": "hourly", "amount": " $3 - $5 ", "suffix": " / hr " },
            "published": "4 hours ago",
            "clientLevel": 1,
            "dropdownId": "actionsDropdown74034460",
            "dropdownInvokerId": "actionsDropdown74034460Invoker",
            "appliedBadgeClass": "js-applied-badge-74034460"
        };
    case "8":
        return {
            "rowParity": "odd",
            "title": <> Website Development and Optimization Specialist </>,
            "budget": { "type": "hourly", "amount": " $12 - $20 ", "suffix": " / hr " },
            "published": "4 hours ago",
            "clientLevel": 1,
            "dropdownId": "actionsDropdown74034450",
            "dropdownInvokerId": "actionsDropdown74034450Invoker",
            "appliedBadgeClass": "js-applied-badge-74034450"
        };
    case "9":
        return {
            "rowParity": "even",
            "title": <>Web Developer Needed for Recruiting Firm Website Enhancement</>,
            "budget": { "type": "hourly", "amount": " $10 - $20 ", "suffix": " / hr " },
            "published": "4 hours ago",
            "clientLevel": 3,
            "dropdownId": "actionsDropdown74034919",
            "dropdownInvokerId": "actionsDropdown74034919Invoker",
            "appliedBadgeClass": "js-applied-badge-74034919"
        };
    case "10":
        return {
            "rowParity": "odd",
            "title": (
                <>
                    <span className="keyword-highlighted">Redesign</span>{" Plus Size Men's T-Shirt"}
                </>
            ),
            "budget": { type: "none", label: "not specified" },
            "published": "4 hours ago",
            "clientLevel": 3,
            "dropdownId": "actionsDropdown74034403",
            "dropdownInvokerId": "actionsDropdown74034403Invoker",
            "appliedBadgeClass": "js-applied-badge-74034403"
        };
    case "11":
        return {
            "rowParity": "even",
            "title": (
                <>
                    <span className="keyword-highlighted">WordPress</span>{" Website Modifications Needed "}
                </>
            ),
            "budget": { "type": "hourly", "amount": " $15 - $30 ", "suffix": " / hr " },
            "published": "4 hours ago",
            "clientLevel": 3,
            "dropdownId": "actionsDropdown74034397",
            "dropdownInvokerId": "actionsDropdown74034397Invoker",
            "appliedBadgeClass": "js-applied-badge-74034397"
        };
    case "12":
        return {
            "rowParity": "odd",
            "title": (
                <>
                    {"Interactive Web Designer (UX + WebGL) currently hosted on "}
                    <span className="keyword-highlighted">WordPress</span>
                </>
            ),
            "budget": { "type": "none", "label": "not specified" },
            "published": "4 hours ago",
            "clientLevel": 1,
            "dropdownId": "actionsDropdown74034701",
            "dropdownInvokerId": "actionsDropdown74034701Invoker",
            "appliedBadgeClass": "js-applied-badge-74034701"
        };
    case "13":
        return {
            "rowParity": "even",
            "title": "Looking for a word press expert immediately",
            "budget": { "type": "fixed", "amount": " $400 " },
            "published": "4 hours ago",
            "clientLevel": 5,
            "dropdownId": "actionsDropdown74034336",
            "dropdownInvokerId": "actionsDropdown74034336Invoker",
            "appliedBadgeClass": "js-applied-badge-74034336"
        };
    case "14":
        return {
            "rowParity": "odd",
            "title": (
                <>
                    <span className="keyword-highlighted">Webflow</span>
                    {" or "}
                    <span className="keyword-highlighted">Framer</span>
                    {" + Stripe Checkout website basic"}
                </>
            ),
            "budget": { "type": "fixed", "amount": " $400 " },
            "published": "4 hours ago",
            "clientLevel": 4,
            "dropdownId": "actionsDropdown74034330",
            "dropdownInvokerId": "actionsDropdown74034330Invoker",
            "appliedBadgeClass": "js-applied-badge-74034330"
        };
    default:
        return {
            "rowParity": "odd",
            "title": <> Web Designer Needed for Recipe Blog using GeneratePress + GenerateBlocks </>,
            "budget": { "type": "hourly", "amount": " $15 - $30 ", "suffix": " / hr " },
            "published": "2 hours ago",
            "clientLevel": 3,
            "dropdownId": "actionsDropdown74034672",
            "dropdownInvokerId": "actionsDropdown74034672Invoker",
            "appliedBadgeClass": "js-applied-badge-74034672"
        };
    }
}


export default TaskRow1
