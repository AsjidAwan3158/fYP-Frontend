/**
 * backendApi.ts
 * Central API client for FYP backend servers.
 * Scraping API  → proxied via /api/upwork  → http://localhost:8000
 * Monitoring API → proxied via /api/monitor → http://localhost:8002
 */

// ─── Generic fetch helper ────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  })
  const payload = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = payload?.detail ?? payload?.message ?? `Request failed (${res.status})`
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg))
  }
  return payload as T
}

// ─── Scraping API types ───────────────────────────────────────────────────────

export interface ScrapeRequest {
  query: string
  page?: number
  jobs_per_page?: number
  headless?: boolean
  workers?: number
  fast?: boolean
}

export interface ScrapeStartResponse {
  task_id: string
  status: string
  message: string
}

export interface ScrapeStatusResponse {
  task_id: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'started'
  job_count?: number
  remaining_jobs?: number
  error_message?: string
}

export interface BackendJob {
  job_id?: string
  title: string
  description: string
  budget?: string
  currency?: string
  skills: string[]
  country?: string
  proposals?: string
  posted_date?: number
  scraped_at: string
}

export interface ScrapeResultsResponse {
  task_id: string
  total_jobs: number
  page: number
  per_page: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
  jobs: BackendJob[]
}

export interface MostRecentJobsResponse {
  jobs: BackendJob[]
  count: number
  query?: string
  include_keywords?: string
  exclude_keywords?: string
  limit?: number
}

// ─── Monitoring API types ─────────────────────────────────────────────────────

export interface StartMonitoringRequest {
  query: string
  webhook_url: string
  refresh_interval?: number
  headless?: boolean
}

export interface MonitoringStartResponse {
  session_id: string
  status: string
  message: string
  config: Record<string, unknown>
}

export interface MonitoringStatusResponse {
  session_id: string
  status: string
  started_at?: string
  last_scan_at?: string
  jobs_found: number
  webhooks_sent: number
  uptime_minutes: number
  browser_pid?: number
  query?: string
}

export interface MonitoringStatsResponse {
  total_scans: number
  new_jobs_found: number
  webhooks_sent: number
  uptime_minutes: number
  errors_count: number
  jobs_per_hour: number
}

export interface MonitoringAlert {
  alert_id: number
  job_id: string
  webhook_url: string
  sent_at: string
  response_status?: number
}

export interface MonitoringAlertsResponse {
  alerts: MonitoringAlert[]
  count: number
}

export interface MonitoringSession {
  session_id: string
  query: string
  status: string
  uptime_hours: number
}

export interface MonitoringSessionsResponse {
  sessions: MonitoringSession[]
  count: number
}

export interface RecentJobDetail {
  job_id: string
  title: string
  description?: string
  job_url?: string
  budget?: string
  skills: string[]
  type?: string
  experience_level?: string
  client_location?: string
  proposals?: string
  scraped_at: string
  search_query?: string
  alert_sent_at: string
  webhook_status?: number
}

export interface RecentJobsDetailsResponse {
  jobs: RecentJobDetail[]
  count: number
  limit: number
}

export interface HealthResponse {
  status: string
  active_sessions: number
  timestamp: string
}

// ─── Scraping API functions ───────────────────────────────────────────────────

/** Start an async scrape job */
export async function startScrape(params: ScrapeRequest): Promise<ScrapeStartResponse> {
  return apiFetch<ScrapeStartResponse>('/api/upwork/start_scrape', {
    method: 'POST',
    body: JSON.stringify({
      query: params.query,
      page: params.page ?? 1,
      jobs_per_page: params.jobs_per_page ?? 10,
      headless: params.headless ?? true,
      workers: params.workers ?? 1,
      fast: params.fast ?? false,
    }),
  })
}

/** Poll scrape task status */
export async function getScrapeStatus(taskId: string): Promise<ScrapeStatusResponse> {
  return apiFetch<ScrapeStatusResponse>(`/api/upwork/scraping_status/${taskId}`)
}

/** Fetch paginated scrape results (only valid when status = completed) */
export async function getScrapeResults(
  taskId: string,
  page = 1,
  perPage = 10
): Promise<ScrapeResultsResponse> {
  return apiFetch<ScrapeResultsResponse>(
    `/api/upwork/get_scraping_results/${taskId}?page=${page}&per_page=${perPage}`
  )
}

/** Get recent jobs from DB (optionally filtered by keyword) */
export async function getMostRecentJobs(params?: {
  query?: string
  includeKeywords?: string
  excludeKeywords?: string
  limit?: number
}): Promise<MostRecentJobsResponse> {
  const searchParams = new URLSearchParams()
  if (params?.query) searchParams.set('query', params.query)
  if (params?.includeKeywords) searchParams.set('include_keywords', params.includeKeywords)
  if (params?.excludeKeywords) searchParams.set('exclude_keywords', params.excludeKeywords)
  if (params?.limit) searchParams.set('limit', String(params.limit))
  const qs = searchParams.toString() ? `?${searchParams.toString()}` : ''
  return apiFetch<MostRecentJobsResponse>(`/api/upwork/most_recent_jobs${qs}`)
}

// ─── Monitoring API functions ────────────────────────────────────────────────

/** Start a new continuous monitoring session */
export async function startMonitoring(
  params: StartMonitoringRequest
): Promise<MonitoringStartResponse> {
  return apiFetch<MonitoringStartResponse>('/api/monitor/start', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

/** Stop a monitoring session */
export async function stopMonitoring(sessionId: string): Promise<{ session_id: string; status: string }> {
  return apiFetch(`/api/monitor/stop/${sessionId}`, { method: 'POST' })
}

/** Get status of a monitoring session */
export async function getMonitorStatus(sessionId: string): Promise<MonitoringStatusResponse> {
  return apiFetch<MonitoringStatusResponse>(`/api/monitor/status/${sessionId}`)
}

/** Get detailed statistics for a session */
export async function getMonitorStats(sessionId: string): Promise<MonitoringStatsResponse> {
  return apiFetch<MonitoringStatsResponse>(`/api/monitor/stats/${sessionId}`)
}

/** List all active monitoring sessions */
export async function listMonitorSessions(): Promise<MonitoringSessionsResponse> {
  return apiFetch<MonitoringSessionsResponse>('/api/monitor/sessions')
}

/** Get recent webhook alerts */
export async function getRecentAlerts(limit = 50): Promise<MonitoringAlertsResponse> {
  return apiFetch<MonitoringAlertsResponse>(`/api/monitor/alerts?limit=${limit}`)
}

/** Get recent jobs with full details */
export async function getRecentJobsDetails(
  limit = 10,
  day?: string
): Promise<RecentJobsDetailsResponse> {
  const params = new URLSearchParams({ limit: String(limit) })
  if (day) params.set('day', day)
  return apiFetch<RecentJobsDetailsResponse>(`/api/monitor/recent-jobs-details?${params}`)
}

/** Health check */
export async function checkHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>('/api/monitor/health')
}
