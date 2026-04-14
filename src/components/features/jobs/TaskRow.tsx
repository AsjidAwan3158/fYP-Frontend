import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Check_mark from '@/components/icons/Check_mark.tsx'
import Arrow_down from '@/components/icons/Arrow_down.tsx'
import Checkmark_circle from '@/components/icons/Checkmark_circle.tsx'
import ExternalProjectLink from '@/components/common/links/ExternalProjectLink.tsx'
import ActionsDropdownInvoker from '@/components/common/dropdowns/ActionsDropdownInvoker.tsx'


        type TaskRowData = {
            rowVariant: "even" | "odd";
            title: React.ReactNode;
            budget: React.ReactNode;
            published: string;
            rankLevel: 1 | 3 | 4 | 5;
            rankValue: number;
            dropdownId: string;
            dropdownInvokerId: string;
        }
    
// Component

function TaskRow({ dataId }: { dataId: string }) {
    const {
        rowVariant,
        title,
        budget,
        published,
        rankLevel,
        rankValue,
        dropdownId,
        dropdownInvokerId
    }: TaskRowData = getTaskRowData(dataId);

    const rowClassName =
        rowVariant === "odd"
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
                        <i className={"icon-site-upwork-com mr-0"}>
                        </i>
                    </span>
                    <div className={"flex flex-col min-w-0 flex-1"}>
                        <div className={"flex items-center gap-1.5 flex-1"}>
                            <span className={"whitespace-nowrap text-ellipsis overflow-hidden text-sm opacity-fade"}>
                                {title}
                            </span>
                            <span className={"flex items-center gap-x-1.5 ml-auto pr-3"}>
                                <span className={"items-center gap-x-1 rounded-md border pl-1.5 pr-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 text-[11px] bg-blue-100 text-blue-700 border-blue-200 hidden sf-hidden"}>
                                    <Checkmark_circle />
                                    {`
     Applied
     `}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </td>
            <td className={"open-details cursor-pointer border-b group-[.opened]:border-b-transparent text-nowrap text-left py-1 pl-3 last:pr-3 text-sm table-column-budget"} style={{ width: "1px" }}>
                {budget}
            </td>
            <td className={"js-projects-table-time open-details cursor-pointer border-b group-[.opened]:border-b-transparent text-nowrap text-center py-1 pl-3 last:pr-3 table-column-published"} style={{ width: "1px" }}>
                <span className={"opacity-fade block align-middle text-sm"}>
                    {published}
                </span>
            </td>
            <td className={"border-b group-[.opened]:border-b-transparent align-middle py-1 pl-3 last:pr-3 min-w-7 table-column-client-rank"}>
                <div className={"client-rank-indicator block h-full items-center justify-center w-full"}>
                    <div className={"hidden sf-hidden"}>
                    </div>
                    <div className={`opacity-fade flex items-center justify-center w-full group level-${rankLevel}`}>
                        <div className={"flex items-center justify-center text-xs font-semibold h-5 w-5 px-1 border rounded cursor-pointer group-[.level-1]:border-red-500 group-[.level-1]:text-red-500 group-[.level-1]:bg-red-50 group-[.level-3]:border-yellow-500 group-[.level-3]:text-yellow-500 group-[.level-3]:bg-yellow-50 group-[.level-4]:border-lime-500 group-[.level-4]:text-lime-500 group-[.level-4]:bg-lime-50 group-[.level-5]:border-green-600 group-[.level-5]:text-green-600 group-[.level-5]:bg-green-50"}>
                            {` 
     ${rankValue}
     `}
                        </div>
                    </div>
                </div>
            </td>
            <td className={"border-b group-[.opened]:border-b-transparent align-middle text-end py-1 pl-3 last:pr-3 table-column-actions"} colSpan={"2"}>
                <div className={"inline-flex rounded-lg m-0 justify-end nowrap"}>
                    <ExternalProjectLink />
                    <ActionsDropdownInvoker id={dropdownInvokerId} />
                </div>
            </td>
        </tr>
    );
}
    

