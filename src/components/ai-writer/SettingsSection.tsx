import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import User_profile from './icons/User_profile.tsx'
import Sparkles_shiny from './icons/Sparkles_shiny.tsx'
import Slider_controls_vertical from './icons/Slider_controls_vertical.tsx'


        type SettingsSectionItem = {
            label: string;
            icon: JSX.Element;
            isActive?: boolean;
        };

        type SettingsSectionData = {
            items: SettingsSectionItem[];
        };

// Component

        function SettingsSection({
            title,
            dataId,
            activeTab,
            onTabChange
        }: {
            title: string;
            dataId: string;
            activeTab?: string;
            onTabChange?: (tab: string) => void;
        }) {
            const { items }: SettingsSectionData = getSettingsSectionData(dataId, activeTab);
            return (
                <div>
                    <h2 className={"py-1.5 text-sm font-medium text-gray-950/60 dark:text-white/40"}>
                        {title}
                    </h2>
                    <div className={"relative flex flex-col gap-1.5"}>
                        {items.map((item, index) => (
                            <SettingsItem
                                key={index}
                                label={item.label}
                                icon={item.icon}
                                isActive={item.isActive}
                                onClick={() => onTabChange?.(item.label)}
                            />
                        ))}
                    </div>
                </div>
            );
        }


// Subcomponents

        function SettingsItem({
            label,
            icon,
            isActive,
            onClick
        }: {
            label: string;
            icon: JSX.Element;
            isActive?: boolean;
            onClick?: () => void;
        }) {
            return (
                <div
                    onClick={onClick}
                    className={
                        isActive
                            ? "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-3 border-blue-300 bg-blue-50 text-blue-600"
                            : "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-3 border-gray-200 bg-white hover:border-gray-300"
                    }
                >
                    <div className={"flex size-4 flex-shrink-0 items-center justify-center"}>
                        {icon}
                    </div>
                    <span className={"text-sm font-medium"}>
                        {label}
                    </span>
                </div>
            );
        }



        function getSettingsSectionData(id: string, activeTab?: string): SettingsSectionData {
            const key = id.toString();
            if (key === "0") {
                return {
                    items: [
                        {
                            label: "Proposal Sender",
                            icon: <User_profile />
                        },
                        {
                            label: "AI Writer",
                            icon: <Sparkles_shiny />,
                            isActive: activeTab === "AI Writer"
                        }
                    ]
                };
            }
            if (key === "1") {
                return {
                    items: [
                        {
                            label: "AI Settings",
                            icon: <Slider_controls_vertical />,
                            isActive: activeTab === "AI Settings"
                        }
                    ]
                };
            }
            return {
                items: []
            };
        }


export default SettingsSection
