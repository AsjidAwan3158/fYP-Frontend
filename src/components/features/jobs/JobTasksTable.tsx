import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'

import LoadMoreButton from '@/components/common/links/LoadMoreButton.tsx'
import JobTableHeader from './JobTableHeader.tsx'
import ExpandableJobRow, { AccordionProvider } from './ExpandableJobRow.tsx'
import { ClientRankData } from './ClientRankBadge.tsx'
import { getMostRecentJobs } from '@/lib/backendApi'
import { mapBackendJobsToRows } from '@/lib/jobMapper'

type JobRowData = {
    rowId: string;
    rowVariant: "even" | "odd";
    title: React.ReactNode;
    budget: React.ReactNode;
    published: string;
    dropdownInvokerId: string;
    clientRankData: ClientRankData;
    jobData: {
        requiredConnects: number;
        rating: number;
        reviewCount: number;
        totalSpent: string;
        avgHourlyRate: string;
        clientLocation: string;
        countryFlag: string;
        description: React.ReactNode[];
        clientQuestions: string[];
        skills: { name: string; highlighted: boolean }[];
        hoursPerWeek: string;
        duration: string;
        expertiseLevel: string;
        projectType: string;
        clientWorkHistory: number;
        category: string;
    };
}

// Extract keywords and field-specific search options from hidden form inputs
function getFilterKeywords(): {
    include: string;
    exclude: string;
    searchInTitle: boolean;
    searchInDescription: boolean;
    searchInSkills: boolean;
} {
    const includeInput = document.querySelector('input[name="search_keywords"]') as HTMLInputElement | null
    const excludeInput = document.querySelector('input[name="negative_keywords"]') as HTMLInputElement | null
    // Use type="hidden" selector to get the hidden inputs specifically (not the checkbox inputs)
    const searchInTitleInput = document.querySelector('input[type="hidden"][name="search_in_title"]') as HTMLInputElement | null
    const searchInDescriptionInput = document.querySelector('input[type="hidden"][name="search_in_description"]') as HTMLInputElement | null
    const searchInSkillsInput = document.querySelector('input[type="hidden"][name="search_in_skills"]') as HTMLInputElement | null

    let includeKeywords = ''
    let excludeKeywords = ''

    if (includeInput) {
        try {
            const val = includeInput.value
            if (val) {
                const parsed = JSON.parse(val)
                if (Array.isArray(parsed)) {
                    includeKeywords = parsed.map((v: { value?: string }) => v.value || v).join(',')
                } else if (typeof parsed === 'string') {
                    includeKeywords = parsed
                }
            }
        } catch {
            includeKeywords = includeInput.value
        }
    }

    if (excludeInput) {
        try {
            const val = excludeInput.value
            if (val) {
                const parsed = JSON.parse(val)
                if (Array.isArray(parsed)) {
                    excludeKeywords = parsed.map((v: { value?: string }) => v.value || v).join(',')
                } else if (typeof parsed === 'string') {
                    excludeKeywords = parsed
                }
            }
        } catch {
            excludeKeywords = excludeInput.value
        }
    }

    // Read field-specific search checkboxes (default to false if not found)
    const searchInTitle = searchInTitleInput ? searchInTitleInput.value === 'true' : false
    const searchInDescription = searchInDescriptionInput ? searchInDescriptionInput.value === 'true' : false
    const searchInSkills = searchInSkillsInput ? searchInSkillsInput.value === 'true' : false

    console.log('[getFilterKeywords] searchInTitle=', searchInTitle, 'searchInDescription=', searchInDescription, 'searchInSkills=', searchInSkills)

    return {
        include: includeKeywords,
        exclude: excludeKeywords,
        searchInTitle,
        searchInDescription,
        searchInSkills
    }
}

