import type { Project } from '@/domain/entities/Project.entity'
import { Technology } from '@/domain/value-objects/Technology.vo'

/**
 * Static mock data representing portfolio projects.
 */
export const PROJECTS_DATA: Omit<Project, 'id'>[] = [
  {
    title: 'Clean E-Commerce API',
    description: 'A fully-featured backend REST API built using Clean Architecture, DDD, .NET 9, and PostgreSQL. Demonstrates domain-driven design principles, unit testing, and Docker containerization.',
    technologies: [
      new Technology('C#', 'Backend'),
      new Technology('.NET Core', 'Backend'),
      new Technology('PostgreSQL', 'Database'),
      new Technology('Docker', 'DevOps'),
    ],
    url: 'https://demo-ecommerce.example.com',
    githubUrl: 'https://github.com/example/clean-ecommerce-api',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop',
  },
  {
    title: 'Sleek Task Manager',
    description: 'A modern collaborative task management dashboard with drag-and-drop support, subtasks, tags, and real-time collaboration. Crafted with Vue 3, Pinia, TypeScript, and Node.js.',
    technologies: [
      new Technology('TypeScript', 'Frontend'),
      new Technology('Vue', 'Frontend'),
      new Technology('TailwindCSS', 'Frontend'),
      new Technology('Node.js', 'Backend'),
    ],
    url: 'https://demo-tasks.example.com',
    githubUrl: 'https://github.com/example/sleek-task-manager',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=600&auto=format&fit=crop',
  },
  {
    title: 'Modern Developer Portfolio',
    description: 'This current responsive single-page web app built with Vue 3, TypeScript, and Hexagonal Architecture principles. Shows clean separation of logic from framework templates.',
    technologies: [
      new Technology('TypeScript', 'Frontend'),
      new Technology('Vue', 'Frontend'),
      new Technology('CSS', 'Frontend'),
    ],
    url: 'https://portfolio.example.com',
    githubUrl: 'https://github.com/example/rubendario-portfolio',
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
  },
]
export default PROJECTS_DATA
