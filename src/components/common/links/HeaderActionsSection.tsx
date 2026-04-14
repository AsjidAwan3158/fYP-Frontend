import React, { useState } from 'react'
import type { JSX } from 'react/jsx-runtime'

import Lightning_bolt_energy from '@/components/icons/Lightning_bolt_energy.tsx'
import Sparkle_shiny_effects from '@/components/icons/Sparkle_shiny_effects.tsx'
import Chip_nfc from '@/components/icons/Chip_nfc.tsx'
import IconTextButton from '../links/IconTextButton.tsx'
import ManageAlertsButton from '../alerts/ManageAlertsButton.tsx'
import AIProposalGeneratorModal from '../../features/proposals/AIProposalGeneratorModal.tsx'


    
// Component

        function HeaderActionsSection() {
            const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

            return (
                <>
                <div className={"ml-auto flex items-stretch gap-2"}>
                    <TooltipWrapper
                        outerWrapperClassName={"flex items-center"}
                        tooltipContainerClassName={"hs-tooltip [--placement:bottom] inline-block"}
                        tooltipText={`
     Generate personalized proposals in 1 click
     `}
                        tooltipStyle={{ position: "fixed", left: "852.382px", top: "97.6px" }}
                        tooltipSpanExtraClassName={"hidden"}
                    >
                        <IconTextButton
                            icon={<Lightning_bolt_energy />}
                            label={`
         Setup Proposal Generator
         `}
                            className={"hs-tooltip-toggle group py-1 pl-3 pr-3 text-sm flex items-center gap-1.5 shadow-xs rounded-lg border transition-all duration-200 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"}
                            onClick={() => setIsProposalModalOpen(true)}
                        />
                    </TooltipWrapper>

                    <TooltipWrapper
                        outerWrapperClassName={"flex items-center gap-2"}
                        tooltipContainerClassName={"hs-tooltip [--placement:bottom] inline-block"}
                        tooltipText={`
     Enable AI to auto-qualify jobs
     `}
                        tooltipStyle={{ position: "fixed", left: "1068.13px", top: "97.6px" }}
                        tooltipSpanExtraClassName={"hidden"}
                    >
                        <IconTextButton
                            icon={<Sparkle_shiny_effects />}
                            label={"AI Job Qualifier"}
                            className={"hs-tooltip-toggle group py-1 pl-3 pr-3 text-sm flex items-center gap-2 shadow-xs rounded-lg border transition-all duration-200 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"}
                        />
                    </TooltipWrapper>

                    <TooltipWrapper
                        outerWrapperClassName={"flex items-center"}
                        tooltipContainerClassName={"hs-tooltip [--placement:bottom] inline-block"}
                        tooltipText={`
     Manage notification settings
     `}
                        tooltipStyle={{ position: "fixed", left: "1220.44px", top: "97.6px" }}
                        tooltipSpanExtraClassName={"hidden"}
                    >
                        <ManageAlertsButton />
                    </TooltipWrapper>

                    <IconTextButton
                        icon={<Chip_nfc />}
                        label={`
         View settings
         `}
                        className={"py-1 pl-3 pr-4 text-sm flex items-center gap-1.5 bg-white shadow-xs hover:bg-gray-100/80 border border-gray-200 text-gray-700 hover:text-gray-900 rounded-lg"}
                    />
                </div>

                <AIProposalGeneratorModal
                    isOpen={isProposalModalOpen}
                    onClose={() => setIsProposalModalOpen(false)}
                />
                </>
            );
        }
    

// Subcomponents

        function TooltipWrapper({
            outerWrapperClassName,
            tooltipContainerClassName,
            tooltipText,
            tooltipStyle,
            tooltipSpanExtraClassName,
            children
        }: {
            outerWrapperClassName: string;
            tooltipContainerClassName: string;
            tooltipText: string;
            tooltipStyle: { position: string; left: string; top: string };
            tooltipSpanExtraClassName?: string;
            children: React.ReactNode;
        }) {
            return (
                <div className={outerWrapperClassName}>
                    <div className={tooltipContainerClassName}>
                        {children}
                        <span
                            className={`hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-gray-700 ${tooltipSpanExtraClassName ?? ""}`}
                            style={tooltipStyle}
                        >
                            {tooltipText}
                        </span>
                    </div>
                </div>
            );
        }
    

export default HeaderActionsSection
