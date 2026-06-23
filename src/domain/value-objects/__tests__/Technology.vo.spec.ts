import { describe, it, expect } from 'vitest'
import { Technology } from '../Technology.vo'

describe('Technology Value Object', () => {
  it('should construct with valid parameters', () => {
    const tech = new Technology('Vue 3', 'Frontend')

    expect(tech.name).toBe('Vue 3')
    expect(tech.category).toBe('Frontend')
  })

  it('should throw if name is empty', () => {
    expect(() => new Technology('', 'Frontend')).toThrow('Technology name is required')
    expect(() => new Technology('   ', 'Frontend')).toThrow('Technology name is required')
  })

  it('should compare technology equality case-insensitively (name + category must match)', () => {
    const tech1 = new Technology('React', 'Frontend')
    const tech2 = new Technology('react', 'Frontend')
    const tech3 = new Technology('Angular', 'Frontend')
    const tech4 = new Technology('React', 'Backend')

    expect(tech1.equals(tech2)).toBe(true)
    expect(tech1.equals(tech3)).toBe(false)
    // Different category means not equal
    expect(tech1.equals(tech4)).toBe(false)
  })
})
