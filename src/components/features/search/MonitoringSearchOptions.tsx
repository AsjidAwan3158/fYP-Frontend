import React, { useState } from 'react'
import type { JSX } from 'react/jsx-runtime'

import MonitoringCheckbox from './MonitoringCheckbox.tsx'


// Component
function MonitoringSearchOptions() {
    const [searchInTitle, setSearchInTitle] = useState(true);
    const [searchInDescription, setSearchInDescription] = useState(false);
    const [searchInSkills, setSearchInSkills] = useState(true);
    const [highlightKeywords, setHighlightKeywords] = useState(true);
    const [advancedSearchMode, setAdvancedSearchMode] = useState(true);

    return (
        <div className={"mb-4 flex flex-wrap text-sm gap-x-3 gap-y-2"}>
            <CheckboxOption
                id="monitoring_form_searchInTitle"
                name="search_in_title"
                checked={searchInTitle}
                onChange={setSearchInTitle}
                label={`     Search in title     `}
            />
            <CheckboxOption
                id="monitoring_form_searchInDescription"
                name="search_in_description"
                checked={searchInDescription}
                onChange={setSearchInDescription}
                label={`     Search in description     `}
            />
            <CheckboxOption
                id="monitoring_form_searchInSkills"
                name="search_in_skills"
                checked={searchInSkills}
                onChange={setSearchInSkills}
                label={`     Search in skills     `}
            />
            <CheckboxOption 
                id="monitoring_form_highlightKeywords"
                name="highlight_keywords"
                checked={highlightKeywords}
                onChange={setHighlightKeywords}
                label={`     Highlight keywords     `}
            />
            <CheckboxOption 
                id="monitoring_form_advancedSearchMode"
                name="advanced_search_mode"
                checked={advancedSearchMode}
                onChange={setAdvancedSearchMode}
                label={`Advanced Search Mode     `}
            />
        </div>
    );
}


// Subcomponents
function CheckboxOption({
    id,
    name,
    checked,
    onChange,
    label
}: {
    id: string;
    name: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
    label: string;
}) {
    return (
        <div className={"flex items-center"}>
            <MonitoringCheckbox
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <label
                className={"text-gray-900 ms-1.5 dark:text-gray-400 cursor-pointer"}
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
}
    

export default MonitoringSearchOptions
