import type { IProjectRepository } from '@/domain/interfaces/IProjectRepository.interface'
import { ProjectResponseDTO, type ProjectResponse } from '../../dto/project/ProjectResponse.dto'

/**
 * Filter options for projects query.
 */
export interface GetProjectsFilters {
  /**
   * Only return featured projects if true.
   */
  featured?: boolean

  /**
   * Filter projects by a specific technology name.
   */
  technology?: string
}

/**
 * Use case to retrieve and optionally filter projects.
 */
export class GetProjectsUseCase {
  /**
   * Constructs GetProjectsUseCase.
   * @param repository - Concrete implementation of IProjectRepository.
   */
  constructor(private readonly repository: IProjectRepository) {}

  /**
   * Executes the use case.
   * @param filters - Optional filters.
   * @returns List of formatted ProjectResponse items.
   */
  async execute(filters?: GetProjectsFilters): Promise<ProjectResponse[]> {
    let projects = await this.repository.findAll()

    if (filters) {
      if (filters.featured !== undefined) {
        projects = projects.filter((p) => p.featured === filters.featured)
      }
      if (filters.technology && filters.technology.trim().length > 0) {
        const tech = filters.technology.trim()
        projects = projects.filter((p) => p.hasTechnology(tech))
      }
    }

    return ProjectResponseDTO.fromEntities(projects)
  }
}
export default GetProjectsUseCase
