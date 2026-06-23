import type { TechnologyCategory } from '@/domain/value-objects/Technology.vo'

/**
 * Interface representing the structure of input data required to create an experience.
 */
export interface CreateExperienceInput {
  /**
   * Name of the company.
   */
  company: string

  /**
   * Professional position title.
   */
  position: string

  /**
   * Start date in ISO/String format.
   */
  startDate: string

  /**
   * End date in ISO/String format (null if current job).
   */
  endDate: string | null

  /**
   * List of responsibilities.
   */
  description: string[]

  /**
   * List of technologies.
   */
  technologies: { name: string; category: TechnologyCategory }[]

  /**
   * Optional milestones.
   */
  achievements?: string[]

  /**
   * Optional company logo.
   */
  companyLogo?: string
}

/**
 * Data Transfer Object for validating new Experience inputs.
 */
export class CreateExperienceDTO {
  /**
   * Validates the structure and constraints of input data.
   * @param input - The raw experience data.
   * @throws {Error} if constraints are violated.
   */
  static validate(input: CreateExperienceInput): void {
    if (!input.company || input.company.trim().length === 0) {
      throw new Error('Company is required')
    }
    if (!input.position || input.position.trim().length === 0) {
      throw new Error('Position is required')
    }
    if (!input.startDate || isNaN(Date.parse(input.startDate))) {
      throw new Error('Valid start date is required')
    }
    if (input.endDate && isNaN(Date.parse(input.endDate))) {
      throw new Error('Valid end date is required')
    }
    if (input.endDate && new Date(input.startDate) > new Date(input.endDate)) {
      throw new Error('Start date cannot be after end date')
    }
    if (!input.description || input.description.length === 0) {
      throw new Error('At least one description bullet point is required')
    }
  }
}
export default CreateExperienceDTO
