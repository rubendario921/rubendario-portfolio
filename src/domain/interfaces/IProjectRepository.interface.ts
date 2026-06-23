import type { ProjectEntity } from '../entities/Project.entity'

/**
 * Interface defining standard querying operations for portfolio projects.
 */
export interface IProjectRepository {
  /**
   * Retrieves all projects.
   * @returns A promise that resolves to an array of ProjectEntity.
   */
  findAll(): Promise<ProjectEntity[]>

  /**
   * Retrieves a project by its unique ID.
   * @param id - The unique ID of the project.
   * @returns A promise resolving to the ProjectEntity or null if not found.
   */
  findById(id: string): Promise<ProjectEntity | null>

  /**
   * Retrieves all featured projects.
   * @returns A promise resolving to an array of featured ProjectEntity.
   */
  findFeatured(): Promise<ProjectEntity[]>

  /**
   * Retrieves all projects built using a specific technology.
   * @param technology - The name of the technology.
   * @returns A promise resolving to matching ProjectEntity list.
   */
  findByTechnology(technology: string): Promise<ProjectEntity[]>
}
export default IProjectRepository
