import { describe, it, expect } from 'vitest'
import { SkillEntity } from '../Skill.entity'

describe('Skill Entity', () => {
  const mockProps = {
    id: '1',
    name: 'TypeScript',
    category: 'Languages' as const,
    level: 85,
  }

  it('should instantiate correctly', () => {
    const skill = SkillEntity.create(mockProps)

    expect(skill.id).toBe('1')
    expect(skill.name).toBe('TypeScript')
    expect(skill.category).toBe('Languages')
    expect(skill.level).toBe(85)
  })

  it('should translate skill level to standard proficiency labels', () => {
    const expert = SkillEntity.create({ ...mockProps, level: 95 })
    const advanced = SkillEntity.create({ ...mockProps, level: 85 })
    const intermediate = SkillEntity.create({ ...mockProps, level: 60 })
    const beginner = SkillEntity.create({ ...mockProps, level: 40 })

    expect(expert.getProficiencyLabel()).toBe('Expert')
    expect(advanced.getProficiencyLabel()).toBe('Advanced')
    expect(intermediate.getProficiencyLabel()).toBe('Intermediate')
    expect(beginner.getProficiencyLabel()).toBe('Beginner')
  })

  it('should throw if skill level is out of bounds', () => {
    expect(() => SkillEntity.create({ ...mockProps, level: 120 })).toThrow(
      'Skill level must be between 1 and 100',
    )
    expect(() => SkillEntity.create({ ...mockProps, level: -5 })).toThrow(
      'Skill level must be between 1 and 100',
    )
  })
})
