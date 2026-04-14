import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import TagInput from '../tags/TagInput.tsx'
import TagifyToggle from '../tags/TagifyToggle.tsx'
import Tags from '../tags/Tags.tsx'


// Component
function ExcludeKeywordsSection() {
    return (
        <div id={"exclude-keywords-container"}>
            <label className={"block text-sm font-medium mb-1 dark:text-white"}>
                {`
     Exclude keywords:
     `}
            </label>
            <div className={"tagify-collapsible"} data-collapsed={"true"}>
                <div className={"tagify-collapsible__content"}>
                    <Tags
                        className={"tagify tagify--outside tagify-negative-keywords w-full"}
                        dataId="1"
                        hiddenInputName="negative_keywords"
                    />

                    <TagInput
                        name={"negative_keywords"}
                        className={"tagify--outside tagify-negative-keywords w-full"}
                        defaultValue={""}
                    />
                </div>
                <TagifyToggle />
            </div>
        </div>
    );
}


export default ExcludeKeywordsSection
