import React, { useState, useRef, useEffect } from 'react'
import type { JSX } from 'react/jsx-runtime'

import Horizontal_ellipsis from '@/components/icons/Horizontal_ellipsis.tsx'
import ActionsDropdownMenu from './ActionsDropdownMenu.tsx'



// Component

        function ActionsDropdownInvoker({
            id
        }: {
            id: string;
        }) {
            const [isOpen, setIsOpen] = useState(false)
            const containerRef = useRef<HTMLDivElement>(null)

            // Close dropdown when clicking outside
            useEffect(() => {
                function handleClickOutside(event: MouseEvent) {
                    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                        setIsOpen(false)
                    }
                }

                if (isOpen) {
                    document.addEventListener('mousedown', handleClickOutside)
                }

                return () => {
                    document.removeEventListener('mousedown', handleClickOutside)
                }
            }, [isOpen])

            // Close dropdown on Escape key
            useEffect(() => {
                function handleEscape(event: KeyboardEvent) {
                    if (event.key === 'Escape') {
                        setIsOpen(false)
                    }
                }

                if (isOpen) {
                    document.addEventListener('keydown', handleEscape)
                }

                return () => {
                    document.removeEventListener('keydown', handleEscape)
                }
            }, [isOpen])

            const handleToggle = (e: React.MouseEvent) => {
                e.stopPropagation()
                setIsOpen(!isOpen)
            }

            const handleAction = (action: string) => {
                console.log(`Action: ${action}`)
                // You can add custom handling for each action here
            }

            return (
                <div ref={containerRef} className="relative">
                    <button
                        id={id}
                        type="button"
                        className={`
                            p-1.5 rounded transition-all duration-150
                            ${isOpen
                                ? 'text-gray-700 bg-gray-200'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }
                            active:bg-gray-200 active:scale-95
                        `}
                        aria-label="More actions"
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <Horizontal_ellipsis />
                    </button>
                    <ActionsDropdownMenu
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onAction={handleAction}
                    />
                </div>
            );
        }


export default ActionsDropdownInvoker
