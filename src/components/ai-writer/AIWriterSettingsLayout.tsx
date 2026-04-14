import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import SectionHeader from './SectionHeader.tsx'
import ProposalSettingsPanel from './ProposalSettingsPanel.tsx'


// Component

        function AIWriterSettingsLayout({
            title,
            description
        }: {
            title: string;
            description: string;
        }) {
            return (
                <div className={"flex-1 flex-grow overflow-auto"}>
                    <div className={"flex h-full"}>
                        <div className={"relative flex flex-1 w-full min-w-0 overflow-hidden"}>
                            <div className={"grid grid-cols-1 w-full gap-6"}>
                                <div className={"flex-1 min-w-0 space-y-4 overflow-y-auto py-4"}>
                                    <SectionHeader
                                        title={title}
                                        description={description}
                                    />
                                    <ProposalSettingsPanel />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    

export default AIWriterSettingsLayout
