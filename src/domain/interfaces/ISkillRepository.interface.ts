import type { SkillEntity, SkillCategory } from '../entities/Skill.entity'

/**
 * Interface defining standard querying operations for skills.
 */
export interface ISkillRepository {
  /**
   * Retrieves all skills.
   * @returns A promise that resolves to an array of SkillEntity.
   */
  findAll(): Promise<SkillEntity[]>

  /**
   * Retrieves all skills belonging to a specific category.
   * @param category - The skill category.
   * @returns A promise resolving to matching SkillEntity list.
   */
  findByCategory(category: SkillCategory): Promise<SkillEntity[]>
}
export default ISkillRepository
