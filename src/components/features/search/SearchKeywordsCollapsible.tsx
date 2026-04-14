import React from 'react'

import TagInput from '../tags/TagInput.tsx'
import TagifyToggle from '../tags/TagifyToggle.tsx'
import Tags from '../tags/Tags.tsx'


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
