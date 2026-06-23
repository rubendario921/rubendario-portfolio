import type { SkillEntity } from '@/domain/entities/Skill.entity'

/**
 * Interface representing the structure of skill data returned to the UI layer.
 */
export interface SkillResponse {
  id: string
  name: string
  category: string
  level: number
  proficiencyLabel: string
}

/**
 * DTO for transforming SkillEntity instances into SkillResponse items.
 */
export class SkillResponseDTO {
  /**
   * Transforms a SkillEntity into a SkillResponse.
   * @param skill - The domain skill entity.
   * @returns Formatted skill response DTO.
   */
  static fromEntity(skill: SkillEntity): SkillResponse {
    return {
      id: skill.id,
      name: skill.name,
      category: skill.category,
      level: skill.level,
      proficiencyLabel: skill.getProficiencyLabel(),
    }
  }

  /**
   * Transforms an array of SkillEntities into SkillResponses.
   * @param skills - List of domain skill entities.
   * @returns List of formatted skill response DTOs.
   */
  static fromEntities(skills: SkillEntity[]): SkillResponse[] {
    return skills.map((s) => this.fromEntity(s))
  }
}
export default SkillResponseDTO
