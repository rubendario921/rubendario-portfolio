/**
 * List of allowed categories for a skill.
 */
export type SkillCategory = 'Languages' | 'Frameworks' | 'Databases' | 'Tools' | 'Other'

/**
 * Plain object representing a developer skill.
 */
export interface Skill {
  /**
   * Unique identifier of the skill.
   */
  id: string

  /**
   * Name of the skill (e.g. "TypeScript").
   */
  name: string

  /**
   * Category of the skill.
   */
  category: SkillCategory

  /**
   * Proficiency level from 1 to 100.
   */
  level: number
}

/**
 * Domain Entity representing a developer skill.
 */
export class SkillEntity {
  private static readonly VALID_CATEGORIES: SkillCategory[] = [
    'Languages',
    'Frameworks',
    'Databases',
    'Tools',
    'Other',
  ]

  /**
   * Public constructor to enforce static factory creation.
   * @param skill - Raw skill parameters.
   */
  public constructor(private readonly skill: Skill) {}

  /**
   * Factory method to construct and validate a new SkillEntity instance.
   * @param skill - Raw skill object.
   * @returns A validated SkillEntity.
   * @throws {Error} If name is empty, category is invalid, or level is out of bounds.
   */
  static create(skill: Skill): SkillEntity {
    if (!skill.name || skill.name.trim().length === 0) {
      throw new Error('Skill name is required')
    }
    if (!SkillEntity.VALID_CATEGORIES.includes(skill.category)) {
      throw new Error(`Invalid skill category: "${skill.category}"`)
    }
    if (skill.level < 1 || skill.level > 100) {
      throw new Error('Skill level must be between 1 and 100')
    }
    return new SkillEntity(skill)
  }

  /**
   * Skill unique ID.
   */
  get id(): string {
    return this.skill.id
  }

  /**
   * Skill name.
   */
  get name(): string {
    return this.skill.name
  }

  /**
   * Skill category.
   */
  get category(): SkillCategory {
    return this.skill.category
  }

  /**
   * Skill proficiency level.
   */
  get level(): number {
    return this.skill.level
  }

  /**
   * Gets a label for the proficiency level (e.g. "Expert", "Intermediate").
   * @returns A readability string for the level.
   */
  getProficiencyLabel(): string {
    if (this.skill.level >= 90) return 'Expert'
    if (this.skill.level >= 80) return 'Advanced'
    if (this.skill.level >= 60) return 'Intermediate'
    return 'Beginner'
  }
}
export default SkillEntity
