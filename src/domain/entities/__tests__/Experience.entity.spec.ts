import { describe, it, expect } from 'vitest'
import { ExperienceEntity } from '../Experience.entity'
import { DateRange } from '../../value-objects/DateRange.vo'
import { Technology } from '../../value-objects/Technology.vo'

describe('Experience Entity', () => {
  const mockProps = {
    id: '1',
    company: 'InnovateCorp',
    position: 'Architect',
    dateRange: new DateRange(new Date('2025-01-01'), null),
    description: ['Designed core database configurations', 'Liaised with front-end teams'],
    technologies: [new Technology('C#', 'Backend'), new Technology('Vue', 'Frontend')],
    achievements: ['Decreased latency by 20%'],
    companyLogo: 'http://example.com/logo.png',
  }

  it('should instantiate an entity correctly via constructor', () => {
    const exp = new ExperienceEntity(mockProps)

    expect(exp.id).toBe('1')
    expect(exp.company).toBe('InnovateCorp')
    expect(exp.position).toBe('Architect')
    expect(exp.description).toEqual(mockProps.description)
    expect(exp.technologies).toEqual(mockProps.technologies)
    expect(exp.achievements).toEqual(mockProps.achievements)
    expect(exp.companyLogo).toBe('http://example.com/logo.png')
    expect(exp.isCurrentJob()).toBe(true)
  })

  it('should create an entity correctly via factory method', () => {
    const exp = ExperienceEntity.create({
      id: '1',
      company: 'InnovateCorp',
      position: 'Architect',
      dateRange: new DateRange(new Date('2025-01-01'), null),
      description: ['Designed core database configurations'],
      technologies: [new Technology('C#', 'Backend')],
    })

    expect(exp.id).toBe('1')
    expect(exp.company).toBe('InnovateCorp')
    expect(exp.isCurrentJob()).toBe(true)
  })

  it('should validate company names case-insensitively', () => {
    const exp = new ExperienceEntity(mockProps)

    expect(exp.belongsToCompany('InnovateCorp')).toBe(true)
    expect(exp.belongsToCompany('innovate')).toBe(true)
    expect(exp.belongsToCompany('other')).toBe(false)
  })

  it('should validate technology inclusion', () => {
    const exp = new ExperienceEntity(mockProps)

    expect(exp.hasTechnology('C#')).toBe(true)
    expect(exp.hasTechnology('c#')).toBe(true)
    expect(exp.hasTechnology('React')).toBe(false)
  })
})
