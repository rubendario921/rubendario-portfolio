import type { Experience } from '../entities/Experience'

//Principio de Segregacion de Interfaces
export interface IExperienceReader {
  getAllExperiences(): Promise<Experience[]>
  getById(id: string): Promise<Experience | null>
  getByCompany(company: string): Promise<Experience[]>
  getCurrentExperiences(): Promise<Experience | null>
}

export interface IExperienceWriter {
  createExperience(experience: Omit<Experience, 'id'>): Promise<Experience>
  updateExperience(
    id: string,
    experience: Partial<Omit<Experience, 'id'>>,
  ): Promise<Experience | null>
  deleteExperience(id: string): Promise<void>
}

//Combinacion para repositorio completo
export interface IExperienceRepository extends IExperienceReader, IExperienceWriter {}