function JobTasksTable({
    dataId
}: {
    dataId: string;
}) {
    const [jobRows, setJobRows] = useState<JobRowData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)
    const [dataSource, setDataSource] = useState<'live' | 'fallback'>('fallback')
    const [currentKeywords, setCurrentKeywords] = useState<string>('')
    const [searchOptions, setSearchOptions] = useState<{searchInTitle: boolean; searchInDescription: boolean; searchInSkills: boolean}>({
        searchInTitle: false,
        searchInDescription: false,
        searchInSkills: false
    })
    const existingJobIds = useRef<Set<string>>(new Set())
    const isFirstLoad = useRef(true)
    const currentOffset = useRef(0)
    const totalCount = useRef(0)
    const keywordsRef = useRef<string>('')
    const searchOptionsRef = useRef<{searchInTitle: string; searchInDescription: string; searchInSkills: string}>({
        searchInTitle: 'false',
        searchInDescription: 'false',
        searchInSkills: 'false'
    })

    // Fetch jobs with pagination support
    const fetchJobs = useCallback(async (isBackground = false, offset: number = 0, append: boolean = false) => {
        if (!isBackground && !append) setIsLoading(true)
        setApiError(null)
        try {
            const { include, searchInTitle, searchInDescription, searchInSkills } = getFilterKeywords()
            const highlightTerms = include
                ? include.split(',').map(k => k.trim()).filter(k => k.length > 0)
                : []

            console.log('[JobTasksTable] Fetching from backend, isBackground=', isBackground, 'append=', append, 'offset=', offset, 'includeKeywords=', include || '(none)', 'parsed highlightTerms=', highlightTerms)
            console.log('[JobTasksTable] Field search: title=', searchInTitle, 'description=', searchInDescription, 'skills=', searchInSkills)

            const response = await getMostRecentJobs({
                includeKeywords: include || undefined,
                limit: 50,
                offset: offset,
                searchInTitle,
                searchInDescription,
                searchInSkills
            })

            console.log('[JobTasksTable] API response → jobs count:', response.jobs?.length, 'total:', response.total_count, 'has_more:', response.has_more)

            // Check for errors in response
            if (!response || !response.jobs) {
                console.error('[JobTasksTable] Invalid API response:', response)
                setApiError('Invalid response from server')
                return
            }

            // Update total count
            totalCount.current = response.total_count

            let mappedRows = mapBackendJobsToRows(response.jobs, highlightTerms)

            // Sort: jobs with keyword in title appear first
            if (highlightTerms.length > 0 && mappedRows.length > 0) {
                const rowsWithTitle = mappedRows.filter(row => {
                    // Check if title contains highlighted content (ReactNode array with spans)
                    if (Array.isArray(row.title)) {
                        return row.title.some(node =>
                            React.isValidElement(node) && (node.props as { className?: string }).className === 'keyword-highlighted'
                        )
                    }
                    return false
                })
                const rowsWithoutTitle = mappedRows.filter(row => {
                    if (Array.isArray(row.title)) {
                        return !row.title.some(node =>
                            React.isValidElement(node) && (node.props as { className?: string }).className === 'keyword-highlighted'
                        )
                    }
                    return true
                })
                mappedRows = [...rowsWithTitle, ...rowsWithoutTitle]
            }

            if (mappedRows.length > 0) {
                if (append) {
                    // Append new rows to existing list (load more)
                    const newRows = mappedRows.filter(r => !existingJobIds.current.has(r.rowId))
                    if (newRows.length > 0) {
                        setJobRows(prev => [...prev, ...newRows])
                        existingJobIds.current = new Set([...Array.from(existingJobIds.current), ...newRows.map(r => r.rowId)])
                        console.log('[JobTasksTable] Loaded', newRows.length, 'more jobs, total:', existingJobIds.current.size)
                    }
                } else if (isFirstLoad.current || existingJobIds.current.size === 0) {
                    setJobRows(mappedRows)
                    existingJobIds.current = new Set(mappedRows.map(r => r.rowId))
                    currentOffset.current = mappedRows.length
                    setDataSource('live')
                    isFirstLoad.current = false
                    console.log('[JobTasksTable] Set', mappedRows.length, 'jobs, dataSource=live')
                } else {
                    // Detect new jobs (not in existing set)
                    const newRows = mappedRows.filter(r => !existingJobIds.current.has(r.rowId))
                    if (newRows.length > 0) {
                        // Prepend new rows, keep existing sorted by scraped_at DESC
                        const existingFiltered = mappedRows.filter(r => existingJobIds.current.has(r.rowId))
                        setJobRows([...newRows, ...existingFiltered])
                        existingJobIds.current = new Set([...newRows.map(r => r.rowId), ...Array.from(existingJobIds.current)])
                        currentOffset.current = existingJobIds.current.size
                    }
                }
            } else if (!isBackground && !append) {
                setJobRows([])
                setDataSource('fallback')
                setApiError('Backend returned no jobs.')
            }
        } catch (error: any) {
            console.error('[JobTasksTable] Error fetching jobs:', error)
            if (!isBackground && !append) {
                setJobRows([])
                setDataSource('fallback')
                setApiError(error?.message ? String(error.message) : 'Backend not reachable.')
            }
        } finally {
            if (!isBackground && !append) setIsLoading(false)
            if (append) setIsLoadingMore(false)
        }
    }, [])

    // Load more jobs handler
    const loadMoreJobs = useCallback(() => {
        if (isLoadingMore) return // Prevent double-clicks
        setIsLoadingMore(true)
        currentOffset.current += 50
        fetchJobs(false, currentOffset.current, true)
    }, [fetchJobs, isLoadingMore])

    // Check if there are more jobs to load
    const hasMoreJobs = currentOffset.current < totalCount.current

    // Track keyword AND checkbox option changes
    useEffect(() => {
        const checkForChanges = () => {
            // Re-query elements each time since they might not exist on first render
            const keywordInput = document.querySelector('input[name="search_keywords"]') as HTMLInputElement | null
            const searchInTitleInput = document.querySelector('input[type="hidden"][name="search_in_title"]') as HTMLInputElement | null
            const searchInDescriptionInput = document.querySelector('input[type="hidden"][name="search_in_description"]') as HTMLInputElement | null
            const searchInSkillsInput = document.querySelector('input[type="hidden"][name="search_in_skills"]') as HTMLInputElement | null

            const newKeywords = keywordInput?.value || ''
            const newTitle = searchInTitleInput?.value || 'false'
            const newDesc = searchInDescriptionInput?.value || 'false'
            const newSkills = searchInSkillsInput?.value || 'false'

            const searchOptionsChanged =
                newTitle !== searchOptionsRef.current.searchInTitle ||
                newDesc !== searchOptionsRef.current.searchInDescription ||
                newSkills !== searchOptionsRef.current.searchInSkills

            console.log('[JobTasksTable] checkForChanges: keywords=', newKeywords, 'title=', newTitle, 'desc=', newDesc, 'skills=', newSkills)

            if (newKeywords !== keywordsRef.current || searchOptionsChanged) {
                keywordsRef.current = newKeywords
                searchOptionsRef.current = {
                    searchInTitle: newTitle,
                    searchInDescription: newDesc,
                    searchInSkills: newSkills
                }
                setCurrentKeywords(newKeywords)
                setSearchOptions({
                    searchInTitle: newTitle === 'true',
                    searchInDescription: newDesc === 'true',
                    searchInSkills: newSkills === 'true'
                })
                console.log('[JobTasksTable] Keywords or search options changed:', newKeywords, searchOptionsRef.current)
            }
        }

        // Listen for custom event dispatched when checkbox values change
        const handleSearchOptionsChange = () => {
            console.log('[JobTasksTable] Received searchOptionsChange event')
            checkForChanges()
        }

        // Initial read
        checkForChanges()

        // Also set up polling to catch any late-rendered inputs
        const pollInterval = setInterval(checkForChanges, 1000)

        // Listen for custom event from MonitoringSearchOptions
        window.addEventListener('searchOptionsChanged', handleSearchOptionsChange)

        // Cleanup
        return () => {
            clearInterval(pollInterval)
            window.removeEventListener('searchOptionsChanged', handleSearchOptionsChange)
        }
    }, [])

    // Refetch when keywords OR search options change
    useEffect(() => {
        console.log('[JobTasksTable] Keywords or search options changed effect:', currentKeywords, searchOptions)
        // Reset pagination and refetch when keywords or search options change
        console.log('[JobTasksTable] Triggering fetch for keywords:', currentKeywords, 'searchOptions:', searchOptions)
        isFirstLoad.current = true
        currentOffset.current = 0
        existingJobIds.current = new Set()
        fetchJobs(false, 0, false)
    }, [currentKeywords, searchOptions, fetchJobs])

    useEffect(() => {
        fetchJobs(false)

        // Poll every 10 seconds for new jobs (only if no keywords active)
        const interval = setInterval(() => {
            if (!currentKeywords) {
                fetchJobs(true)
            }
        }, 10000)
        return () => {
            clearInterval(interval)
            isFirstLoad.current = true
            existingJobIds.current = new Set()
        }
    }, [dataId, fetchJobs])

    return (
        <div>
            <div
                className={`mx-3 mt-2 mb-2 rounded-md border px-3 py-2 text-xs ${
                    dataSource === 'live'
                        ? 'border-green-200 bg-green-50 text-green-800'
                        : 'border-amber-200 bg-amber-50 text-amber-800'
                }`}
            >
                {isLoading
                    ? 'Loading jobs from backend…'
                    : dataSource === 'live'
                    ? `✓ Backend data loaded (${jobRows.length} of ${totalCount.current} jobs). ${hasMoreJobs ? `Click "Load more" to see more.` : 'All jobs loaded.'}`
                    : `⚠ Sample data in use.${apiError ? ` ${apiError}` : ''}`}
            </div>

            <AccordionProvider>
                <table className="js-datatable table u-datatable__content u-datatable__trigger mb-0 border-bottom font-size-1 table-sm w-full">
                    <thead>
                        <JobTableHeader dataId="0" />
                    </thead>
                    <tbody className="js-projects-list overflow-y-auto">
                        {jobRows.map((row) => (
                            <ExpandableJobRow
                                key={row.rowId}
                                rowId={row.rowId}
                                rowVariant={row.rowVariant}
                                title={row.title}
                                budget={row.budget}
                                published={row.published}
                                dropdownInvokerId={row.dropdownInvokerId}
                                clientRankData={row.clientRankData}
                                jobData={row.jobData}
                            />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={100} className="text-center py-2 px-3">
                                <div className="m-5 text-center">
                                    {hasMoreJobs || jobRows.length < totalCount.current ? (
                                        <button
                                            type="button"
                                            onClick={loadMoreJobs}
                                            disabled={isLoadingMore || isLoading}
                                            className="js-load-more-btn py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                        >
                                            {isLoadingMore ? (
                                                <>
                                                    <span className="animate-spin inline-block w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full mr-2"></span>
                                                    Loading more...
                                                </>
                                            ) : (
                                                <>Load more ({totalCount.current - jobRows.length} remaining)</>
                                            )}
                                        </button>
                                    ) : jobRows.length > 0 ? (
                                        <span className="text-sm text-gray-500">No more jobs to load ({jobRows.length} total)</span>
                                    ) : null}
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </AccordionProvider>
        </div>
    );
}

// Generate sample job data for each row
function getJobRowsData(): JobRowData[] {
    const sampleJobData = {
        requiredConnects: 20,
        rating: 4.83,
        reviewCount: 4,
        totalSpent: "$3.2K",
        avgHourlyRate: "$20.00",
        clientLocation: "Singapore",
        countryFlag: "🇸🇬",
        description: [
            "TalentFB is looking for a WordPress expert to audit the current web pages and provide recommendations, optimisations and best practices.",
            "We need someone creative, with great communication skills, a great sense of design.",
            "If that sounds like you, happy to connect and discuss."
        ],
        clientQuestions: [
            "Describe your recent experience with similar projects"
        ],
        skills: [
            { name: "Landing Page", highlighted: true },
            { name: "Website", highlighted: false },
            { name: "User Flow", highlighted: false },
            { name: "WordPress", highlighted: true },
            { name: "Web Development", highlighted: false },
            { name: "Web Design", highlighted: false },
            { name: "CSS", highlighted: false },
            { name: "Website Customization", highlighted: false }
        ],
        hoursPerWeek: "Less than 30 hrs/week",
        duration: "1 to 3 months",
        expertiseLevel: "Expert",
        projectType: "Ongoing project",
        clientWorkHistory: 5,
        category: "Web, Mobile & Software Dev, Web & Mobile Design"
    };

    const createClientRankData = (
        rankLevel: 1 | 2 | 3 | 4 | 5,
        totalSpent: string,
        hires: number,
        jobsPosted: number,
        hireRate: number,
        openJobs: number,
        starRating: number,
        reviewCount: number,
        registeredDate: string,
        country: string,
        countryFlag: string,
        localTime: string,
        city?: string
    ): ClientRankData => ({
        rankLevel,
        paymentVerified: true,
        totalSpent,
        hires,
        jobsPosted,
        hireRate,
        openJobs,
        starRating,
        reviewCount,
        registeredDate,
        country,
        countryFlag,
        localTime,
        city
    });

    const rows: JobRowData[] = [
        {
            rowId: "row-0",
            rowVariant: "even",
            title: (
                <>
                    <span className="keyword-highlighted">WordPress</span>
                    {" Website Optimization"}
                </>
            ),
            budget: (
                <div className="opacity-fade flex items-center gap-1 justify-start">
                    <strong className="align-middle text-red-500">$8 - $25</strong>
                    <span className="text-xs text-gray-500">/ hr</span>
                </div>
            ),
            published: "20 minutes ago",
            dropdownInvokerId: "actionsDropdown74035220Invoker",
            clientRankData: createClientRankData(4, "$5", 2, 2, 100, 1, 5.00, 1, "Jul 7, 2023", "Canada", "🇨🇦", "1:25 AM", "VAUGHAN"),
            jobData: { ...sampleJobData }
        },
        {
            rowId: "row-1",
            rowVariant: "odd",
            title: (
                <>
                    {"A "}
                    <span className="keyword-highlighted">framer</span>
                    {" "}
                    <span className="keyword-highlighted">landing page</span>
                    {" developer for my "}
                    <span className="keyword-highlighted">landing page</span>
                    {" agency"}
                </>
            ),
            budget: (
                <div className="opacity-fade flex items-center gap-1 justify-start">
                    <strong className="align-middle text-red-500">$10 - $30</strong>
                    <span className="text-xs text-gray-500">/ hr</span>
                </div>
            ),
            published: "26 minutes ago",
            dropdownInvokerId: "actionsDropdown74035193Invoker",
            clientRankData: createClientRankData(3, "$5.1K", 8, 15, 53, 2, 4.50, 8, "Mar 15, 2022", "United States", "🇺🇸", "10:30 PM", "NEW YORK"),
            jobData: {
                ...sampleJobData,
                requiredConnects: 15,
                rating: 4.5,
                reviewCount: 8,
                totalSpent: "$5.1K",
                clientLocation: "United States",
                countryFlag: "🇺🇸",
                description: [
                    "We are looking for a skilled Framer developer to join our landing page agency.",
                    "You will be responsible for creating high-converting landing pages using Framer.",
                    "Experience with motion design and animations is a plus."
                ],
                skills: [
                    { name: "Framer", highlighted: true },
                    { name: "Landing Page", highlighted: true },
                    { name: "Web Design", highlighted: false },
                    { name: "UI/UX", highlighted: false },
                    { name: "Motion Design", highlighted: false }
                ]
            }
        },
        {
            rowId: "row-2",
            rowVariant: "even",
            title: (
                <>
                    {"Website Transfer from Gemini to "}
                    <span className="keyword-highlighted">Framer</span>
                    {" Page"}
                </>
            ),
            budget: (
                <div className="opacity-fade flex items-center gap-1 justify-start">
                    <strong className="align-middle text-red-500">$70</strong>
                </div>
            ),
            published: "29 minutes ago",
            dropdownInvokerId: "actionsDropdown74035180Invoker",
            clientRankData: createClientRankData(4, "$8.5K", 12, 20, 60, 1, 4.90, 12, "Jan 20, 2021", "Germany", "🇩🇪", "6:30 AM", "BERLIN"),
            jobData: {
                ...sampleJobData,
                requiredConnects: 10,
                rating: 4.9,
                reviewCount: 12,
                totalSpent: "$8.5K",
                clientLocation: "Germany",
                countryFlag: "🇩🇪"
            }
        },
    ];

    return rows;
}

export default JobTasksTable