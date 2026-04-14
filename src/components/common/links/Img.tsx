import React from 'react'

// Vollna logo placeholder (original SVG not bundled)
const LOGO_PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="32" viewBox="0 0 80 32"><rect width="80" height="32" rx="4" fill="%23225aea"/><text x="10" y="21" font-family="Inter,sans-serif" font-size="13" font-weight="600" fill="white">FYP</text></svg>'
const TRANSPARENT = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export const Img = ({ id }: { id?: string | number }) => {
  switch (String(id)) {
    case '0':
      return <img src={LOGO_PLACEHOLDER} alt="FYP Auto-Bidding" width="auto" height="32px" className="max-h-[32px] py-[3px]" />
    case '1':
      return <img src={TRANSPARENT} draggable={false} />
    default:
      return null
  }
}

export default Img
