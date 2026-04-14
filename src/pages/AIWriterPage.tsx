/**
 * AIWriterPage.tsx
 * Wraps the AI Writer / Proposal settings from V2-Auto-Bidding.
 * Note: This UI is not yet connected to a backend endpoint – it
 * provides the proposal template editor and AI model settings UI.
 */
import React, { useState } from 'react'
import SettingsSection from '../components/ai-writer/SettingsSection.tsx'
import AIWriterSettingsLayout from '../components/ai-writer/AIWriterSettingsLayout.tsx'
import SectionHeader from '../components/ai-writer/SectionHeader.tsx'
import AISettingsPanel from '../components/ai-writer/AISettingsPanel.tsx'
import SaveButton from '../components/ai-writer/SaveButton.tsx'
import IconButton from '../components/ai-writer/IconButton.tsx'
import Eye_closed from '../components/ai-writer/icons/Eye_closed.tsx'
import ChevronMenuButton from '../components/ai-writer/ChevronMenuButton.tsx'
import NotificationSection from '../components/ai-writer/NotificationSection.tsx'

export default function AIWriterPage() {
  const [activeTab, setActiveTab] = useState('AI Writer')

  return (
    <div className="flex flex-col flex-1 min-h-full bg-white dark:bg-gray-950">
      {/* Beta banner */}
      <div className="mx-4 mt-3 mb-0 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-xs text-blue-700">
        <span className="font-semibold">ℹ️ AI Writer</span>
        — Proposal template editor. Backend AI generation endpoint coming soon.
      </div>

      <div className="flex h-full w-full flex-grow flex-col gap-6 overflow-hidden rounded-b-lg bg-white px-4 lg:flex-row">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 z-50 hidden h-full w-3/4 space-y-4 overflow-y-auto bg-white py-2 shadow-lg lg:relative lg:z-auto lg:block lg:h-auto lg:w-56 lg:border-gray-200 lg:bg-transparent lg:py-4 lg:shadow-none xl:w-72 dark:bg-gray-900 lg:dark:border-gray-700 shrink-0">
          <SettingsSection title="General" dataId="0" activeTab={activeTab} onTabChange={setActiveTab} />
          <SettingsSection title="Advanced" dataId="1" activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {activeTab === 'AI Writer' && (
            <AIWriterSettingsLayout
              title="AI Writer"
              description="Configure how AI writes and personalizes your proposals"
            />
          )}
          {activeTab === 'AI Settings' && (
            <div className="flex-1 overflow-auto">
              <div className="flex h-full">
                <div className="relative flex flex-1 w-full min-w-0 overflow-hidden">
                  <div className="grid grid-cols-1 w-full gap-6">
                    <div className="flex-1 min-w-0 space-y-4 overflow-y-auto py-4">
                      <SectionHeader
                        title="AI Settings"
                        description="Fine-tune AI model selection and parameters for optimal proposal generation."
                      />
                      <AISettingsPanel />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <NotificationSection />
    </div>
  )
}
