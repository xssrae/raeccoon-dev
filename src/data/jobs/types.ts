export interface Job {
  company: string
  role: string
  startDate: string
  endDate: string
  location?: string
  description: string
  summary?: string
  challenges?: string[]
  skills?: string[]
  technologies: string[]
}