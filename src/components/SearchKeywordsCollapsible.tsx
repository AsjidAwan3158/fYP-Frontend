import React, { useEffect } from 'react'
import type { JSX } from 'react/jsx-runtime'

import TagInput from './features/tags/TagInput.tsx'
import TagifyToggle from './features/tags/TagifyToggle.tsx'
import Tags from './features/tags/Tags.tsx'


// Component
function SearchKeywordsCollapsible() {
    return (
        <div className={"tagify-collapsible"} data-collapsed={"true"}>
            <div className={"tagify-collapsible__content"}>
                <Tags
                    className={"tagify tagify--outside tagify-keywords w-full"}
                    dataId="0"
                    hiddenInputName="search_keywords"
                />

                <TagInput
                    name={"search_keywords"}
                    className={"tagify--outside tagify-keywords w-full"}
                    defaultValue={""}
                />
            </div>
            <TagifyToggle />
        </div>
    );
}


export default SearchKeywordsCollapsible
