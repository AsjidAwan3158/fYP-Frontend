import React, { useState, useRef, useEffect } from 'react'
import {
  startScrape,
  getScrapeStatus,
  getScrapeResults,
  type ScrapeStatusResponse,
  type BackendJob,
} from '../lib/backendApi'

// ── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
)
const SpinnerIcon = () => (
  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
)
const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15,18 9,12 15,6"/>
  </svg>
)
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"/>
  </svg>
)

// ── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    started:    'bg-blue-100 text-blue-700 border-blue-200',
    in_progress:'bg-yellow-100 text-yellow-700 border-yellow-200',
    completed:  'bg-green-100 text-green-700 border-green-200',
    failed:     'bg-red-100 text-red-700 border-red-200',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${map[status] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {status.replace('_', ' ')}
    </span>
  )
}

// ── Job card ─────────────────────────────────────────────────────────────────

function JobCard({ job }: { job: BackendJob }) {
  const [expanded, setExpanded] = useState(false)
  const skills = job.skills ?? []
  return (
    <div className="border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-semibold text-gray-900 flex-1">{job.title}</h3>
          {job.budget && (
            <span className="text-sm font-bold text-green-600 shrink-0">
              {job.currency ?? '$'}{job.budget}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
          {job.country && <span>📍 {job.country}</span>}
          {job.proposals && <span>👥 {job.proposals} proposals</span>}
          <span>🕐 {formatDate(job.scraped_at)}</span>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {skills.slice(0, 6).map((s) => (
              <span key={s} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                {s}
              </span>
            ))}
            {skills.length > 6 && (
              <span className="px-2 py-0.5 text-xs bg-gray-50 text-gray-500 border border-gray-200 rounded-md">
                +{skills.length - 6} more
              </span>
            )}
          </div>
        )}

        {expanded && job.description && (
          <p className="mt-3 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {job.description.slice(0, 600)}{job.description.length > 600 ? '…' : ''}
          </p>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          {expanded ? 'Show less ▲' : 'Show description ▼'}
        </button>
      </div>
    </div>
  )
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso)
    const diff = Date.now() - d.getTime()
    const h = Math.floor(diff / 3_600_000)
    if (h < 1) return 'Just now'
    if (h < 24) return `${h}h ago`
    return `${Math.floor(diff / 86_400_000)}d ago`
  } catch { return iso }
}

// ── Main ScrapePage ───────────────────────────────────────────────────────────

export default function ScrapePage() {
  const [query, setQuery] = useState('')
  const [pages, setPages] = useState(1)
  const [jobsPerPage, setJobsPerPage] = useState(10)
  const [headless, setHeadless] = useState(true)
  const [workers, setWorkers] = useState(1)

  const [taskId, setTaskId] = useState<string | null>(null)
  const [status, setStatus] = useState<ScrapeStatusResponse | null>(null)
  const [jobs, setJobs] = useState<BackendJob[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalJobs, setTotalJobs] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)
  const [isLoadingResults, setIsLoadingResults] = useState(false)

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Polling ──────────────────────────────────────────────────────────────

  function stopPolling() {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
  }

  async function pollStatus(id: string) {
    try {
      const s = await getScrapeStatus(id)
      setStatus(s)
      if (s.status === 'completed') {
        stopPolling()
        await loadResults(id, 1)
      } else if (s.status === 'failed') {
        stopPolling()
        setError(s.error_message ?? 'Scraping failed.')
      }
    } catch (e: any) { setError(e.message) }
  }

  async function loadResults(id: string, page: number) {
    setIsLoadingResults(true)
    try {
      const res = await getScrapeResults(id, page, jobsPerPage)
      setJobs(res.jobs)
      setCurrentPage(res.page)
      setTotalPages(res.total_pages)
      setTotalJobs(res.total_jobs)
    } catch (e: any) { setError(e.message) }
    setIsLoadingResults(false)
  }

  // ── Start scrape ─────────────────────────────────────────────────────────

  async function handleStart() {
    if (!query.trim()) { setError('Please enter a search query.'); return }
    setError(null)
    setJobs([])
    setStatus(null)
    setTaskId(null)
    setIsStarting(true)
    stopPolling()
    try {
      const res = await startScrape({ query, page: pages, jobs_per_page: jobsPerPage, headless, workers })
      setTaskId(res.task_id)
      setStatus({ task_id: res.task_id, status: 'started' })
      pollRef.current = setInterval(() => pollStatus(res.task_id), 2500)
    } catch (e: any) { setError(e.message) }
    setIsStarting(false)
  }

  useEffect(() => () => stopPolling(), [])

  const isRunning = status?.status === 'started' || status?.status === 'in_progress'

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Job Scraper</h1>
          <p className="text-sm text-gray-500 mt-1">Search and scrape Upwork jobs directly from your backend</p>
        </div>

        {/* Config card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Scrape Configuration</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Query */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Search Query *</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-50 transition-all bg-white">
                <SearchIcon />
                <input
                  id="scrape-query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isRunning && handleStart()}
                  placeholder="e.g. Python developer, React, Machine Learning…"
                  className="flex-1 text-sm outline-none bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Pages */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Pages to scrape</label>
              <input type="number" min={1} max={20} value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
              />
            </div>

            {/* Jobs per page */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Jobs per page (10–50)</label>
              <input type="number" min={10} max={50} value={jobsPerPage}
                onChange={(e) => setJobsPerPage(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
              />
            </div>

            {/* Workers */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Workers (1–10)</label>
              <input type="number" min={1} max={10} value={workers}
                onChange={(e) => setWorkers(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
              />
            </div>

            {/* Headless toggle */}
            <div className="flex items-center gap-3 self-end pb-2">
              <label className="text-xs font-medium text-gray-600">Headless browser</label>
              <button
                id="headless-toggle"
                onClick={() => setHeadless(!headless)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${headless ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${headless ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-xs text-gray-400">{headless ? 'On' : 'Off'}</span>
            </div>
          </div>

          {/* Start button */}
          <div className="mt-5 flex items-center gap-3">
            <button
              id="start-scrape-btn"
              onClick={handleStart}
              disabled={isRunning || isStarting}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isRunning || isStarting ? <SpinnerIcon /> : <PlayIcon />}
              {isRunning ? 'Scraping…' : isStarting ? 'Starting…' : 'Start Scrape'}
            </button>

            {/* Live status */}
            {status && (
              <div className="flex items-center gap-3">
                <StatusBadge status={status.status} />
                {status.status === 'completed' && status.job_count !== undefined && (
                  <span className="text-xs text-gray-500">{status.job_count} jobs found</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
            <span className="font-semibold shrink-0">Error:</span>
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {jobs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-700">
                Results — {totalJobs} job{totalJobs !== 1 ? 's' : ''} scraped
              </h2>
              {isLoadingResults && <SpinnerIcon />}
            </div>

            <div className="space-y-3">
              {jobs.map((job, i) => <JobCard key={job.job_id ?? i} job={job} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => taskId && loadResults(taskId, currentPage - 1)}
                  disabled={currentPage <= 1 || isLoadingResults}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft /> Prev
                </button>
                <span className="text-xs text-gray-500">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => taskId && loadResults(taskId, currentPage + 1)}
                  disabled={currentPage >= totalPages || isLoadingResults}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty state while scraping */}
        {isRunning && jobs.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="flex justify-center mb-4"><SpinnerIcon /></div>
            <p className="text-sm">Scraping in progress… results will appear when complete.</p>
          </div>
        )}
      </div>
    </div>
  )
}
