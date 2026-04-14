import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import Sparkle_stars from './icons/Sparkle_stars.tsx'
import Shuffle_arrows from './icons/Shuffle_arrows.tsx'
import Smiling_face_circle from './icons/Smiling_face_circle.tsx'
import Uppercase_and_lowercase_a from './icons/Uppercase_and_lowercase_a.tsx'
import Italic_serif_uppercase_i_with_x from './icons/Italic_serif_uppercase_i_with_x.tsx'
import Code_brackets from './icons/Code_brackets.tsx'
import ToolbarButton1 from './ToolbarButton1.tsx'
import ToolbarButton from './ToolbarButton.tsx'
import EstimatorTemplateTextarea from './EstimatorTemplateTextarea.tsx'
import ToxAnchorbar from './ToxAnchorbar.tsx'
import TinyMCEFrame from './TinyMCEFrame.tsx'
import ToxSidebarSlider from './ToxSidebarSlider.tsx'
import ToolbarButtonGroup from './ToolbarButtonGroup.tsx'


// Component

        function TinyMCEEditor({
            visibility = "hidden",
            height = "300px"
        }: {
            visibility?: string;
            height?: string;
        }) {
            return (
                <div className={"mt-2"}>
                    <div className={"tinymce-editor-wrapper"}>
                        <div className={"bg-gray-50 rounded-t-md border border-gray-300 border-b-0 p-1 flex items-stretch justify-between"}>
                            <div className={"flex gap-1"}>
                                <ToolbarButton1
                                    icon={<Sparkle_stars />}
                                    label="Add AI prompt"
                                    className="flex items-center gap-2 rounded-sm px-3 py-1 text-sm hover:bg-gray-200"
                                />
                                <ToolbarButton1
                                    icon={<Shuffle_arrows />}
                                    label="Add Spintax"
                                    className="flex items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-gray-200"
                                />
                                <ToolbarButton1
                                    icon={<Smiling_face_circle />}
                                    className="flex items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-gray-200 disabled:opacity-50"
                                />
                                <ToolbarButton1
                                    icon={<Uppercase_and_lowercase_a />}
                                    className="flex items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-gray-200"
                                />
                                <div className={"relative"}>
                                    <ToolbarButtonGroup
                                        leftClassName={"flex items-center gap-2 rounded-l-sm px-2 py-1 text-sm group-hover:bg-gray-200/65 hover:bg-gray-200"}
                                        leftTitle={"Apply 𝐁𝐨𝐥𝐝 𝐒𝐞𝐫𝐢𝐟 style"}
                                        leftIcon="bold"
                                        rightClassName={"rounded-r-sm border border-transparent p-1 text-sm group-hover:bg-gray-200/65 hover:bg-gray-200"}
                                        rightTitle={"Choose bold style"}
                                    />
                                </div>
                                <div className={"relative"}>
                                    <ToolbarButtonGroup
                                        leftClassName={"flex items-center gap-2 rounded-l-sm border border-transparent px-2 py-1 text-sm group-hover:bg-gray-200/65 hover:bg-gray-200"}
                                        leftTitle={"Apply 𝓘𝓽𝓪𝓵𝓲𝓬 𝓢𝓬𝓻𝓲𝓹𝓽 style"}
                                        leftIcon="italic"
                                        rightClassName={"rounded-r-sm border border-l-0 border-transparent p-1 text-sm group-hover:bg-gray-200/65 hover:bg-gray-200"}
                                        rightTitle={"Choose italic style"}
                                    />
                                </div>
                                <ToolbarButton1
                                    icon={<Italic_serif_uppercase_i_with_x />}
                                    className="flex items-center rounded-sm px-2 py-1 text-sm hover:bg-gray-200"
                                />
                            </div>
                            <div>
                                <ToolbarButton1
                                    icon={<Code_brackets />}
                                    className="h-full flex items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-gray-200"
                                />
                            </div>
                        </div>
                        <EstimatorTemplateTextarea />
                        <div
                            role={"application"}
                            className={"tox tox-tinymce"}
                            style={{ visibility: visibility, height: height }}
                        >
                            <div className={"tox-editor-container"}>
                                <div className={"tox-editor-header tox-editor-header--empty"}>
                                    <ToxAnchorbar />
                                </div>
                                <div className={"tox-sidebar-wrap"}>
                                    <TinyMCEFrame />
                                    <div role={"presentation"} className={"tox-sidebar"}>
                                        <ToxSidebarSlider />
                                    </div>
                                </div>
                                <div className={"tox-bottom-anchorbar"}>
                                </div>
                            </div>
                            <div className={"tox-view-wrap"} style={{ display: "none" }}>
                            </div>
                            <div className={"tox-throbber"} style={{ display: "none" }}>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    

export default TinyMCEEditor
