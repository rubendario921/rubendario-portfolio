import { ExperienceEntity } from '@/domain/entities/Experience.entity'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'
import { EXPERIENCES_DATA } from './experience.data'
import { loggerService } from '@/infrastructure/services/Logger.service'

/**
 * Concrete implementation of the IExperienceRepository interface.
 * Simulates data persistence using an in-memory data array (experience.data.ts).
 */
export class ExperienceRepository implements IExperienceRepository {
  private experiences: ExperienceEntity[] = []

  constructor() {
    this.loadExperiences()
  }

  /**
   * Loads the static experience data, parses them into Domain Entities, and stores them in memory.
   */
  private loadExperiences(): void {
    try {
      this.experiences = EXPERIENCES_DATA.map((data, index) =>
        ExperienceEntity.create({
          ...data,
          id: (index + 1).toString(),
        }),
      )
      loggerService.info(`Successfully loaded ${this.experiences.length} experiences.`)
    } catch (error) {
      loggerService.error('Failed to parse mock experiences data', error)
      this.experiences = []
    }
  }

  /**
   * Retrieves all professional experience entities.
   * Simulates network latency before returning the result.
   * @returns A promise that resolves to an array of ExperienceEntity.
   */
  async findAll(): Promise<ExperienceEntity[]> {
    try {
      await this.delay(300) // Simulate async operation
      return [...this.experiences]
    } catch (error) {
      loggerService.error('Error fetching experiences', error)
      return []
    }
  }

  /**
   * Retrieves a single experience entity by its ID.
   * @param id - The ID of the experience to find.
   * @returns A promise that resolves to the matching ExperienceEntity, or null if not found.
   */
  async findById(id: string): Promise<ExperienceEntity | null> {
    try {
      await this.delay(150) // Simulate async operation
      return this.experiences.find((experience) => experience.id === id) || null
    } catch (error) {
      loggerService.error(`Error finding experience by ID: ${id}`, error)
      return null
    }
  }

  /**
   * Retrieves all experience entities that belong to the specified company.
   * Performs a case-insensitive partial match search.
   * @param company - The company name to filter by.
   * @returns A promise that resolves to an array of matching ExperienceEntity.
   */
  async findByCompany(company: string): Promise<ExperienceEntity[]> {
    try {
      await this.delay(150)
      return this.experiences.filter((experience) => experience.belongsToCompany(company))
    } catch (error) {
      loggerService.error(`Error finding experience by company: ${company}`, error)
      return []
    }
  }

  /**
   * Finds the current job (the open-ended experience).
   * @returns A promise that resolves to the current ExperienceEntity, or null if no current job is found.
   */
  async findCurrentJob(): Promise<ExperienceEntity | null> {
    try {
      await this.delay(150)
      return this.experiences.find((experience) => experience.isCurrentJob()) || null
    } catch (error) {
      loggerService.error('Error finding current job', error)
      return null
    }
  }

  /**
   * Retrieves all experience entities that contain the specified technology.
   * @param technology - The name of the technology to filter by.
   * @returns A promise that resolves to an array of matching ExperienceEntity.
   */
  async findByTechnology(technology: string): Promise<ExperienceEntity[]> {
    try {
      await this.delay(150)
      return this.experiences.filter((experience) => experience.hasTechnology(technology))
    } catch (error) {
      loggerService.error(`Error filtering experience by technology: ${technology}`, error)
      return []
    }
  }

  /**
   * Helper utility method to simulate network latency.
   * @param ms - The delay duration in milliseconds.
   * @returns A promise that resolves after the specified duration.
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
export default ExperienceRepository
