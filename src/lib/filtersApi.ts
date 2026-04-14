import { requestJson } from './http'

export type FilterStatus = 'Active' | 'Paused' | 'Draft'

export interface CreateFilterInput {
  name: string
  sortOrder: number
  tags: string[]
  teamVisibility: string
}

export interface FilterDto {
  id: string
  name: string
  hasNotifications?: boolean
  status?: FilterStatus
  sortOrder?: number
  tags?: string[]
  teamVisibility?: string
}

// Default endpoints (adjust to match your backend).
const FILTERS_COLLECTION_PATH = '/api/filters'

export async function listFilters(signal?: AbortSignal): Promise<FilterDto[]> {
  return await requestJson<FilterDto[]>(FILTERS_COLLECTION_PATH, { method: 'GET', signal })
}

export async function createFilter(input: CreateFilterInput): Promise<FilterDto> {
  return await requestJson<FilterDto>(FILTERS_COLLECTION_PATH, { method: 'POST', body: input })
}

