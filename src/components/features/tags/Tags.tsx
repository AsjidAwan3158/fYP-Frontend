import React, { useEffect, useRef, useState, KeyboardEvent } from 'react'
import type { JSX } from 'react/jsx-runtime'


type TagsData = {
    labels: string[];
}

// Component

function Tags({
    className,
    dataId,
    onChange,
    hiddenInputName,
    storageKey,
}: {
    className: string;
    dataId: string;
    onChange?: (labels: string[]) => void;
    hiddenInputName?: string;
    storageKey?: string;
}) {
    // Load from localStorage if storageKey provided, otherwise start empty
    const [labels, setLabels] = useState<string[]>(() => {
        if (storageKey) {
            try {
                const stored = localStorage.getItem(storageKey)
                if (stored) {
                    const parsed = JSON.parse(stored)
                    if (Array.isArray(parsed)) return parsed
                }
            } catch (e) {
                console.warn('[Tags] Failed to load from localStorage:', e)
            }
        }
        return []
    })
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLSpanElement>(null)

    // Sync to localStorage and hidden input whenever labels change
    useEffect(() => {
        if (storageKey) {
            try {
                localStorage.setItem(storageKey, JSON.stringify(labels))
            } catch (e) {
                console.warn('[Tags] Failed to save to localStorage:', e)
            }
        }
        syncHiddenInput(labels)
    }, [labels, storageKey])

    const syncHiddenInput = (next: string[]) => {
        if (!hiddenInputName) {
            return
        }

        const input = document.querySelector<HTMLInputElement>(`input[name="${hiddenInputName}"]`)
        if (input) {
            const payload = next.map((label) => ({ value: label, html: label }))
            input.value = JSON.stringify(payload)
            // Dispatch event so JobTasksTable knows keywords changed
            window.dispatchEvent(new CustomEvent('searchOptionsChanged'))
        }
    }

    const updateLabels = (next: string[]) => {
        setLabels(next)
        onChange?.(next)
    }

    const handleAddTag = (value: string) => {
        const trimmedValue = value.trim()
        if (trimmedValue && !labels.includes(trimmedValue)) {
            updateLabels([...labels, trimmedValue])
        }
    }

    const handleRemoveTag = (labelToRemove: string) => {
        updateLabels(labels.filter(label => label !== labelToRemove))
    }

    const commitCurrentInput = () => {
        const target = inputRef.current;
        if (!target) {
            return;
        }

        const value = target.textContent || '';
        handleAddTag(value);
        target.textContent = '';
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            commitCurrentInput();
        }
    };

    return (
        <div
            className={isFocused ? `${className} tagify--focus` : className}
            tabIndex={-1}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    inputRef.current?.focus();
                }
            }}
        >
            {labels.map((label) => (
                <TagItem
                    key={label}
                    label={label}
                    onRemove={() => handleRemoveTag(label)}
                />
            ))}
            <span
                ref={inputRef}
                contentEditable={true}
                tabIndex={0}
                className={"tagify__input form-control form-control-xs m-0"}
                data-placeholder={"Enter keyword and press Enter"}
                role={"textbox"}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setIsFocused(false);
                    commitCurrentInput();
                }}
                style={{ minWidth: '60px', outline: 'none' }}
            />
        </div>
    );
}


// Subcomponents

function TagItem({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <div
            title={label}
            contentEditable={false}
            tabIndex={-1}
            className={"tagify__tag tagify--noAnim"}
        >
            <button
                title={"Remove tag"}
                tabIndex={-1}
                className={"tagify__tag__removeBtn"}
                role={"button"}
                onClick={onRemove}
                style={{ cursor: 'pointer' }}
                type="button"
            />
            <div>
                <span
                    className={"tagify__tag-text flex items-center"}
                >
                    {label}
                </span>
            </div>
        </div>
    );
}


export default Tags
