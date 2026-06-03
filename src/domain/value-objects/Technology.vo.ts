export type TechnologyCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Mobile' | 'Other'

export class Technology {
  private static readonly VALID_CATEGORIES: TechnologyCategory[] = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Mobile',
    'Other',
  ]

  constructor(
    public readonly name: string,
    public readonly category: TechnologyCategory,
  ) {
    this.validate()
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) throw new Error('Technology name is required')
    if (!Technology.VALID_CATEGORIES.includes(this.category))
      throw new Error(`Invalid technology category: ${this.category}`)
  }

  normalize(): string {
    return this.name.trim().toLowerCase()
  }

  equals(other: Technology): boolean {
    return this.normalize() === other.normalize() && this.category === other.category
  }
}
