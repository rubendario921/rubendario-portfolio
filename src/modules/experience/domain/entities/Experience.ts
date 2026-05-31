export interface Technology {
  name: string
  icon?: string
  category: 'frontend' | 'backend' | 'database' | 'devops'
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: Date
  endDate: Date | null
  description: string[]
  technologies: Technology[] // Tecnologías utilizadas
  isCurrentJob: boolean
  achievements?: string[] // Logros específicos
  companyLogo?: string
}

export class ExperienceEntity {
  static calculateDuration(start: Date, end: Date | null): string {
    const endDate = end || new Date()
    const diffTime = Math.abs(endDate.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffMonths = Math.floor((diffDays % 365) / 30)
    const diffYears = Math.floor(diffMonths / 12)

    if (diffYears === 0 && diffMonths === 0) return 'Menos de un mes'
    if (diffYears === 0) return `${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`
    if (diffMonths === 0) return `${diffYears} año${diffYears > 1 ? 's' : ''}`
    return `${diffYears} año${diffYears > 1 ? 's' : ''} y ${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`
  }

  static isActive(experience: Experience): boolean {
    return experience.isCurrentJob || experience.endDate === null
  }
}
