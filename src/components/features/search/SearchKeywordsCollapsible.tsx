import React from 'react'

import TagInput from '../tags/TagInput.tsx'
import TagifyToggle from '../tags/TagifyToggle.tsx'
import Tags from '../tags/Tags.tsx'

const INCLUDE_KEYWORDS_STORAGE_KEY = 'upwork_filter_include_keywords'

// Component
function SearchKeywordsCollapsible() {
    return (
        <div className={"tagify-collapsible"} data-collapsed={"true"}>
            <div className={"tagify-collapsible__content"}>
                <Tags
                    className={"tagify tagify--outside tagify-keywords w-full"}
                    dataId="0"
                    hiddenInputName="search_keywords"
                    storageKey={INCLUDE_KEYWORDS_STORAGE_KEY}
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
