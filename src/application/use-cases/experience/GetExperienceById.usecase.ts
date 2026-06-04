import {
  ExperienceResponseDTO,
  type ExperienceResponse,
} from '@/application/dto/experience/ExperienceResponse.dto'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'

export class GetExperienceByIdUseCase {
  constructor(private readonly repository: IExperienceRepository) {}

  async execute(id: string): Promise<ExperienceResponse | null> {
    if (!id || id.trim().length === 0) throw new Error('Experience ID is required')
    const experience = await this.repository.findById(id)
    return experience ? ExperienceResponseDTO.fromEntity(experience) : null
  }
}
