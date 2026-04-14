export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export class HttpError extends Error {
  status: number
  details?: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.details = details
  }
}

const DEFAULT_BASE_URL = ''

function getApiBaseUrl() {
  // Optional: set VITE_API_BASE_URL to point to your backend.
  // If empty, requests go to the same origin (use Vite proxy if needed).
  const base = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined
  return (base ?? DEFAULT_BASE_URL).replace(/\/+$/, '')
}

function joinUrl(base: string, path: string) {
  if (!path) return base
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (!base) return path.startsWith('/') ? path : `/${path}`
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export async function requestJson<T>(
  path: string,
  options?: {
    method?: HttpMethod
    body?: unknown
    headers?: Record<string, string>
    signal?: AbortSignal
  },
): Promise<T> {
  const url = joinUrl(getApiBaseUrl(), path)
  const method = options?.method ?? 'GET'

  const res = await fetch(url, {
    method,
    headers: {
      ...(options?.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      Accept: 'application/json',
      ...(options?.headers ?? {}),
    },
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
    signal: options?.signal,
  })

  const contentType = res.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')

  const payload = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined)

  if (!res.ok) {
    const message =
      (payload && typeof payload === 'object' && 'message' in (payload as any) && typeof (payload as any).message === 'string'
        ? (payload as any).message
        : `Request failed (${res.status})`) as string
    throw new HttpError(message, res.status, payload)
  }

  return payload as T
}

