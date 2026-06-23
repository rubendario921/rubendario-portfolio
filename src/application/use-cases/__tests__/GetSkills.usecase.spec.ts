import { describe, it, expect, vi } from 'vitest'
import { GetSkillsUseCase } from '../skill/GetSkills.usecase'
import type { ISkillRepository } from '@/domain/interfaces/ISkillRepository.interface'
import { SkillEntity } from '@/domain/entities/Skill.entity'

describe('GetSkills Use Case', () => {
  const mockSkills = [
    SkillEntity.create({ id: '1', name: 'Vue', category: 'Frameworks', level: 80 }),
    SkillEntity.create({ id: '2', name: 'TypeScript', category: 'Languages', level: 90 }),
  ]

  it('should fetch all skills sorted by level descending', async () => {
    const mockRepo: ISkillRepository = {
      findAll: vi.fn().mockResolvedValue(mockSkills),
      findByCategory: vi.fn(),
    }

    const useCase = new GetSkillsUseCase(mockRepo)
    const result = await useCase.execute()

    expect(mockRepo.findAll).toHaveBeenCalledTimes(1)
    expect(result).toHaveLength(2)
    // TypeScript should come first as level 90 > 80
    expect(result[0].name).toBe('TypeScript')
    expect(result[1].name).toBe('Vue')
  })

  it('should call findByCategory when category is provided', async () => {
    const mockRepo: ISkillRepository = {
      findAll: vi.fn(),
      findByCategory: vi.fn().mockResolvedValue([mockSkills[0]]),
    }

    const useCase = new GetSkillsUseCase(mockRepo)
    const result = await useCase.execute('Frameworks')

    expect(mockRepo.findByCategory).toHaveBeenCalledWith('Frameworks')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Vue')
  })
})
