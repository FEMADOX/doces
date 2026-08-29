'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduced || !('IntersectionObserver' in window)) return

    const elements = [
      ...document.querySelectorAll<HTMLElement>('[data-reveal]')
    ]
    if (elements.length === 0) return

    const root = document.documentElement
    root.classList.add('reveal-enabled')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -80px', threshold: 0.12 }
    )

    elements.map((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      root.classList.remove('reveal-enabled')
    }
  }, [])

  return null
}
