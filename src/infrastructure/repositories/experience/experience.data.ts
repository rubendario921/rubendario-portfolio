import type { Experience } from '@/domain/entities/Experience.entity'
import { DateRange } from '@/domain/value-objects/DateRange.vo'
import { Technology } from '@/domain/value-objects/Technology.vo'

export const EXPERIENCES_DATA: Omit<Experience, 'id'>[] = [
  {
    company: 'BusinessWare Corp.',
    position: 'Software Engineer',
    dateRange: new DateRange(new Date('2024-09-01'), new Date('2025-06-30')),
    description: [
      'Participated in the design and development of web applications.',
      'Analyze and resolve software defects and issues.',
      'Collaborate with cross-functional teams to deliver high-quality software solutions.',
    ],
    technologies: [
      new Technology('C#', 'Backend'),
      new Technology('Asp.NET', 'Frontend'),
      new Technology('SQL', 'Database'),
    ],
    achievements: [
      'Successfully implemented a new feature that improved user engagement by 20%.',
      'Implementing Microservices with .NET 8 to Improve Scalability.',
    ],
    companyLogo: 'https://example.com/logos/businessware.png',
  },
]
