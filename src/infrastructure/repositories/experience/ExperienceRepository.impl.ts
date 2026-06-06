import { ExperienceEntity } from '@/domain/entities/Experience.entity'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'
import { EXPERIENCES_DATA } from './experience.data'

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
    this.experiences = EXPERIENCES_DATA.map((data, index) =>
      ExperienceEntity.create({
        ...data,
        id: (index + 1).toString(),
      }),
    )
  }

  /**
   * Retrieves all professional experience entities.
   * Simulates network latency before returning the result.
   * @returns A promise that resolves to an array of ExperienceEntity.
   */
  async findAll(): Promise<ExperienceEntity[]> {
    await this.delay(500) // Simulate async operation
    return [...this.experiences]
  }

  /**
   * Retrieves a single experience entity by its ID.
   * @param id - The ID of the experience to find.
   * @returns A promise that resolves to the matching ExperienceEntity, or null if not found.
   */
  async findById(id: string): Promise<ExperienceEntity | null> {
    await this.delay(300) // Simulate async operation
    return this.experiences.find((experience) => experience.id.includes(id)) || null
  }

  /**
   * Retrieves all experience entities that belong to the specified company.
   * Performs a case-insensitive partial match search.
   * @param company - The company name to filter by.
   * @returns A promise that resolves to an array of matching ExperienceEntity.
   */
  async findByCompany(company: string): Promise<ExperienceEntity[]> {
    await this.delay(300)
    return this.experiences.filter((experience) => experience.belongsToCompany(company))
  }

  /**
   * Finds the current job (the open-ended experience).
   * @returns A promise that resolves to the current ExperienceEntity, or null if no current job is found.
   */
  async findCurrentJob(): Promise<ExperienceEntity | null> {
    await this.delay(300)
    return this.experiences.find((experience) => experience.isCurrentJob()) || null
  }

  /**
   * Retrieves all experience entities that contain the specified technology.
   * @param technology - The name of the technology to filter by.
   * @returns A promise that resolves to an array of matching ExperienceEntity.
   */
  async findByTechnology(technology: string): Promise<ExperienceEntity[]> {
    await this.delay(300)
    return this.experiences.filter((experience) => experience.hasTechnology(technology))
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
