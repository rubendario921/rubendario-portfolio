import type { ExperienceEntity } from '../entities/Experience.entity'

export interface IExperienceRepository {
  findAll(): Promise<ExperienceEntity[]>
  findById(id: string): Promise<ExperienceEntity | null>
  findByCompany(company: string): Promise<ExperienceEntity[]>
  findCurrentJob(): Promise<ExperienceEntity | null>
  findByTechnology(technology: string): Promise<ExperienceEntity[]>
}
