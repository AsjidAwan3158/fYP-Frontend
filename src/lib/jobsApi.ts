import type { ReactNode } from 'react'
import { requestJson } from './http'

// ==================== JobRowData Types (for mapping) ====================

// These match the types in JobTasksTable.tsx
export interface ClientRankData {
  rankLevel: 1 | 2 | 3 | 4 | 5
  paymentVerified: boolean
  totalSpent: string
  hires: number
  jobsPosted: number
  hireRate: number
  openJobs: number
  starRating: number
  reviewCount: number
  registeredDate: string
  country: string
  countryFlag: string
  localTime: string
  city?: string
}

export interface JobData {
  requiredConnects: number
  rating: number
  reviewCount: number
  totalSpent: string
  avgHourlyRate: string
  clientLocation: string
  countryFlag: string
  description: string[]
  clientQuestions: string[]
  skills: { name: string; highlighted: boolean }[]
  hoursPerWeek: string
  duration: string
  expertiseLevel: string
  projectType: string
  clientWorkHistory: number
  category: string
}

export interface JobRowData {
  rowId: string
  rowVariant: 'even' | 'odd'
  title: ReactNode
  budget: ReactNode
  published: string
  dropdownInvokerId: string
  clientRankData: ClientRankData
  jobData: JobData
}

// ==================== Country Flag Helper ====================

const countryToFlag: Record<string, string> = {
  'United States': '🇺🇸',
  'Canada': '🇨🇦',
  'United Kingdom': '🇬🇧',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Australia': '🇦🇺',
  'Singapore': '🇸🇬',
  'India': '🇮🇳',
  'Philippines': '🇵🇭',
  'Brazil': '🇧🇷',
  'Mexico': '🇲🇽',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'Netherlands': '🇳🇱',
  'Spain': '🇪🇸',
  'Italy': '🇮🇹',
  'Poland': '🇵🇱',
  'Ukraine': '🇺🇦',
  'Russia': '🇷🇺',
  'China': '🇨🇳',
  'Israel': '🇮🇱',
  'Turkey': '🇹🇷',
  'Argentina': '🇦🇷',
  'Colombia': '🇨🇴',
  'Chile': '🇨🇱',
  'Peru': '🇵🇪',
  'Ireland': '🇮🇪',
  'Sweden': '🇸🇪',
  'Norway': '🇳🇴',
  'Denmark': '🇩🇰',
  'Finland': '🇫🇮',
  'Belgium': '🇧🇪',
  'Austria': '🇦🇹',
  'Switzerland': '🇨🇭',
  'Portugal': '🇵🇹',
  'Romania': '🇷🇴',
  'Czech Republic': '🇨🇿',
  'Hungary': '🇭🇺',
  'Greece': '🇬🇷',
  'New Zealand': '🇳🇿',
  'South Africa': '🇿🇦',
  'Egypt': '🇪🇬',
  'Thailand': '🇹🇭',
  'Vietnam': '🇻🇳',
  'Indonesia': '🇮🇩',
  'Malaysia': '🇲🇾',
  'Pakistan': '🇵🇰',
  'Bangladesh': '🇧🇩',
  'Nigeria': '🇳🇬',
  'Kenya': '🇰🇪',
  'Morocco': '🇲🇦',
  'Saudi Arabia': '🇸🇦',
  'United Arab Emirates': '🇦🇪',
  'Hong Kong': '🇭🇰',
  'Taiwan': '🇹🇼',
}

