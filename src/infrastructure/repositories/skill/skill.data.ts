import type { Skill } from '@/domain/entities/Skill.entity'

/**
 * Static mock data representing developer skills.
 */
export const SKILLS_DATA: Omit<Skill, 'id'>[] = [
  { name: 'C#', category: 'Languages', level: 90 },
  { name: 'TypeScript', category: 'Languages', level: 85 },
  { name: 'JavaScript', category: 'Languages', level: 85 },
  { name: 'SQL', category: 'Languages', level: 80 },
  { name: 'HTML & CSS', category: 'Languages', level: 80 },

  { name: '.NET Core / ASP.NET', category: 'Frameworks', level: 90 },
  { name: 'Vue.js (Vue 3)', category: 'Frameworks', level: 85 },
  { name: 'React', category: 'Frameworks', level: 70 },
  { name: 'Entity Framework Core', category: 'Frameworks', level: 85 },

  { name: 'PostgreSQL', category: 'Databases', level: 85 },
  { name: 'SQL Server', category: 'Databases', level: 80 },
  { name: 'Redis', category: 'Databases', level: 65 },

  { name: 'Docker', category: 'Tools', level: 80 },
  { name: 'Git & GitHub', category: 'Tools', level: 90 },
  { name: 'CI/CD (GitHub Actions)', category: 'Tools', level: 75 },
  { name: 'Playwright', category: 'Tools', level: 70 },
]
export default SKILLS_DATA
