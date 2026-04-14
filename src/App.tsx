import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom'

// Bidding page components
import TopNavigation from './components/layout/TopNavigation.tsx'
import ProjectsLayout from './components/layout/ProjectsLayout.tsx'
import FiltersPage from './components/pages/FiltersPage.tsx'
import NotificationsPage from './components/pages/NotificationsPage.tsx'
import FooterBar from './components/layout/FooterBar.tsx'

// New backend-integrated pages
import ScrapePage from './pages/ScrapePage.tsx'
import MonitoringPage from './pages/MonitoringPage.tsx'

// AI Writer page (from V2-Auto-Bidding)
import AIWriterPage from './pages/AIWriterPage.tsx'

// ── Global top nav tabs ───────────────────────────────────────────────────────

function GlobalNav() {
  const tabs = [
    { to: '/jobs', label: '📋 Job Board' },
    { to: '/filters', label: '🔍 Filters' },
    { to: '/scrape', label: '⚙️ Scrape Jobs' },
    { to: '/monitoring', label: '📡 Monitoring' },
    { to: '/notifications', label: '🔔 Notifications' },
    { to: '/ai-writer', label: '✨ AI Writer' },
  ]

  return (
    <nav className="flex items-center gap-1 px-4 border-b border-gray-200 bg-white overflow-x-auto">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) =>
            `px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
            }`
          }
        >
          {t.label}
        </NavLink>
      ))}
    </nav>
  )
}

// ── Route-aware layout ────────────────────────────────────────────────────────

function AppContent() {
  const location = useLocation()

  // The original Bidding_page TopNavigation is used on job/filters/notifications pages
  const useTopNavigation = ['/jobs', '/filters', '/notifications'].some((p) =>
    location.pathname.startsWith(p)
  )

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-gray-950">
      {/* Original Bidding_page header for job board sections */}
      {useTopNavigation && (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm bg-white dark:bg-gray-950">
          <TopNavigation teamName="Usman team" />
        </header>
      )}

      {/* Unified section navigation  */}
      <GlobalNav />

      {/* Page content */}
      <div className="flex flex-col flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/jobs" element={<ProjectsLayout />} />
          <Route path="/filters" element={<FiltersPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/scrape" element={<ScrapePage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/ai-writer" element={<AIWriterPage />} />
          {/* Legacy deep-links */}
          <Route path="/dashboard/filter/*" element={<Navigate to="/filters" replace />} />
          <Route path="/dashboard/filters" element={<Navigate to="/filters" replace />} />
          <Route path="/dashboard/notifications" element={<Navigate to="/notifications" replace />} />
          <Route path="*" element={<Navigate to="/jobs" replace />} />
        </Routes>
      </div>

      <FooterBar />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
