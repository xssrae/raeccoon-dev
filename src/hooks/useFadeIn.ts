import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useFadeIn(threshold: number | 'some' | 'all' = 'some') {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return { ref, isInView }
}
