import {
  ExperienceResponseDTO,
  type ExperienceResponse,
} from '@/application/dto/experience/ExperienceResponse.dto'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'

export class FilterExperiencesByTechUseCase {
  constructor(private readonly repository: IExperienceRepository) {}

  async execute(technologyName: string): Promise<ExperienceResponse[]> {
    if (!technologyName || technologyName.trim().length === 0)
      throw new Error('Technology name is required')
    const experiences = await this.repository.findByTechnology(technologyName)
    return ExperienceResponseDTO.fromEntities(experiences)
  }
}
