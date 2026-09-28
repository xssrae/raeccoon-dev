export interface Project {
  index?: number
  slug: string
  title: string
  description: string
  summary: string
  image?: {
    src: string
    alt: string
  }
  impact?: string
  challenges?: string[]
  features?: string[]
  githubUrl: string
  technologies: string[]
}
