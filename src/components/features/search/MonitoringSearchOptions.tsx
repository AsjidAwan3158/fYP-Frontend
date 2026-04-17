import React, { useEffect } from 'react'

import MonitoringCheckbox from './MonitoringCheckbox.tsx'
import { useFilterState } from '@/hooks/useFilterState'


// Component
function MonitoringSearchOptions() {
    const {
        searchInTitle,
        searchInDescription,
        searchInSkills,
        setSearchInTitle,
        setSearchInDescription,
        setSearchInSkills,
    } = useFilterState()

    // Sync checkbox states to hidden inputs
    useEffect(() => {
        const titleInput = document.querySelector('input[type="hidden"][name="search_in_title"]') as HTMLInputElement | null
        const descInput = document.querySelector('input[type="hidden"][name="search_in_description"]') as HTMLInputElement | null
        const skillsInput = document.querySelector('input[type="hidden"][name="search_in_skills"]') as HTMLInputElement | null

        if (titleInput) titleInput.value = String(searchInTitle)
        if (descInput) descInput.value = String(searchInDescription)
        if (skillsInput) skillsInput.value = String(searchInSkills)

        // Dispatch event to notify JobTasksTable of changes
        window.dispatchEvent(new CustomEvent('searchOptionsChanged'))
    }, [searchInTitle, searchInDescription, searchInSkills])

    return (
        <div className={"mb-4 flex flex-wrap text-sm gap-x-3 gap-y-2"}>
            {/* Hidden inputs to store checkbox states - default all OFF */}
            <input type="hidden" name="search_in_title" defaultValue="false" />
            <input type="hidden" name="search_in_description" defaultValue="false" />
            <input type="hidden" name="search_in_skills" defaultValue="false" />

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
