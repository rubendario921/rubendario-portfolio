import {
  ExperienceResponseDTO,
  type ExperienceResponse,
} from '@/application/dto/experience/ExperienceResponse.dto'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'

/**
 * Use case to fetch a single experience by ID.
 */
export class GetExperienceByIdUseCase {
  /**
   * Constructs GetExperienceByIdUseCase.
   * @param repository - Concrete implementation of IExperienceRepository.
   */
  constructor(private readonly repository: IExperienceRepository) {}

  /**
   * Executes the use case.
   * @param id - The ID of the experience.
   * @returns A promise resolving to the ExperienceResponse or null.
   * @throws {Error} If ID is empty.
   */
  async execute(id: string): Promise<ExperienceResponse | null> {
    if (!id || id.trim().length === 0) {
      throw new Error('Experience ID is required')
    }
    const experience = await this.repository.findById(id)
    return experience ? ExperienceResponseDTO.fromEntity(experience) : null
  }
}
export default GetExperienceByIdUseCase
