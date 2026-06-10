import type { Technology } from '../value-objects/Technology.vo'

/**
 * Plain object representing a portfolio project.
 */
export interface Project {
  /**
   * Unique identifier of the project.
   */
  id: string

  /**
   * Title of the project.
   */
  title: string

  /**
   * Detailed project description.
   */
  description: string

  /**
   * Technologies used.
   */
  technologies: Technology[]

  /**
   * Optional deployment URL.
   */
  url?: string

  /**
   * Optional source code repository link.
   */
  githubUrl?: string

  /**
   * Flag determining if the project should be highlighted on the landing page.
   */
  featured: boolean

  /**
   * Optional image URL preview.
   */
  imageUrl?: string
}

/**
 * Domain Entity representing a portfolio project.
 */
export class ProjectEntity {
  /**
   * Public constructor to enforce static factory creation.
   * @param project - The raw project parameters.
   */
  public constructor(private readonly project: Project) {}

  /**
   * Factory method to construct and validate a new ProjectEntity instance.
   * @param project - Raw project object.
   * @returns A validated ProjectEntity.
   * @throws {Error} If title, description, or technologies list is empty.
   */
  static create(project: Project): ProjectEntity {
    if (!project.title || project.title.trim().length === 0) {
      throw new Error('Project title is required')
    }
    if (!project.description || project.description.trim().length === 0) {
      throw new Error('Project description is required')
    }
    if (!project.technologies || project.technologies.length === 0) {
      throw new Error('At least one technology is required for the project')
    }
    return new ProjectEntity(project)
  }

  /**
   * Project unique ID.
   */
  get id(): string {
    return this.project.id
  }

  /**
   * Project title.
   */
  get title(): string {
    return this.project.title
  }

  /**
   * Project description.
   */
  get description(): string {
    return this.project.description
  }

  /**
   * List of technologies.
   */
  get technologies(): Technology[] {
    return [...this.project.technologies]
  }

  /**
   * Live deployment URL.
   */
  get url(): string | undefined {
    return this.project.url
  }

  /**
   * Repository URL.
   */
  get githubUrl(): string | undefined {
    return this.project.githubUrl
  }

  /**
   * Is the project featured.
   */
  get featured(): boolean {
    return this.project.featured
  }

  /**
   * Thumbnail preview URL.
   */
  get imageUrl(): string | undefined {
    return this.project.imageUrl
  }

  /**
   * Checks if this project utilizes a specific technology.
   * @param techName - The technology name to check.
   * @returns True if the project uses it.
   */
  hasTechnology(techName: string): boolean {
    return this.project.technologies.some((tech) =>
      tech.name.toLowerCase().includes(techName.toLowerCase()),
    )
  }
}
export default ProjectEntity
