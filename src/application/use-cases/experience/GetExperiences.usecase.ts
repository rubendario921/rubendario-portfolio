import {
  ExperienceResponseDTO,
  type ExperienceResponse,
} from '@/application/dto/experience/ExperienceResponse.dto'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'

export class GetExperiencesUseCase {
  constructor(private readonly repository: IExperienceRepository) {}

  async execute(): Promise<ExperienceResponse[]> {
    const experiences = await this.repository.findAll()

    // Sort experiences by start date in descending order (most recent first)
    const sortedExperiences = experiences.sort(
      (a, b) => b.dateRange.startDate.getTime() - a.dateRange.startDate.getTime(),
    )
    return ExperienceResponseDTO.fromEntities(sortedExperiences)
  }
}
