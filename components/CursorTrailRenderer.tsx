'use client'

import Image from 'next/image'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react'
import { advanceTrail } from '@/components/cursor-physics.mjs'

const ITEMS = [
  { src: '/assets/mouse/morango.webp', size: 38 },
  { src: '/assets/mouse/cacau.webp', size: 34 },
  { src: '/assets/mouse/coco.webp', size: 31 },
  { src: '/assets/mouse/castanhas.webp', size: 28 },
  { src: '/assets/mouse/tamara.webp', size: 24 }
] as const

const FACTORS = [0.28, 0.24, 0.21, 0.18, 0.16] as const

type Point = { x: number; y: number }

type Props = {
  initialX: number
  initialY: number
}

export default function CursorTrailRenderer({ initialX, initialY }: Props) {
  const nodes = useRef<(HTMLImageElement | null)[]>([])
  const target = useRef<Point>({ x: initialX, y: initialY })
  const points = useRef<Point[]>(
    ITEMS.map(() => ({ x: initialX, y: initialY }))
  )
  const frame = useRef<number | null>(null)

  useEffect(() => {
    const animate = () => {
      const unsettled = advanceTrail(points.current, target.current, FACTORS)

      points.current.forEach((point, index) => {
        nodes.current[index]?.style.setProperty(
          'transform',
          `translate3d(${point.x}px, ${point.y}px, 0)`
        )
      })

      frame.current = unsettled ? requestAnimationFrame(animate) : null
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      target.current = { x: event.clientX, y: event.clientY }
      if (frame.current === null) frame.current = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-60">
      {ITEMS.map((item, index) => (
        <Image
          key={item.src}
          ref={(node) => {
            nodes.current[index] = node
          }}
          src={item.src}
          alt=""
          width={96}
          height={64}
          className="absolute top-0 left-0 h-auto will-change-transform"
          style={{
            width: item.size,
            marginLeft: -item.size / 2,
            marginTop: -(item.size * 2) / 6,
            opacity: 1 - index * 0.16,
            filter: 'drop-shadow(0 4px 6px rgba(90,52,20,.3))',
            transform: `translate3d(${initialX}px, ${initialY}px, 0)`
          }}
        />
      ))}
    </div>
  )
}
