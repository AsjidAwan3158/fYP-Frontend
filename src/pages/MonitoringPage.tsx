import React, { useState, useEffect, useRef } from 'react'
import {
  listMonitorSessions,
  startMonitoring,
  stopMonitoring,
  getMonitorStats,
  getRecentJobsDetails,
  getRecentAlerts,
  checkHealth,
  type MonitoringSession,
  type MonitoringStatsResponse,
  type RecentJobDetail,
  type MonitoringAlert,
} from '../lib/backendApi'

// ── Icons ────────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const StopIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
  </svg>
)
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
)
const SpinnerIcon = () => (
  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
)
const WebhookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
  </svg>
)

// ── New Session form ─────────────────────────────────────────────────────────

interface NewSessionFormProps {
  onStarted: () => void
}

function NewSessionForm({ onStarted }: NewSessionFormProps) {
  const [query, setQuery] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [interval, setInterval_] = useState(60)
  const [headless, setHeadless] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim() || !webhookUrl.trim()) { setError('Query and Webhook URL are required.'); return }
    setError(null); setLoading(true)
    try {
      await startMonitoring({ query, webhook_url: webhookUrl, refresh_interval: interval, headless })
      setQuery(''); setWebhookUrl(''); setInterval_(60)
      onStarted()
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Start New Monitoring Session</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Search Query *</label>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. Python developer"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"/>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Webhook URL *</label>
          <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="https://hooks.slack.com/…"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"/>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Refresh interval (seconds)</label>
          <input type="number" min={10} max={3600} value={interval} onChange={(e) => setInterval_(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50"/>
        </div>
        <div className="flex items-center gap-3 self-end pb-2">
          <label className="text-xs font-medium text-gray-600">Headless</label>
          <button type="button" onClick={() => setHeadless(!headless)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${headless ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${headless ? 'translate-x-4' : 'translate-x-0.5'}`}/>
          </button>
          <span className="text-xs text-gray-400">{headless ? 'On' : 'Off'}</span>
        </div>
      </div>

      {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

      <button type="submit" disabled={loading}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors shadow-sm">
        {loading ? <SpinnerIcon /> : <PlusIcon />}
        {loading ? 'Starting…' : 'Start Monitoring'}
      </button>
    </form>
  )
}

// ── Session card ─────────────────────────────────────────────────────────────

function SessionCard({ session, onStopped }: { session: MonitoringSession; onStopped: () => void }) {
  const [stats, setStats] = useState<MonitoringStatsResponse | null>(null)
  const [stopping, setStopping] = useState(false)

  useEffect(() => {
    getMonitorStats(session.session_id).then(setStats).catch(() => {})
  }, [session.session_id])

  async function handleStop() {
    setStopping(true)
    try { await stopMonitoring(session.session_id); onStopped() }
    catch (e: any) { alert(e.message) }
    setStopping(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">{session.query}</p>
          <p className="text-xs text-gray-400 mt-0.5 font-mono">{session.session_id.slice(0, 16)}…</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 border border-green-200 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
            {session.status}
          </span>
          <button onClick={handleStop} disabled={stopping}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors">
            {stopping ? <SpinnerIcon /> : <StopIcon />}
            Stop
          </button>
        </div>
      </div>

      {stats && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Scans', value: stats.total_scans },
            { label: 'Jobs Found', value: stats.new_jobs_found },
            { label: 'Webhooks Sent', value: stats.webhooks_sent },
            { label: 'Uptime', value: `${stats.uptime_minutes}m` },
            { label: 'Errors', value: stats.errors_count },
            { label: 'Jobs/hr', value: stats.jobs_per_hour.toFixed(1) },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Recent jobs table ─────────────────────────────────────────────────────────

function RecentJobsTable({ jobs }: { jobs: RecentJobDetail[] }) {
  if (!jobs.length) return (
    <div className="text-center py-10 text-gray-400 text-sm">No recent monitored jobs yet.</div>
  )
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {['Title', 'Budget', 'Skills', 'Location', 'Alert Sent', 'Webhook'].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, i) => (
            <tr key={job.job_id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${i === jobs.length - 1 ? 'border-0' : ''}`}>
              <td className="px-4 py-3">
                <p className="font-medium text-gray-900 truncate max-w-xs">{job.title}</p>
                {job.search_query && <p className="text-xs text-gray-400">Query: {job.search_query}</p>}
              </td>
              <td className="px-4 py-3 text-gray-700">{job.budget ?? '—'}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {(job.skills ?? []).slice(0, 3).map((s) => (
                    <span key={s} className="px-1.5 py-0.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded">{s}</span>
                  ))}
                  {job.skills.length > 3 && <span className="text-xs text-gray-400">+{job.skills.length - 3}</span>}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">{job.client_location ?? '—'}</td>
              <td className="px-4 py-3 text-xs text-gray-500">{fmtDate(job.alert_sent_at)}</td>
              <td className="px-4 py-3">
                {job.webhook_status ? (
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${job.webhook_status < 300 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {job.webhook_status}
                  </span>
                ) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function fmtDate(iso: string) {
  try { return new Date(iso).toLocaleString() } catch { return iso }
}

// ── Alert row ────────────────────────────────────────────────────────────────

function AlertsTable({ alerts }: { alerts: MonitoringAlert[] }) {
  if (!alerts.length) return <div className="text-center py-6 text-gray-400 text-sm">No alerts yet.</div>
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {['Alert ID','Job ID','Webhook URL','Sent At','Status'].map((h) => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {alerts.map((a, i) => (
            <tr key={a.alert_id} className={`border-b border-gray-100 hover:bg-gray-50/50 ${i === alerts.length - 1 ? 'border-0' : ''}`}>
              <td className="px-4 py-2 text-gray-500">#{a.alert_id}</td>
              <td className="px-4 py-2 font-mono text-gray-700">{a.job_id.slice(0, 12)}…</td>
              <td className="px-4 py-2 text-gray-600 max-w-xs truncate">{a.webhook_url}</td>
              <td className="px-4 py-2 text-gray-500">{fmtDate(a.sent_at)}</td>
              <td className="px-4 py-2">
                {a.response_status ? (
                  <span className={`px-2 py-0.5 rounded-full font-medium ${a.response_status < 300 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {a.response_status}
                  </span>
                ) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Main MonitoringPage ───────────────────────────────────────────────────────

type Tab = 'sessions' | 'jobs' | 'alerts'

export default function MonitoringPage() {
  const [sessions, setSessions] = useState<MonitoringSession[]>([])
  const [recentJobs, setRecentJobs] = useState<RecentJobDetail[]>([])
  const [alerts, setAlerts] = useState<MonitoringAlert[]>([])
  const [health, setHealth] = useState<{ status: string; active_sessions: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('sessions')
  const [showNewForm, setShowNewForm] = useState(false)

  async function fetchAll() {
    setLoading(true)
    const [sessRes, jobsRes, alertsRes, healthRes] = await Promise.allSettled([
      listMonitorSessions(),
      getRecentJobsDetails(20),
      getRecentAlerts(50),
      checkHealth(),
    ])
    if (sessRes.status === 'fulfilled') setSessions(sessRes.value.sessions)
    if (jobsRes.status === 'fulfilled') setRecentJobs(jobsRes.value.jobs)
    if (alertsRes.status === 'fulfilled') setAlerts(alertsRes.value.alerts)
    if (healthRes.status === 'fulfilled') setHealth(healthRes.value)
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'sessions', label: 'Active Sessions', count: sessions.length },
    { key: 'jobs', label: 'Monitored Jobs', count: recentJobs.length },
    { key: 'alerts', label: 'Webhook Alerts', count: alerts.length },
  ]

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Monitoring Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Continuous job monitoring & webhook alerts</p>
          </div>
          <div className="flex items-center gap-3">
            {health && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border ${health.status === 'healthy' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                <span className={`w-2 h-2 rounded-full ${health.status === 'healthy' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}/>
                API {health.status} · {health.active_sessions} active
              </span>
            )}
            <button onClick={fetchAll} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshIcon /> Refresh
            </button>
            <button onClick={() => { setShowNewForm(!showNewForm); setTab('sessions') }}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <PlusIcon /> New Session
            </button>
          </div>
        </div>

        {/* New session form */}
        {showNewForm && (
          <div className="mb-6">
            <NewSessionForm onStarted={() => { setShowNewForm(false); fetchAll() }} />
          </div>
        )}

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Active Sessions', value: sessions.length, color: 'text-blue-600' },
            { label: 'Recent Jobs Alerted', value: recentJobs.length, color: 'text-green-600' },
            { label: 'Webhook Alerts Sent', value: alerts.length, color: 'text-purple-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.label}
              {t.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {loading ? (
          <div className="flex justify-center items-center py-16 gap-3 text-gray-400">
            <SpinnerIcon /> <span className="text-sm">Loading…</span>
          </div>
        ) : (
          <>
            {tab === 'sessions' && (
              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
                    <WebhookIcon />
                    <p className="text-sm text-gray-500 mt-3">No active monitoring sessions.</p>
                    <button onClick={() => setShowNewForm(true)}
                      className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 mx-auto transition-colors">
                      <PlusIcon /> Start Monitoring
                    </button>
                  </div>
                ) : (
                  sessions.map((s) => (
                    <SessionCard key={s.session_id} session={s} onStopped={fetchAll} />
                  ))
                )}
              </div>
            )}

            {tab === 'jobs' && <RecentJobsTable jobs={recentJobs} />}
            {tab === 'alerts' && <AlertsTable alerts={alerts} />}
          </>
        )}

      </div>
    </div>
  )
}
