import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import TableHeaderCell from '@/components/common/links/TableHeaderCell.tsx';


// Component

        function JobTableHeader({
            dataId
        }: {
            dataId: string;
        }) {
            const { headers } = getJobTableHeaderData(dataId);

            return (
                <tr className={"[&>th]:sticky [&>th]:top-0 [&>th]:bg-white [&>th]:z-10"}>
                    {headers.map((header, index) => (
                        <TableHeaderCell
                            key={index}
                            alignClass={header.alignClass}
                            label={header.label}
                        />
                    ))}
                </tr>
            );
        }
    


        type JobTableHeaderData = {
            headers: {
                alignClass: string;
                label: string;
            }[];
        };

        function getJobTableHeaderData(id: string): JobTableHeaderData {
            const dataMap: Record<string, JobTableHeaderData> = {
                "0": {
                    headers: [
                        {
                            alignClass: "text-start",
                            label: `
         Job Title
         `
                        },
                        {
                            alignClass: "text-left",
                            label: `
         Budget
         `
                        },
                        {
                            alignClass: "text-center",
                            label: `
         Published
         `
                        },
                        {
                            alignClass: "text-center",
                            label: `
        
         `
                        },
                        {
                            alignClass: "text-center",
                            label: `
        
         `
                        }
                    ]
                }
            };

            const key = String(id);
            return dataMap[key] ?? { headers: [] };
        }
    

export default JobTableHeader