function getTaskRowData(id): TaskRowData  {
    switch (String(id)) {
    case "0":
        return {
            "rowVariant": "even",
            "title": (
                <>
                    <span className={"keyword-highlighted"}>WordPress</span>
                    {" Website Optimization"}
                </>
            ),
            "budget": (
                <div className={"opacity-fade flex items-center gap-1 justify-start"}>
                    <strong className={"align-middle text-red-500"}>$8 - $25</strong>
                    <span className={"text-xs text-gray-500"}>/ hr</span>
                </div>
            ),
            "published": "20 minutes ago",
            "rankLevel": 4,
            "rankValue": 4,
            "dropdownId": "actionsDropdown74035220",
            "dropdownInvokerId": "actionsDropdown74035220Invoker"
        };
    case "1":
        return {
            "rowVariant": "odd",
            "title": (
                <>
                    {"A "}
                    <span className="keyword-highlighted">framer</span>
                    {" "}
                    <span className="keyword-highlighted">landing page</span>
                    {" developer for my "}
                    <span className="keyword-highlighted">landing page</span>
                    {" agency"}
                </>
            ),
            "budget": (
                <div className="opacity-fade flex items-center gap-1 justify-start">
                    <strong className="align-middle text-red-500">$10 - $30</strong>
                    <span className="text-xs text-gray-500">/ hr</span>
                </div>
            ),
            "published": "26 minutes ago",
            "rankLevel": 3,
            "rankValue": 3,
            "dropdownId": "actionsDropdown74035193",
            "dropdownInvokerId": "actionsDropdown74035193Invoker"
        };
    case "2":
        return {
            "rowVariant": "even",
            "title": (
                <>
                    {"Website Transfer from Gemini to "}
                    <span className={"keyword-highlighted"}>Framer</span>
                    {" Page"}
                </>
            ),
            "budget": (
                <div className={"opacity-fade flex items-center gap-1 justify-start"}>
                    <strong className={"align-middle text-red-500"}>$70</strong>
                </div>
            ),
            "published": "29 minutes ago",
            "rankLevel": 4,
            "rankValue": 4,
            "dropdownId": "actionsDropdown74035180",
            "dropdownInvokerId": "actionsDropdown74035180Invoker"
        };
    case "3":
        return {
            "rowVariant": "odd",
            "title": (
                <>
                    <span className={"keyword-highlighted"}>Framer</span>
                    {" Website Design Specialist"}
                </>
            ),
            "budget": (
                <div className={"opacity-fade flex items-center gap-1 justify-start"}>
                    <strong className={"align-middle text-red-500"}>$18 - $40</strong>
                    <span className={"text-xs text-gray-500"}>/ hr</span>
                </div>
            ),
            "published": "31 minutes ago",
            "rankLevel": 4,
            "rankValue": 4,
            "dropdownId": "actionsDropdown74035170",
            "dropdownInvokerId": "actionsDropdown74035170Invoker"
        };
    case "4":
        return {
            "rowVariant": "even",
            "title": (
                <>
                    <span className={"keyword-highlighted"}>WordPress</span>
                    {" Content Uploader for LGBT Lifestyle Magazine"}
                </>
            ),
            "budget": (
                <span className={"opacity-fade text-xs text-gray-500"}>not specified</span>
            ),
            "published": "45 minutes ago",
            "rankLevel": 3,
            "rankValue": 3,
            "dropdownId": "actionsDropdown74035130",
            "dropdownInvokerId": "actionsDropdown74035130Invoker"
        };
    case "5":
        return {
            "rowVariant": "odd",
            "title": (
                <>
                    {"SEO and "}
                    <span className={"keyword-highlighted"}>WordPress</span>
                    {" Expert Needed for Website Optimization"}
                </>
            ),
            "budget": (
                <div className={"opacity-fade flex items-center gap-1 justify-start"}>
                    <strong className={"align-middle text-red-500"}>$400</strong>
                </div>
            ),
            "published": "1 hour ago",
            "rankLevel": 1,
            "rankValue": 1,
            "dropdownId": "actionsDropdown74035027",
            "dropdownInvokerId": "actionsDropdown74035027Invoker"
        };
    case "6":
        return {
            "rowVariant": "even",
            "title": (
                <>
                    {"Full-Stack Web Developer Needed for "}
                    <span className="keyword-highlighted">WordPress</span>
                    {" & Custom PHP Development"}
                </>
            ),
            "budget": (
                <div className="opacity-fade flex items-center gap-1 justify-start">
                    <strong className="align-middle text-red-500">$5</strong>
                </div>
            ),
            "published": "1 hour ago",
            "rankLevel": 5,
            "rankValue": 5,
            "dropdownId": "actionsDropdown74034993",
            "dropdownInvokerId": "actionsDropdown74034993Invoker"
        };
    case "7":
        return {
            "rowVariant": "odd",
            "title": (
                <>
                    {"Add a colour coded map page to an existing "}
                    <span className={"keyword-highlighted"}>wordpress</span>
                    {" website."}
                </>
            ),
            "budget": (
                <div className={"opacity-fade flex items-center gap-1 justify-start"}>
                    <strong className={"align-middle text-red-500"}>$20</strong>
                </div>
            ),
            "published": "1 hour ago",
            "rankLevel": 5,
            "rankValue": 5,
            "dropdownId": "actionsDropdown74034979",
            "dropdownInvokerId": "actionsDropdown74034979Invoker"
        };
    case "8":
        return {
            "rowVariant": "even",
            "title": (
                <>
                    {"Custom "}
                    <span className="keyword-highlighted">WordPress</span>
                    {" Website Development Specialist Needed"}
                </>
            ),
            "budget": (
                <div className="opacity-fade flex items-center gap-1 justify-start">
                    <strong className="align-middle text-red-500">$5</strong>
                </div>
            ),
            "published": "1 hour ago",
            "rankLevel": 5,
            "rankValue": 5,
            "dropdownId": "actionsDropdown74034938",
            "dropdownInvokerId": "actionsDropdown74034938Invoker"
        };
    case "9":
        return {
            "rowVariant": "odd",
            "title": (
                <>
                    {"Need an architect to "}
                    <span className="keyword-highlighted">redesign</span>
                    {" a 35x40m building (GF, 4 floors + annex). Available in PDF"}
                </>
            ),
            "budget": (
                <div className="opacity-fade flex items-center gap-1 justify-start">
                    <strong className="align-middle text-red-500">$50</strong>
                </div>
            ),
            "published": "1 hour ago",
            "rankLevel": 3,
            "rankValue": 3,
            "dropdownId": "actionsDropdown74034920",
            "dropdownInvokerId": "actionsDropdown74034920Invoker"
        };
    case "10":
        return {
            "rowVariant": "even",
            "title": (
                <>
                    {"Create Simple "}
                    <span className={"keyword-highlighted"}>Wordpress</span>
                    {" Website in VPS server"}
                </>
            ),
            "budget": (
                <div className={"opacity-fade flex items-center gap-1 justify-start"}>
                    <strong className={"align-middle text-red-500"}>$100</strong>
                </div>
            ),
            "published": "1 hour ago",
            "rankLevel": 5,
            "rankValue": 5,
            "dropdownId": "actionsDropdown74034858",
            "dropdownInvokerId": "actionsDropdown74034858Invoker"
        };
    case "11":
        return {
            "rowVariant": "odd",
            "title": (
                <>
                    <span className={"keyword-highlighted"}>WordPress</span>
                    {" Portfolio Deployment on EasyWP"}
                </>
            ),
            "budget": (
                <div className={"opacity-fade flex items-center gap-1 justify-start"}>
                    <strong className={"align-middle text-red-500"}>$20</strong>
                </div>
            ),
            "published": "2 hours ago",
            "rankLevel": 3,
            "rankValue": 3,
            "dropdownId": "actionsDropdown74034816",
            "dropdownInvokerId": "actionsDropdown74034816Invoker"
        };
    case "12":
        return {
            "rowVariant": "even",
            "title": "Webhook integration for stripe payment",
            "budget": (
                <span className={"opacity-fade text-xs text-gray-500"}>not specified</span>
            ),
            "published": "2 hours ago",
            "rankLevel": 1,
            "rankValue": 1,
            "dropdownId": "actionsDropdown74034788",
            "dropdownInvokerId": "actionsDropdown74034788Invoker"
        };
    case "13":
        return {
            "rowVariant": "odd",
            "title": "F&B Saas platform developer",
            "budget": (
                <div className="opacity-fade flex items-center gap-1 justify-start">
                    <strong className="align-middle text-red-500">$7,000</strong>
                </div>
            ),
            "published": "2 hours ago",
            "rankLevel": 3,
            "rankValue": 3,
            "dropdownId": "actionsDropdown74034762",
            "dropdownInvokerId": "actionsDropdown74034762Invoker"
        };
    case "14":
        return {
            "rowVariant": "even",
            "title": (
                <>
                    {"Multilingual High-Converting "}
                    <span className={"keyword-highlighted"}>Landing Page</span>
                    {" Development"}
                </>
            ),
            "budget": (
                <div className={"opacity-fade flex items-center gap-1 justify-start"}>
                    <strong className={"align-middle text-red-500"}>$60</strong>
                </div>
            ),
            "published": "2 hours ago",
            "rankLevel": 5,
            "rankValue": 5,
            "dropdownId": "actionsDropdown74034715",
            "dropdownInvokerId": "actionsDropdown74034715Invoker"
        };
    default:
        return {
            "rowVariant": "even",
            "title": (
                <>
                    <span className={"keyword-highlighted"}>WordPress</span>
                    {" Website Optimization"}
                </>
            ),
            "budget": (
                <div className={"opacity-fade flex items-center gap-1 justify-start"}>
                    <strong className={"align-middle text-red-500"}>$8 - $25</strong>
                    <span className={"text-xs text-gray-500"}>/ hr</span>
                </div>
            ),
            "published": "20 minutes ago",
            "rankLevel": 4,
            "rankValue": 4,
            "dropdownId": "actionsDropdown74035220",
            "dropdownInvokerId": "actionsDropdown74035220Invoker"
        };
    }
}


export default TaskRow
