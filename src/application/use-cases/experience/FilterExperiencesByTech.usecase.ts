import {
  ExperienceResponseDTO,
  type ExperienceResponse,
} from '@/application/dto/experience/ExperienceResponse.dto'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'

/**
 * Use case to filter professional experiences based on technology.
 */
export class FilterExperiencesByTechUseCase {
  /**
   * Constructs FilterExperiencesByTechUseCase.
   * @param repository - Concrete implementation of IExperienceRepository.
   */
  constructor(private readonly repository: IExperienceRepository) {}

  /**
   * Executes the use case to fetch experiences associated with a tech.
   * @param technologyName - The name of the technology to filter by.
   * @returns A promise resolving to an array of matching ExperienceResponse.
   * @throws {Error} If technologyName is empty.
   */
  async execute(technologyName: string): Promise<ExperienceResponse[]> {
    if (!technologyName || technologyName.trim().length === 0) {
      throw new Error('Technology name is required')
    }
    const experiences = await this.repository.findByTechnology(technologyName)
    return ExperienceResponseDTO.fromEntities(experiences)
  }
}
export default FilterExperiencesByTechUseCase
