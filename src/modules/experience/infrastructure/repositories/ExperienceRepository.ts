import type { Experience } from '../../domain/entities/Experience'
import type { IExperienceRepository } from '../../domain/repositories/IExperienceRepository'

const EXPERIENCE_DATA: Omit<Experience, 'id'>[] = [
  {
    company: 'NetBy IT Consulting',
    position: 'Software Engineer',
    startDate: new Date('2025-10-24'),
    endDate: null,
    description: [
      'Desarrollo de aplicaciones web utilizando React, Node.js y TypeScript.',
      'Colaboración con equipos multidisciplinarios para diseñar e implementar soluciones escalables.',
      'Participación en la planificación de proyectos y revisión de código para garantizar la calidad del software.',
    ],
    technologies: [
      { name: 'React', icon: 'react-icon', category: 'frontend' },
      { name: 'Node.js', icon: 'nodejs-icon', category: 'backend' },
      { name: 'TypeScript', icon: 'typescript-icon', category: 'frontend' },
    ],
    isCurrentJob: true,
    achievements: [
      'Lideré la migración de una aplicación monolítica a una arquitectura de microservicios.',
    ],
    companyLogo: 'netby-logo.png',
  },
]

export class ExperienceRepository implements IExperienceRepository {
  private experiences: Experience[] = []
  private nextId = 4

  constructor() {
    this.loadInitialData()
  }

  getAllExperiences(): Promise<Experience[]> {
    return Promise.resolve(this.experiences)
  }
  getById(id: string): Promise<Experience | null> {
    return this.experiences
  }
  getByCompany(company: string): Promise<Experience[]> {
    throw new Error('Method not implemented.')
  }
  getCurrentExperiences(): Promise<Experience | null> {
    throw new Error('Method not implemented.')
  }
  createExperience(experience: Omit<Experience, 'id'>): Promise<Experience> {
    throw new Error('Method not implemented.')
  }
  updateExperience(
    id: string,
    experience: Partial<Omit<Experience, 'id'>>,
  ): Promise<Experience | null> {
    throw new Error('Method not implemented.')
  }
  deleteExperience(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  private loadInitialData(): void {
    this.experiences = EXPERIENCE_DATA.map((experience, index) => ({
      ...experience,
      id: (index + 1).toString(),
    }))
  }
}
