import type { DateRange } from '../value-objects/DateRange.vo'
import type { Technology } from '../value-objects/Technology.vo'

/**
 * Plain object representing a professional work experience.
 */
export interface Experience {
  /**
   * Unique identifier of the experience.
   */
  id: string

  /**
   * The name of the company or organization.
   */
  company: string

  /**
   * The job title or position held.
   */
  position: string

  /**
   * The start and end date range of employment.
   */
  dateRange: DateRange

  /**
   * Bullet points detailing responsibilities and activities.
   */
  description: string[]

  /**
   * Technologies used during this experience.
   */
  technologies: Technology[]

  /**
   * Key milestones or accomplishments.
   */
  achievements?: string[]

  /**
   * Optional URL to the company's logo.
   */
  companyLogo?: string
}

/**
 * Domain Entity representing professional work experience with validation rules.
 */
export class ExperienceEntity {
  /**
   * Public constructor to enforce factory method pattern.
   * @param experience - The experience data parameters.
   */
  public constructor(private readonly experience: Experience) {}

  /**
   * Factory method to construct and validate a new ExperienceEntity instance.
   * @param experience - The raw experience data object.
   * @returns A validated ExperienceEntity.
   * @throws {Error} If company, position, or dateRange is invalid.
   */
  static create(experience: Experience): ExperienceEntity {
    if (!experience.company || experience.company.trim().length === 0) {
      throw new Error('Company name is required')
    }
    if (!experience.position || experience.position.trim().length === 0) {
      throw new Error('Position is required')
    }
    if (!experience.dateRange.isValid()) {
      throw new Error('Invalid date range')
    }
    return new ExperienceEntity(experience)
  }

  /**
   * Unique identifier of the experience.
   */
  get id(): string {
    return this.experience.id
  }

  /**
   * Company name.
   */
  get company(): string {
    return this.experience.company
  }

  /**
   * Position held.
   */
  get position(): string {
    return this.experience.position
  }

  /**
   * Date range.
   */
  get dateRange(): DateRange {
    return this.experience.dateRange
  }

  /**
   * Responsibility details.
   */
  get description(): string[] {
    return [...this.experience.description]
  }

  /**
   * Technologies associated.
   */
  get technologies(): Technology[] {
    return [...this.experience.technologies]
  }

  /**
   * Accomplishments achieved.
   */
  get achievements(): string[] | undefined {
    return this.experience.achievements ? [...this.experience.achievements] : undefined
  }

  /**
   * Company logo URL.
   */
  get companyLogo(): string | undefined {
    return this.experience.companyLogo
  }

  /**
   * Checks if this is the user's current job (open-ended).
   * @returns True if current.
   */
  isCurrentJob(): boolean {
    return this.experience.dateRange.isOpenEnded()
  }

  /**
   * Gets readable duration details.
   * @returns A human readable duration string (e.g. "1 year 2 months").
   */
  getDuration(): string {
    return this.experience.dateRange.getDuration()
  }

  /**
   * Checks if a technology by name was used in this experience.
   * @param techName - The technology name to search.
   * @returns True if used.
   */
  hasTechnology(techName: string): boolean {
    return this.experience.technologies.some((tech) =>
      tech.name.toLowerCase().includes(techName.toLowerCase()),
    )
  }

  /**
   * Checks if the experience belongs to a specific company.
   * @param companyName - The company name to match.
   * @returns True if matched.
   */
  belongsToCompany(companyName: string): boolean {
    return this.experience.company.toLowerCase().includes(companyName.toLowerCase())
  }
}
export default ExperienceEntity
