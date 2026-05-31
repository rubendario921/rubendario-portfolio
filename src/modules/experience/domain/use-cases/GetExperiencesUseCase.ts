import type { Experience } from '../entities/Experience'
import type { IExperienceReader } from '../repositories/IExperienceRepository'

export class GetExperiencesUseCase {
  constructor(private repository: IExperienceReader) {}

  async execute(): Promise<Experience[]> {
    const experiences = await this.repository.getAllExperiences()

    //Ordernar por fecha mas reciente.
    return experiences.sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
  }
}
