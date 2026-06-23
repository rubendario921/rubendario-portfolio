import { SkillEntity, type SkillCategory } from '@/domain/entities/Skill.entity'
import type { ISkillRepository } from '@/domain/interfaces/ISkillRepository.interface'
import { SKILLS_DATA } from './skill.data'
import { loggerService } from '@/infrastructure/services/Logger.service'

/**
 * Concrete implementation of the ISkillRepository interface.
 * Simulates data persistence using an in-memory data array (skill.data.ts).
 */
export class SkillRepository implements ISkillRepository {
  private skills: SkillEntity[] = []

  constructor() {
    this.loadSkills()
  }

  /**
   * Loads static skill data, parses them into Domain Entities, and stores them in memory.
   */
  private loadSkills(): void {
    try {
      this.skills = SKILLS_DATA.map((data, index) =>
        SkillEntity.create({
          ...data,
          id: (index + 1).toString(),
        }),
      )
      loggerService.info(`Successfully loaded ${this.skills.length} skills.`)
    } catch (error) {
      loggerService.error('Failed to parse mock skills data', error)
      this.skills = []
    }
  }

  /**
   * Retrieves all skills.
   * Simulates network latency.
   * @returns A promise that resolves to an array of SkillEntity.
   */
  async findAll(): Promise<SkillEntity[]> {
    try {
      await this.delay(200)
      return [...this.skills]
    } catch (error) {
      loggerService.error('Error fetching skills', error)
      return []
    }
  }

  /**
   * Retrieves all skills belonging to a specific category.
   * @param category - The skill category.
   * @returns A promise resolving to matching SkillEntity list.
   */
  async findByCategory(category: SkillCategory): Promise<SkillEntity[]> {
    try {
      await this.delay(100)
      return this.skills.filter((skill) => skill.category === category)
    } catch (error) {
      loggerService.error(`Error filtering skills by category: ${category}`, error)
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
export default SkillRepository
