import type { ProjectEntity } from '@/domain/entities/Project.entity'

/**
 * Interface representing the structure of project data returned to the UI layer.
 */
export interface ProjectResponse {
  id: string
  title: string
  description: string
  technologies: { name: string; category: string }[]
  url?: string
  githubUrl?: string
  featured: boolean
  imageUrl?: string
}

/**
 * DTO for transforming ProjectEntity instances into ProjectResponse items.
 */
export class ProjectResponseDTO {
  /**
   * Transforms a ProjectEntity into a ProjectResponse.
   * @param project - The domain project entity.
   * @returns Formatted project response DTO.
   */
  static fromEntity(project: ProjectEntity): ProjectResponse {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: project.technologies.map((tech) => ({
        name: tech.name,
        category: tech.category,
      })),
      url: project.url,
      githubUrl: project.githubUrl,
      featured: project.featured,
      imageUrl: project.imageUrl,
    }
  }

  /**
   * Transforms an array of ProjectEntities into ProjectResponses.
   * @param projects - List of domain project entities.
   * @returns List of formatted project response DTOs.
   */
  static fromEntities(projects: ProjectEntity[]): ProjectResponse[] {
    return projects.map((p) => this.fromEntity(p))
  }
}
export default ProjectResponseDTO
