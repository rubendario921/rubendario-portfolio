import { ProjectEntity } from '@/domain/entities/Project.entity'
import type { IProjectRepository } from '@/domain/interfaces/IProjectRepository.interface'
import { PROJECTS_DATA } from './project.data'
import { loggerService } from '@/infrastructure/services/Logger.service'

/**
 * Concrete implementation of the IProjectRepository interface.
 * Simulates data persistence using an in-memory data array (project.data.ts).
 */
export class ProjectRepository implements IProjectRepository {
  private projects: ProjectEntity[] = []

  constructor() {
    this.loadProjects()
  }

  /**
   * Loads the static project data, parses them into Domain Entities, and stores them in memory.
   */
  private loadProjects(): void {
    try {
      this.projects = PROJECTS_DATA.map((data, index) =>
        ProjectEntity.create({
          ...data,
          id: (index + 1).toString(),
        }),
      )
      loggerService.info(`Successfully loaded ${this.projects.length} projects.`)
    } catch (error) {
      loggerService.error('Failed to parse mock projects data', error)
      this.projects = []
    }
  }

  /**
   * Retrieves all projects.
   * Simulates latency.
   * @returns A promise that resolves to an array of ProjectEntity.
   */
  async findAll(): Promise<ProjectEntity[]> {
    try {
      await this.delay(300)
      return [...this.projects]
    } catch (error) {
      loggerService.error('Error fetching projects', error)
      return []
    }
  }

  /**
   * Retrieves a project by its unique ID.
   * @param id - The unique ID.
   * @returns A promise resolving to the ProjectEntity or null if not found.
   */
  async findById(id: string): Promise<ProjectEntity | null> {
    try {
      await this.delay(150)
      return this.projects.find((project) => project.id === id) || null
    } catch (error) {
      loggerService.error(`Error finding project by ID: ${id}`, error)
      return null
    }
  }

  /**
   * Retrieves all featured projects.
   * @returns A promise resolving to featured ProjectEntity list.
   */
  async findFeatured(): Promise<ProjectEntity[]> {
    try {
      await this.delay(150)
      return this.projects.filter((project) => project.featured)
    } catch (error) {
      loggerService.error('Error finding featured projects', error)
      return []
    }
  }

  /**
   * Retrieves all projects built using a specific technology.
   * @param technology - The name of the technology.
   * @returns A promise resolving to matching ProjectEntity list.
   */
  async findByTechnology(technology: string): Promise<ProjectEntity[]> {
    try {
      await this.delay(150)
      return this.projects.filter((project) => project.hasTechnology(technology))
    } catch (error) {
      loggerService.error(`Error filtering projects by technology: ${technology}`, error)
      return []
    }
  }

  /**
   * Helper utility to simulate network latency.
   * @param ms - Duration in milliseconds.
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
export default ProjectRepository
