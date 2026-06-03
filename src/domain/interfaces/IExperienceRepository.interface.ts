import type { ExperienceEntity } from '../entities/Experience.entity'

export interface IEXperienceRepository {
  findAll(): Promise<ExperienceEntity[]>
  findById(id: string): Promise<ExperienceEntity | null>
  findByCompany(company: string): Promise<ExperienceEntity[]>
  findCurrent(): Promise<ExperienceEntity[] | null>
  findByTechnology(technology: string): Promise<ExperienceEntity[]>
}
