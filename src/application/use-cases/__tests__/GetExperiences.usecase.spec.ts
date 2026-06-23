import { describe, it, expect, vi } from 'vitest'
import { GetExperiencesUseCase } from '../experience/GetExperiences.usecase'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'
import { ExperienceEntity } from '@/domain/entities/Experience.entity'
import { DateRange } from '@/domain/value-objects/DateRange.vo'
import { Technology } from '@/domain/value-objects/Technology.vo'

describe('GetExperiences Use Case', () => {
  const mockExperiences = [
    ExperienceEntity.create({
      id: '1',
      company: 'Company A',
      position: 'Developer',
      dateRange: new DateRange(new Date('2024-01-01'), new Date('2024-12-31')),
      description: ['Work A'],
      technologies: [new Technology('Vue', 'Frontend')],
    }),
  ]

  it('should call repository findAll and map experiences to DTO responses', async () => {
    // Arrange: Create a mock implementation of IExperienceRepository
    const mockRepo: IExperienceRepository = {
      findAll: vi.fn().mockResolvedValue(mockExperiences),
      findById: vi.fn(),
      findByCompany: vi.fn(),
      findByTechnology: vi.fn(),
      findCurrentJob: vi.fn(),
    }

    const useCase = new GetExperiencesUseCase(mockRepo)

    // Act
    const result = await useCase.execute()

    // Assert
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1)
    expect(result).toHaveLength(1)
    expect(result[0].company).toBe('Company A')
    expect(result[0].position).toBe('Developer')
    expect(result[0].technologies[0].name).toBe('Vue')
  })
})
