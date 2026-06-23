import { describe, it, expect, vi } from 'vitest'
import { GetProjectsUseCase } from '../project/GetProjects.usecase'
import type { IProjectRepository } from '@/domain/interfaces/IProjectRepository.interface'
import { ProjectEntity } from '@/domain/entities/Project.entity'
import { Technology } from '@/domain/value-objects/Technology.vo'

describe('GetProjects Use Case', () => {
  const mockProjects = [
    ProjectEntity.create({
      id: '1',
      title: 'E-Commerce',
      description: 'API',
      featured: true,
      technologies: [new Technology('C#', 'Backend')],
    }),
    ProjectEntity.create({
      id: '2',
      title: 'Task Manager',
      description: 'App',
      featured: false,
      technologies: [new Technology('Vue', 'Frontend')],
    }),
  ]

  it('should fetch all projects when no filters are set', async () => {
    const mockRepo: IProjectRepository = {
      findAll: vi.fn().mockResolvedValue(mockProjects),
      findById: vi.fn(),
      findFeatured: vi.fn(),
      findByTechnology: vi.fn(),
    }

    const useCase = new GetProjectsUseCase(mockRepo)
    const result = await useCase.execute()

    expect(mockRepo.findAll).toHaveBeenCalledTimes(1)
    expect(result).toHaveLength(2)
  })

  it('should filter projects by featured flag', async () => {
    const mockRepo: IProjectRepository = {
      findAll: vi.fn().mockResolvedValue(mockProjects),
      findById: vi.fn(),
      findFeatured: vi.fn(),
      findByTechnology: vi.fn(),
    }

    const useCase = new GetProjectsUseCase(mockRepo)
    const result = await useCase.execute({ featured: true })

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('should filter projects by technology', async () => {
    const mockRepo: IProjectRepository = {
      findAll: vi.fn().mockResolvedValue(mockProjects),
      findById: vi.fn(),
      findFeatured: vi.fn(),
      findByTechnology: vi.fn(),
    }

    const useCase = new GetProjectsUseCase(mockRepo)
    const result = await useCase.execute({ technology: 'Vue' })

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })
})