function getCountryFlag(country: string): string {
  return countryToFlag[country] || '🌍'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatTotalSpent(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`
  }
  return `$${amount}`
}

function calculateRankLevel(rating: number): 1 | 2 | 3 | 4 | 5 {
  if (rating >= 4.5) return 5
  if (rating >= 3.5) return 4
  if (rating >= 2.5) return 3
  if (rating >= 1.5) return 2
  return 1
}

function parseSkills(skillsString: string): { name: string; highlighted: boolean }[] {
  if (!skillsString) return []
  return skillsString.split(',').map(skill => ({
    name: skill.trim(),
    highlighted: false
  }))
}

function parseDescription(description: string): string[] {
  if (!description) return []
  // Split by sentence endings or common delimiters
  return description.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0)
}

// ==================== API Response Types ====================

export interface JobApiAnswer {
  question: string
  answer: string
}

export interface JobApiJobDetails {
  title: string
  postedAt: string
}

export interface JobApiFreelancer {
  id: number
  fullName: string
}

export interface JobApiBusinessManager {
  id: number
  fullName: string
}

export interface JobApiUpworkProfile {
  id: number
  label: string
  type: 'agency' | string
}

export interface JobApiUpworkOrganization {
  id: number
  label: string
  type: 'agency' | string
}

export interface JobApiTerms {
  fixedPrice: number
  hourlyRate: number
  increasePercent: number
  increaseFrequency: number
}

export interface JobApiBiddingTemplate {
  id: number
  name: string
}

export interface JobApiBudget {
  type: string
  amount: string
}

export interface JobApiFeedback {
  score: number
  comment: string
}

export interface JobApiRate {
  amount: number
}

export interface JobApiJobInfo {
  uid: string
  title: string
  type: string
}

export interface JobApiClientWorkHistoryJob {
  job_info: JobApiJobInfo
  status: string
  start_date: string
  end_date: string
  total_hours: number
  total_charge: number
  feedback: JobApiFeedback
  feedback_to_client: JobApiFeedback
  rate: JobApiRate
}

export interface JobApiClientDetails {
  paymentMethodVerified: boolean
  country: string
  totalSpent: number
  totalHires: number
  hireRate: number
  rating: number
  reviews: number
}

export interface JobApiProject {
  title: string
  description: string
  skills: string
  url: string
  publishedAt: string
  clientQuestions: string[]
  categories: string[]
  site: string
  budget: JobApiBudget
  clientDetails: JobApiClientDetails
  clientWorkHistory: JobApiClientWorkHistoryJob[]
}

export interface JobApiItem {
  id: number
  applicationUid: string
  submittedAt: string
  coverLetter: string
  answers: JobApiAnswer[]
  jobDetails: JobApiJobDetails
  freelancer: JobApiFreelancer
  businessManager: JobApiBusinessManager
  upworkProfile: JobApiUpworkProfile
  upworkOrganization: JobApiUpworkOrganization
  connects: number
  boost: number
  terms: JobApiTerms
  isViewed: boolean
  isInterviewed: boolean
  isHired: boolean
  isWithdrawn: boolean
  isInvitation: boolean
  isArchived: boolean
  occupationUid: string
  occupationTitle: string
  submissionPosition: number
  boostOutbid: boolean
  coverLetterVariant: string
  biddingTemplate: JobApiBiddingTemplate
  project: JobApiProject
}

export interface JobsApiResponse {
  data: JobApiItem[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

// ==================== API Functions ====================

// Routed through the Vite proxy (vite.config.js) during dev so the
// browser never makes a cross-origin request and the token stays server-side.
const VOLLNA_PROPOSALS_PATH = '/vollna-api/v1/proposals'

export interface ProposalsQuery {
  page?: number
  limit?: number
  sort?: string
  order?: 'ASC' | 'DESC'
  profileId?: 5709
}

const DEFAULT_PROFILE_ID = 50749670

// Token is injected by the Vite proxy (see vite.config.js) so the
// browser never needs to hold it. This check is kept only as a safety
// indicator during development.
function isProxyConfigured(): boolean {
  return typeof (import.meta as any)?.env?.VITE_VOLLNA_API_TOKEN === 'string' &&
    ((import.meta as any).env.VITE_VOLLNA_API_TOKEN as string).trim().length > 0
}

function buildProposalsUrl(query?: ProposalsQuery): string {
  const page = query?.page ?? 1
  const limit = query?.limit ?? 20
  const sort = query?.sort ?? 'submittedAt'
  const order = query?.order ?? 'DESC'
  const profileId = query?.profileId ?? DEFAULT_PROFILE_ID
  return `${VOLLNA_PROPOSALS_PATH}?page=${page}&limit=${limit}&sort=${sort}&order=${order}&profileId=${profileId}`
}

export async function listProposals(
  query?: ProposalsQuery,
  signal?: AbortSignal,
): Promise<JobsApiResponse> {
  if (!isProxyConfigured()) {
    throw new Error(
      'VITE_VOLLNA_API_TOKEN is not set in .env.local — add it and restart the dev server so the proxy can inject the token.',
    )
  }

  // No Authorization header needed here — the Vite proxy (vite.config.js)
  // injects X-API-TOKEN transparently for every /vollna-api/* request.
  return await requestJson<JobsApiResponse>(buildProposalsUrl(query), {
    method: 'GET',
    signal,
  })
}

export async function listJobs(signal?: AbortSignal): Promise<JobsApiResponse> {
  return await listProposals(undefined, signal)
}

export async function listJobsPaginated(
  page: number = 1,
  limit: number = 20,
  signal?: AbortSignal
): Promise<JobsApiResponse> {
  return await listProposals({ page, limit, sort: 'submittedAt', order: 'DESC' }, signal)
}

// ==================== Mapper Functions ====================

/**
 * Maps API response to JobRowData format
 * Limits results to specified count (default: 5)
 */
export function mapApiResponseToJobRows(
  apiData: JobApiItem[],
  limit: number = 5
): JobRowData[] {
  const limitedData = apiData.slice(0, limit)

  return limitedData.map((item, index) => {
    const clientDetails = item.project.clientDetails
    const budgetText =
      item.project.budget.type === 'Fixed price'
        ? `$${item.project.budget.amount}`
        : item.terms.hourlyRate
        ? `$${item.terms.hourlyRate}/hr`
        : 'N/A'

    return {
      rowId: String(item.id),
      rowVariant: index % 2 === 0 ? 'even' : 'odd',
      title: item.project.title,
      budget: budgetText,
      published: formatDate(item.project.publishedAt),
      dropdownInvokerId: `dropdown-${item.id}`,
      clientRankData: {
        rankLevel: calculateRankLevel(clientDetails.rating),
        paymentVerified: clientDetails.paymentMethodVerified,
        totalSpent: formatTotalSpent(clientDetails.totalSpent),
        hires: clientDetails.totalHires,
        jobsPosted: item.project.clientWorkHistory.length,
        hireRate: Math.round(clientDetails.hireRate * 100),
        openJobs: 0, // Not in API
        starRating: clientDetails.rating,
        reviewCount: clientDetails.reviews,
        registeredDate: 'N/A', // Not in API
        country: clientDetails.country,
        countryFlag: getCountryFlag(clientDetails.country),
        localTime: 'N/A',
      },
      jobData: {
        requiredConnects: item.connects,
        rating: clientDetails.rating,
        reviewCount: clientDetails.reviews,
        totalSpent: formatTotalSpent(clientDetails.totalSpent),
        avgHourlyRate: item.terms.hourlyRate ? `$${item.terms.hourlyRate}` : 'N/A',
        clientLocation: clientDetails.country,
        countryFlag: getCountryFlag(clientDetails.country),
        description: parseDescription(item.project.description),
        clientQuestions: item.project.clientQuestions,
        skills: parseSkills(item.project.skills),
        hoursPerWeek: 'N/A', // Not in API
        duration: 'N/A', // Not in API
        expertiseLevel: 'N/A', // Not in API
        projectType: item.project.budget.type,
        clientWorkHistory: item.project.clientWorkHistory.length,
        category: item.project.categories[0] || 'N/A',
      },
    }
  })
}
