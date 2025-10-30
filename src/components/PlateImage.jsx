import { useState, useMemo } from 'react'

// A resilient image component that tries multiple sources and falls back to a vector plate
export default function PlateImage({ sources = [], alt = 'License plate', className = '' }) {
  const [index, setIndex] = useState(0)

  const fallbackDataUrl = useMemo(() => {
    // Simple SVG fallback styled like a plate
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'>
        <defs>
          <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0%' stop-color='#f8fafc'/>
            <stop offset='100%' stop-color='#e2e8f0'/>
          </linearGradient>
          <filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'>
            <feDropShadow dx='0' dy='8' stdDeviation='12' flood-color='rgba(0,0,0,0.2)'/>
          </filter>
        </defs>
        <rect x='40' y='40' width='1120' height='520' rx='36' fill='url(#g)' stroke='#cbd5e1' stroke-width='6' filter='url(#shadow)'/>
        <rect x='70' y='80' width='1060' height='440' rx='24' fill='white' stroke='#e2e8f0' stroke-width='4'/>
        <g font-family='Inter, Arial' font-weight='700' fill='#0f172a'>
          <text x='600' y='280' font-size='140' text-anchor='middle'>PLATE</text>
          <text x='600' y='410' font-size='100' text-anchor='middle' fill='#334155'>CREATE</text>
        </g>
        <circle cx='140' cy='140' r='10' fill='#64748b'/>
        <circle cx='1060' cy='140' r='10' fill='#64748b'/>
        <circle cx='140' cy='460' r='10' fill='#64748b'/>
        <circle cx='1060' cy='460' r='10' fill='#64748b'/>
      </svg>`
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }, [])

  const allSources = useMemo(() => {
    const defaults = [
      '/license-plate-frame-xl.jpg',
      '/license-plate-frame.jpg',
      '/license-plate-frame-std.jpg',
    ]
    // Deduplicate while preserving order
    const seen = new Set()
    const ordered = [...sources, ...defaults].filter((s) => {
      if (!s || seen.has(s)) return false
      seen.add(s)
      return true
    })
    // Append fallback
    return [...ordered, fallbackDataUrl]
  }, [sources, fallbackDataUrl])

  const src = allSources[Math.min(index, allSources.length - 1)]

  return (
    <img
      src={src}
      onError={() => setIndex((i) => Math.min(i + 1, allSources.length - 1))}
      alt={alt}
      className={className}
      draggable={false}
    />
  )
}
