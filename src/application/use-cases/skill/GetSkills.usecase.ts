import type { ISkillRepository } from '@/domain/interfaces/ISkillRepository.interface'
import type { SkillCategory } from '@/domain/entities/Skill.entity'
import { SkillResponseDTO, type SkillResponse } from '../../dto/skill/SkillResponse.dto'

/**
 * Use case to retrieve and group developer skills.
 */
export class GetSkillsUseCase {
  /**
   * Constructs GetSkillsUseCase.
   * @param repository - Concrete implementation of ISkillRepository.
   */
  constructor(private readonly repository: ISkillRepository) {}

  /**
   * Executes the use case.
   * @param category - Optional category filter.
   * @returns List of formatted SkillResponse items.
   */
  async execute(category?: SkillCategory): Promise<SkillResponse[]> {
    const skills = category
      ? await this.repository.findByCategory(category)
      : await this.repository.findAll()

    // Sort skills by level descending (highest level first) without mutating original array
    const sortedSkills = [...skills].sort((a, b) => b.level - a.level)

    return SkillResponseDTO.fromEntities(sortedSkills)
  }
}
export default GetSkillsUseCase
