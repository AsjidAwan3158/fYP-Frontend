import React from 'react'
import type { JSX } from 'react/jsx-runtime'



// Component
function HiddenTextarea() {
    return <textarea tabIndex={"-1"} style={{minHeight:"0px", maxHeight:"none", height:"0px", visibility:"hidden", overflow:"hidden", position:"absolute", zIndex:"-1000", top:"0px", right:"0px", display:"block", borderWidth:"0.8px", boxSizing:"border-box", fontFamily:"ui-sans-serif,system-ui,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\"", fontSize:"14px", fontStyle:"normal", fontWeight:"400", letterSpacing:"normal", lineHeight:"20px", padding:"8px 12px", tabSize:"4", textIndent:"0px", textRendering:"auto", textTransform:"none", width:"1037.6px", wordBreak:"normal", wordSpacing:"0px", scrollbarGutter:"auto"}}>
    	x
    </textarea>}


export default HiddenTextarea
