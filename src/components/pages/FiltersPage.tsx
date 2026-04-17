import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FilterActionsDropdown from '../features/filters/FilterActionsDropdown.tsx'

import AddFilterModal from '../features/filters/AddFilterModal.tsx'
import { createFilter, listFilters, type CreateFilterInput, type FilterDto } from '../../lib/filtersApi'
import { HttpError } from '../../lib/http'

// Icons
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
)

const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
)

// Discord-style robot/notification icon
const DiscordIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="4" ry="4"/>
        <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
        <path d="M9 15c1.5 1.5 4.5 1.5 6 0"/>
    </svg>
)

// 4-pointed star icon for AI Qualifier
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z"/>
    </svg>
)

interface Filter {
    id: string;
    name: string;
    hasNotifications: boolean;
    status: 'Active' | 'Paused' | 'Draft';
}

function FiltersPage() {
    const [filterList, setFilterList] = useState<Filter[]>([])
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loadError, setLoadError] = useState<string | null>(null)
    const navigate = useNavigate()

    const mapDtoToUi = (dto: FilterDto): Filter => ({
        id: dto.id,
        name: dto.name,
        hasNotifications: dto.hasNotifications ?? true,
        status: dto.status ?? 'Active',
    })

    useEffect(() => {
        const controller = new AbortController()

        ;(async () => {
            setIsLoading(true)
            setLoadError(null)
            try {
                const apiFilters = await listFilters(controller.signal)
                setFilterList(apiFilters.map(mapDtoToUi))
            } catch (e: any) {
                setFilterList([])
                if (e?.name === 'AbortError') return
                if (e instanceof HttpError && e.status === 404) {
                    setLoadError('Filters API not found.')
                } else {
                    setLoadError(e?.message ? String(e.message) : 'Failed to load filters.')
                }
            } finally {
                setIsLoading(false)
            }
        })()

        return () => controller.abort()
    }, [])

    const handleAddFilter = async (filterData: CreateFilterInput) => {
        const created = await createFilter(filterData)
        setFilterList((prev) => [mapDtoToUi(created), ...prev])
    };

    return (
        <main className="flex-1 bg-white">
            <div className="px-8 py-6">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Job Filters</h2>

                    <div className="flex items-center gap-2">
                        {/* Add Filter Button */}
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                        >
                            <PlusIcon />
                            Add filter
                        </button>

                        {/* Saved Projects Button */}
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                            <BookmarkIcon />
                            Saved projects
                        </button>

                        {/* Show Latest Results */}
                        <></>
                    </div>
                </div>

                {(isLoading || loadError) && (
                    <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
                        <div className="text-gray-700">
                            {isLoading ? 'Loading filters…' : loadError}
                        </div>
                        {!isLoading && (
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                                onClick={() => window.location.reload()}
                            >
                                Reload
                            </button>
                        )}
                    </div>
                )}

                {/* Table Container */}
                <div className="border border-gray-200 rounded-lg overflow-visible">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-white">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900" style={{ width: '50%' }}>Name</th>
                                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-900" style={{ width: '15%' }}>Notifications</th>
                                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-900" style={{ width: '10%' }}>Status</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900" style={{ width: '25%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterList.map((filter, index) => (
                                <tr
                                    key={filter.id}
                                    className={`bg-white hover:bg-gray-50/50 transition-colors ${
                                        index < filterList.length - 1 ? 'border-b border-gray-200' : ''
                                    }`}
                                >
                                    {/* Name */}
                                    <td className="px-6 py-5">
                                        <span
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                                            onClick={() => {
                                                if (filter.name === 'Cost Estimators') {
                                                    navigate(-1);
                                                }
                                            }}
                                        >
                                            {filter.name}
                                        </span>
                                    </td>

                                    {/* Notifications */}
                                    <td className="px-6 py-5 text-center">
                                        <div className="inline-flex text-gray-400">
                                            <DiscordIcon />
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            {filter.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* AI Qualifier Button */}
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                                                <StarIcon />
                                                AI Qualifier
                                            </button>

                                            {/* View Projects Button */}
                                            <button
                                                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                                onClick={() => {
                                                    if (filter.name === 'Cost Estimators') {
                                                        navigate(-1);
                                                    }
                                                }}
                                            >
                                                View projects
                                            </button>

                                            {/* More Options Dropdown */}
                                            <FilterActionsDropdown
                                                filterId={filter.id}
                                                onSettings={(id) => console.log('Settings for filter:', id)}
                                                onDuplicate={(id) => {
                                                    const filterToDuplicate = filterList.find(f => f.id === id);
                                                    if (filterToDuplicate) {
                                                        const newFilter = {
                                                            ...filterToDuplicate,
                                                            id: String(Date.now()),
                                                            name: `${filterToDuplicate.name} (copy)`
                                                        };
                                                        setFilterList([...filterList, newFilter]);
                                                    }
                                                }}
                                                onDelete={(id) => {
                                                    setFilterList(filterList.filter(f => f.id !== id));
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State (hidden by default, shown when no filters) */}
                {filterList.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center border border-gray-200 rounded-lg">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <BookmarkIcon />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No filters yet</h3>
                        <p className="text-sm text-gray-500 mb-6">Create your first filter to start tracking jobs</p>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <PlusIcon />
                            Add filter
                        </button>
                    </div>
                )}
            </div>

            {/* Add Filter Modal */}
            <AddFilterModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddFilter}
            />
        </main>
    );
}

export default FiltersPage
