import {
  ExperienceResponseDTO,
  type ExperienceResponse,
} from '@/application/dto/experience/ExperienceResponse.dto'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'

/**
 * Use case to fetch the current active/open-ended job.
 */
export class GetCurrentJobUseCase {
  /**
   * Constructs GetCurrentJobUseCase.
   * @param repository - Concrete implementation of IExperienceRepository.
   */
  constructor(private readonly repository: IExperienceRepository) {}

  /**
   * Executes the use case.
   * @returns A promise resolving to the current active ExperienceResponse or null.
   */
  async execute(): Promise<ExperienceResponse | null> {
    const currentJob = await this.repository.findCurrentJob()
    return currentJob ? ExperienceResponseDTO.fromEntity(currentJob) : null
  }
}
export default GetCurrentJobUseCase
