import type { Experience } from '../entities/Experience'
import type { IExperienceReader } from '../repositories/IExperienceRepository'

export class FilterExperiencesByTechnologyUseCase {
  constructor(private repository: IExperienceReader) {}

  async execute(technology: string): Promise<Experience[]> {
    const allExperiences = await this.repository.getAllExperiences()

    //Filtrardo especifico
    return allExperiences.filter((experience) =>
      experience.technologies.some((tech) => tech.name.toLowerCase() === technology.toLowerCase()),
    )
  }
}
