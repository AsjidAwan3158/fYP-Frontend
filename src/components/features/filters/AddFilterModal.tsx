import React, { useState, KeyboardEvent } from 'react'
import Modal from '../../ui/Modal.tsx'

// Close icon
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
)

// Chevron down icon
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
)

// X icon for tags
const TagCloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
)

interface AddFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (filterData: FilterData) => void | Promise<void>;
}

interface FilterData {
    name: string;
    sortOrder: number;
    tags: string[];
    teamVisibility: string;
}

function AddFilterModal({ isOpen, onClose, onSave }: AddFilterModalProps) {
    const [filterName, setFilterName] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [teamVisibility, setTeamVisibility] = useState('Private');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const visibilityOptions = ['Private', 'Team', 'Public'];

    const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const resetForm = () => {
        setFilterName('');
        setSortOrder(0);
        setTags([]);
        setTagInput('');
        setTeamVisibility('Private');
        setIsDropdownOpen(false);
        setSaveError(null);
    }

    const handleSave = async () => {
        const name = filterName.trim();
        if (!name) {
            setSaveError('Filter name is required.');
            return;
        }

        setIsSaving(true);
        setSaveError(null);
        try {
            await onSave({
                name,
                sortOrder,
                tags,
                teamVisibility
            });
            resetForm();
            onClose();
        } catch (e: any) {
            setSaveError(e?.message ? String(e.message) : 'Failed to save filter.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal onClose={onClose}>
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <div className="flex justify-end pt-4 pr-4">
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100"
                        aria-label="Close modal"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="px-6 pb-6">
                    {saveError && (
                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {saveError}
                        </div>
                    )}
                    {/* Table Form */}
                    <table className="w-full">
                        <tbody>
                            {/* Filter Name Row */}
                            <tr>
                                <td className="py-3 pr-4 align-top">
                                    <label className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                        Filter name:
                                    </label>
                                </td>
                                <td className="py-3">
                                    <input
                                        type="text"
                                        value={filterName}
                                        onChange={(e) => setFilterName(e.target.value)}
                                        placeholder="Cost Estimators"
                                        disabled={isSaving}
                                        className="w-full px-3 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </td>
                            </tr>

                            {/* Sort Order Row */}
                            <tr>
                                <td className="py-3 pr-4 align-top">
                                    <label className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                        Sort order:
                                    </label>
                                </td>
                                <td className="py-3">
                                    <input
                                        type="number"
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                                        disabled={isSaving}
                                        className="w-full px-3 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </td>
                            </tr>

                            {/* Tags Row */}
                            <tr>
                                <td className="py-3 pr-4 align-top">
                                    <label className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                        Tags:
                                    </label>
                                </td>
                                <td className="py-3">
                                    <div className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                                        {tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md"
                                                    >
                                                        {tag}
                                                        <button
                                                            onClick={() => removeTag(tag)}
                                                            className="text-blue-500 hover:text-blue-700"
                                                        >
                                                            <TagCloseIcon />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <input
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleTagKeyDown}
                                            placeholder="Enter tag and press Enter"
                                            disabled={isSaving}
                                            className="w-full text-sm text-gray-900 bg-transparent border-none outline-none placeholder:text-amber-600"
                                        />
                                    </div>
                                </td>
                            </tr>

                            {/* Team Visibility Row */}
                            <tr>
                                <td className="py-3 pr-4 align-top">
                                    <label className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                        Team visibility:
                                    </label>
                                </td>
                                <td className="py-3">
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            disabled={isSaving}
                                            className="w-full px-3 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between"
                                        >
                                            <span>{teamVisibility}</span>
                                            <ChevronDownIcon />
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                                {visibilityOptions.map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => {
                                                            setTeamVisibility(option);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className={`w-full px-3 py-2.5 text-sm text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                                                            option === teamVisibility ? 'text-blue-600 font-medium' : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Save Button */}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {isSaving ? 'Saving…' : 'Save settings'}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AddFilterModal
