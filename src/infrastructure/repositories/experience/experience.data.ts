import type { Experience } from '@/domain/entities/Experience.entity'
import { DateRange } from '@/domain/value-objects/DateRange.vo'
import { Technology } from '@/domain/value-objects/Technology.vo'

/**
 * Static mock data representing professional work experiences.
 */
export const EXPERIENCES_DATA: Omit<Experience, 'id'>[] = [
  {
    company: 'TechSolutions Inc.',
    position: 'Lead Full Stack Developer',
    dateRange: new DateRange(new Date('2025-07-01'), null), // Current job
    description: [
      'Architected and deployed a microservice-based architecture using .NET 9 and Vue.js.',
      'Mentored a team of 5 developers, establishing best practices in SOLID, Clean Code, and CI/CD.',
      'Reduced database query times by 40% through extensive query optimization and indexing.',
    ],
    technologies: [
      new Technology('TypeScript', 'Frontend'),
      new Technology('Vue', 'Frontend'),
      new Technology('C#', 'Backend'),
      new Technology('.NET Core', 'Backend'),
      new Technology('PostgreSQL', 'Database'),
      new Technology('Docker', 'DevOps'),
    ],
    achievements: [
      'Successfully migrated a legacy monolith system to microservices with zero downtime.',
      'Introduced automated E2E testing using Playwright, increasing coverage from 0% to 80%.',
    ],
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop',
  },
  {
    company: 'BusinessWare Corp.',
    position: 'Software Engineer',
    dateRange: new DateRange(new Date('2024-09-01'), new Date('2025-06-30')),
    description: [
      'Participated in the design and development of scalable enterprise web applications.',
      'Resolved complex software defects and issues, maintaining system reliability.',
      'Collaborated with cross-functional product teams to design new feature APIs.',
    ],
    technologies: [
      new Technology('C#', 'Backend'),
      new Technology('ASP.NET Core', 'Backend'),
      new Technology('SQL Server', 'Database'),
      new Technology('React', 'Frontend'),
    ],
    achievements: [
      'Successfully implemented a new reporting dashboard that improved user engagement by 20%.',
      'Refactored legacy stored procedures to improve batch processing speed.',
    ],
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop',
  },
  {
    company: 'Digital Factory Ltd.',
    position: 'Frontend Developer',
    dateRange: new DateRange(new Date('2023-01-01'), new Date('2024-08-31')),
    description: [
      'Designed and developed pixel-perfect, responsive web interfaces using Vue 3 and CSS.',
      'Optimized web page loading speeds and accessibility scores (Lighthouse score increased to 95+).',
      'Collaborated closely with UI/UX designers to translate Figma mockups into interactive components.',
    ],
    technologies: [
      new Technology('JavaScript', 'Frontend'),
      new Technology('TypeScript', 'Frontend'),
      new Technology('Vue', 'Frontend'),
      new Technology('CSS', 'Frontend'),
      new Technology('Git', 'Other'),
    ],
    achievements: [
      'Developed a custom reusable UI component library that reduced code duplication by 35%.',
    ],
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=100&auto=format&fit=crop',
  },
]
export default EXPERIENCES_DATA
