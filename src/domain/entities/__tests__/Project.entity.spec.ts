import { describe, it, expect } from 'vitest'
import { ProjectEntity } from '../Project.entity'
import { Technology } from '../../value-objects/Technology.vo'

describe('Project Entity', () => {
  const mockProps = {
    id: '1',
    title: 'Clean E-Commerce API',
    description: 'A fully-featured backend REST API',
    technologies: [new Technology('C#', 'Backend'), new Technology('PostgreSQL', 'Database')],
    url: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/repo',
    featured: true,
    imageUrl: 'http://example.com/project.jpg',
  }

  it('should instantiate correctly via factory', () => {
    const project = ProjectEntity.create(mockProps)

    expect(project.id).toBe('1')
    expect(project.title).toBe('Clean E-Commerce API')
    expect(project.featured).toBe(true)
    expect(project.imageUrl).toBe('http://example.com/project.jpg')
  })

  it('should validate technology inclusion correctly', () => {
    const project = ProjectEntity.create(mockProps)

    expect(project.hasTechnology('C#')).toBe(true)
    expect(project.hasTechnology('c#')).toBe(true)
    expect(project.hasTechnology('Vue')).toBe(false)
  })

  it('should throw if validation parameters are missing', () => {
    expect(() =>
      ProjectEntity.create({
        ...mockProps,
        title: '',
      }),
    ).toThrow('Project title is required')
  })
})
