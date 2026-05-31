import { ExperienceEntity } from '../entities/Experience'
import type { IExperienceReader } from '../repositories/IExperienceRepository'

export class GetCurrentJobUseCase {
  constructor(private repository: IExperienceReader) {}

  async execute() {
    const experiences = await this.repository.getAllExperiences()
    const currentJob = experiences.find((experience) => ExperienceEntity.isActive(experience))

    if (!currentJob) throw new Error('No current job found')

    return currentJob
  }
}
