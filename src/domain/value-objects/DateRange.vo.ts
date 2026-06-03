export class DateRange {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date | null,
  ) {
    this.validate()
  }

  private validate(): void {
    if (isNaN(this.startDate.getTime())) throw new Error('Invalid start date')
    if (this.endDate && isNaN(this.endDate.getTime())) throw new Error('Invalid end date')
    if (this.endDate && this.startDate > this.endDate)
      throw new Error('Start date cannot be after end date')
  }

  isOpenEnded(): boolean {
    return this.endDate === null
  }

  getDuration(): string {
    const end = this.endDate ? this.endDate : new Date()
    const diffMonths =
      (end.getFullYear() - this.startDate.getFullYear()) * 12 +
      (end.getMonth() - this.startDate.getMonth())

    if (diffMonths < 12) {
      return `${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`
    }
    const years = Math.floor(diffMonths / 12)
    const months = diffMonths % 12

    const yearText = `${years} ${years === 1 ? 'año' : 'años'}`
    const monthText = months > 0 ? ` ${months} ${months === 1 ? 'mes' : 'meses'}` : ''

    return yearText + monthText
  }

  formatStartDate(locale: string = 'es-ES'): string {
    return this.startDate.toLocaleDateString(locale, { year: 'numeric', month: 'long' })
  }

  formatEndDate(locale: string = 'es-ES'): string {
    if (this.isOpenEnded()) return 'Current'
    return this.endDate!.toLocaleDateString(locale, { year: 'numeric', month: 'long' })
  }

  isValid(): boolean {
    try {
      this.validate()
      return true
    } catch {
      return false
    }
  }
}
