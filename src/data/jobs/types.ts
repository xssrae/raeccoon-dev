export interface Job {
  company: string
  role: string
  startDate: string
  endDate: string
  location?: string
  description: string
  summary?: string
  impact?: string
  challenges?: string[]
  features?: string[]
  technologies: string[]
}