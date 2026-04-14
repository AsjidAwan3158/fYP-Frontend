import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import External_link_arrow from './icons/External_link_arrow.tsx'


// Component

        function DocumentationLink() {
            return (
                <a className={"text-blue-700 underline hover:text-blue-900 flex items-center gap-1"} target={"_blank"} rel={"noopener noreferrer"}>
                    See documentation
                    <External_link_arrow />
                </a>
            );
        }
    

export default DocumentationLink
