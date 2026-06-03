import type { DateRange } from '../value-objects/DateRange.vo'
import type { Technology } from '../value-objects/Technology.vo'

export interface Experience {
  id: string
  company: string
  position: string
  dateRange: DateRange //Rango de Fechas
  description: string[]
  technologies: Technology[] // Tecnologías utilizadas
  achievements?: string[] // Logros específicos
  companyLogo?: string
}

export class ExperienceEntity {
  private constructor(private readonly experience: Experience) {}

  //Factory method
  static create(experience: Experience): ExperienceEntity {
    if (!experience.company || experience.company.trim().length === 0)
      throw new Error('Company name is required')

    if (!experience.position || experience.position.trim().length === 0)
      throw new Error('Position is required')

    if (!experience.dateRange.isValid()) throw new Error('Invalid date range')

    return new ExperienceEntity(experience)
  }

  // Getters
  get id(): string {
    return this.experience.id
  }

  get company(): string {
    return this.experience.company
  }
  get position(): string {
    return this.experience.position
  }
  get dateRange(): DateRange {
    return this.experience.dateRange
  }
  get description(): string[] {
    return this.experience.description
  }
  get technologies(): Technology[] {
    return this.experience.technologies
  }
  get achievements(): string[] | undefined {
    return this.experience.achievements ? [...this.experience.achievements] : undefined
  }
  get companyLogo(): string | undefined {
    return this.experience.companyLogo
  }

  // Business logic methods
  isCurrentJob(): boolean {
    return this.experience.dateRange.isOpenEnded()
  }

  getDuration(): string {
    return this.experience.dateRange.getDuration()
  }

  hasTechnology(techName: string): boolean {
    return this.experience.technologies.some((tech) =>
      tech.name.normalize().includes(techName.toLowerCase()),
    )
  }

  belongsToCompany(companyName: string): boolean {
    return this.experience.company.toLowerCase().includes(companyName.toLowerCase())
  }
}
