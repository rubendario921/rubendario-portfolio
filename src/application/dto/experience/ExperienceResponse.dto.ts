import type { ExperienceEntity } from '@/domain/entities/Experience.entity'

export interface ExperienceResponse {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  duration: string
  isCurrentJob: boolean
  description: string[]
  technologies: { name: string; category: string }[]
  achievements?: string[]
  companyLogo?: string
}

export class ExperienceResponseDTO {
  // Factory method to create a response DTO from an entity
  static fromEntity(experience: ExperienceEntity): ExperienceResponse {
    return {
      id: experience.id,
      company: experience.company,
      position: experience.position,
      startDate: experience.dateRange.formatStartDate(),
      endDate: experience.dateRange.isOpenEnded() ? null : experience.dateRange.formatEndDate(),
      duration: experience.dateRange.getDuration(),
      isCurrentJob: experience.isCurrentJob(),
      description: experience.description,
      technologies: experience.technologies.map((tech) => ({
        name: tech.name,
        category: tech.category,
      })),
      achievements: experience.achievements,
      companyLogo: experience.companyLogo,
    }
  }

  // Utility method to convert an array of entities to an array of responses
  static fromEntities(experiences: ExperienceEntity[]): ExperienceResponse[] {
    return experiences.map((exp) => this.fromEntity(exp))
  }
}
