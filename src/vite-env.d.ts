/// <reference types="vite/client" />

// Allow SVG imports with the ?react query (used by base_icons components)
declare module '*.svg?react' {
  import React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
  export { ReactComponent }
}

// Allow arbitrary image paths used in copied components
declare module '/images/*.svg' {
  const src: string
  export default src
}
