import { useState, useEffect, useCallback } from 'react'

export interface FilterState {
  searchInTitle: boolean
  searchInDescription: boolean
  searchInSkills: boolean
}

// Storage keys
const CHECKBOXES_STORAGE_KEY = 'upwork_filter_checkboxes'
const INCLUDE_KEYWORDS_STORAGE_KEY = 'upwork_filter_include_keywords'
const EXCLUDE_KEYWORDS_STORAGE_KEY = 'upwork_filter_exclude_keywords'

// Default: all checkboxes OFF
const DEFAULT_CHECKBOX_STATE: FilterState = {
  searchInTitle: false,
  searchInDescription: false,
  searchInSkills: false,
}

function loadCheckboxesFromStorage(): FilterState {
  try {
    const stored = localStorage.getItem(CHECKBOXES_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        searchInTitle: parsed.searchInTitle ?? false,
        searchInDescription: parsed.searchInDescription ?? false,
        searchInSkills: parsed.searchInSkills ?? false,
      }
    }
  } catch (e) {
    console.warn('[useFilterState] Failed to load checkboxes from localStorage:', e)
  }
  return DEFAULT_CHECKBOX_STATE
}

function saveCheckboxesToStorage(state: FilterState): void {
  try {
    localStorage.setItem(CHECKBOXES_STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('[useFilterState] Failed to save checkboxes to localStorage:', e)
  }
}

export function useFilterState() {
  const [checkboxes, setCheckboxes] = useState<FilterState>(() => loadCheckboxesFromStorage())

  // Save checkboxes to localStorage whenever they change
  useEffect(() => {
    saveCheckboxesToStorage(checkboxes)
  }, [checkboxes])

  const setSearchInTitle = useCallback((value: boolean) => {
    setCheckboxes(prev => ({ ...prev, searchInTitle: value }))
  }, [])

  const setSearchInDescription = useCallback((value: boolean) => {
    setCheckboxes(prev => ({ ...prev, searchInDescription: value }))
  }, [])

  const setSearchInSkills = useCallback((value: boolean) => {
    setCheckboxes(prev => ({ ...prev, searchInSkills: value }))
  }, [])

  return {
    ...checkboxes,
    setSearchInTitle,
    setSearchInDescription,
    setSearchInSkills,
  }
}

// Separate hooks for include and exclude keywords
export function useIncludeKeywords() {
  const [keywords, setKeywords] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(INCLUDE_KEYWORDS_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed : []
      }
    } catch (e) {
      console.warn('[useIncludeKeywords] Failed to load from localStorage:', e)
    }
    return []
  })

  useEffect(() => {
    try {
      localStorage.setItem(INCLUDE_KEYWORDS_STORAGE_KEY, JSON.stringify(keywords))
    } catch (e) {
      console.warn('[useIncludeKeywords] Failed to save to localStorage:', e)
    }
  }, [keywords])

  const addKeyword = useCallback((keyword: string) => {
    const trimmed = keyword.trim()
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords(prev => [...prev, trimmed])
    }
  }, [keywords])

  const removeKeyword = useCallback((keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword))
  }, [])

  const clearKeywords = useCallback(() => {
    setKeywords([])
    localStorage.removeItem(INCLUDE_KEYWORDS_STORAGE_KEY)
  }, [])

  return { keywords, addKeyword, removeKeyword, clearKeywords }
}

export function useExcludeKeywords() {
  const [keywords, setKeywords] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(EXCLUDE_KEYWORDS_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return Array.isArray(parsed) ? parsed : []
      }
    } catch (e) {
      console.warn('[useExcludeKeywords] Failed to load from localStorage:', e)
    }
    return []
  })

  useEffect(() => {
    try {
      localStorage.setItem(EXCLUDE_KEYWORDS_STORAGE_KEY, JSON.stringify(keywords))
    } catch (e) {
      console.warn('[useExcludeKeywords] Failed to save to localStorage:', e)
    }
  }, [keywords])

  const addKeyword = useCallback((keyword: string) => {
    const trimmed = keyword.trim()
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords(prev => [...prev, trimmed])
    }
  }, [keywords])

  const removeKeyword = useCallback((keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword))
  }, [])

  const clearKeywords = useCallback(() => {
    setKeywords([])
    localStorage.removeItem(EXCLUDE_KEYWORDS_STORAGE_KEY)
  }, [])

  return { keywords, addKeyword, removeKeyword, clearKeywords }
}