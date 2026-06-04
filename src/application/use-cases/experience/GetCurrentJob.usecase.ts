import {
  ExperienceResponseDTO,
  type ExperienceResponse,
} from '@/application/dto/experience/ExperienceResponse.dto'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'

export class GetCurrentJobUseCase {
  constructor(private readonly repository: IExperienceRepository) {}

  async execute(): Promise<ExperienceResponse | null> {
    const currentJob = await this.repository.findCurrentJob()
    return currentJob ? ExperienceResponseDTO.fromEntity(currentJob) : null
  }
}
