/**
 * jobMapper.tsx
 * Maps BackendJob (from FYP backend) → JobRowData (used by JobTasksTable).
 */

import type { BackendJob } from './backendApi'
import React from 'react'

// ── Keyword Highlighting ─────────────────────────────────────────────────────

/**
 * Highlight keywords in text by wrapping them in a span.
 * Returns ReactNode array with highlighted keywords.
 */
export function highlightKeywords(
  text: string,
  keywords: string[]
): React.ReactNode[] {
  if (!keywords || keywords.length === 0 || !text) {
    return [text]
  }

  // Create a regex pattern for all keywords (case-insensitive)
  const escaped = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')

  const parts = text.split(pattern)

  return parts.map((part, i) => {
    const isMatch = keywords.some(k => k.toLowerCase() === part.toLowerCase())
    if (isMatch) {
      return <span key={i} className="keyword-highlighted">{part}</span>
    }
    return part
  })
}

/**
 * Check if a job contains keywords in its title (for sorting).
 */
export function jobHasKeywordInTitle(job: BackendJob, keywords: string[]): boolean {
  if (!keywords || keywords.length === 0) return false
  const titleLower = (job.title || '').toLowerCase()
  return keywords.some(k => titleLower.includes(k.toLowerCase()))
}

// ── Country flag helper ─────────────────────────────────────────────────────

const countryFlags: Record<string, string> = {
  'United States': '🇺🇸', Canada: '🇨🇦', 'United Kingdom': '🇬🇧',
  Germany: '🇩🇪', France: '🇫🇷', Australia: '🇦🇺', Singapore: '🇸🇬',
  India: '🇮🇳', Philippines: '🇵🇭', Brazil: '🇧🇷', Mexico: '🇲🇽',
  Japan: '🇯🇵', 'South Korea': '🇰🇷', Netherlands: '🇳🇱', Spain: '🇪🇸',
  Italy: '🇮🇹', Poland: '🇵🇱', Ukraine: '🇺🇦', Pakistan: '🇵🇰',
  'Saudi Arabia': '🇸🇦', 'United Arab Emirates': '🇦🇪',
}
function flag(country: string) { return countryFlags[country] ?? '🌍' }

function formatScrapedDate(iso: string): string {
  try {
    const date = new Date(iso)
    const diff = Date.now() - date.getTime()
    const h = Math.floor(diff / 3_600_000)
    const d = Math.floor(diff / 86_400_000)
    if (h < 1) return 'Just now'
    if (h < 24) return `${h} hours ago`
    if (d < 7) return `${d} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

export function mapBackendJobsToRows(jobs: BackendJob[], highlightTerms?: string[]) {
  return jobs.map((job, index) => {
    const country = job.country ?? 'Unknown'
    const budgetText = job.budget ? `${job.currency ?? '$'}${job.budget}` : 'N/A'

    const skillObjs = (job.skills ?? []).map((s) => ({ name: s, highlighted: false }))
    const descParts = (job.description ?? '')
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim().length > 0)
      .slice(0, 5)

    // Highlight keywords in title if provided
    const title = highlightTerms && highlightTerms.length > 0
      ? highlightKeywords(job.title || '', highlightTerms)
      : job.title

    return {
      rowId: job.job_id ?? `backend-job-${index}`,
      rowVariant: (index % 2 === 0 ? 'even' : 'odd') as 'even' | 'odd',
      title,
      budget: budgetText,
      published: formatScrapedDate(job.scraped_at),
      dropdownInvokerId: `dropdown-backend-${index}`,
      clientRankData: {
        rankLevel: 3 as 1 | 2 | 3 | 4 | 5,
        paymentVerified: false,
        totalSpent: '$0',
        hires: 0,
        jobsPosted: 0,
        hireRate: 0,
        openJobs: 0,
        starRating: 0,
        reviewCount: 0,
        registeredDate: 'N/A',
        country,
        countryFlag: flag(country),
        localTime: 'N/A',
      },
      jobData: {
        requiredConnects: 0,
        rating: 0,
        reviewCount: 0,
        totalSpent: '$0',
        avgHourlyRate: 'N/A',
        clientLocation: country,
        countryFlag: flag(country),
        description: descParts,
        clientQuestions: [],
        skills: skillObjs,
        hoursPerWeek: 'N/A',
        duration: 'N/A',
        expertiseLevel: 'N/A',
        projectType: 'Fixed price',
        clientWorkHistory: 0,
        category: 'N/A',
      },
    }
  })
}
