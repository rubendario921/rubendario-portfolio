/**
 * Interface defining standard date formatting utility methods.
 */
export interface IDateFormatterService {
  /**
   * Formats a date into a Month Year format (e.g. "septiembre de 2024").
   * @param date - The date to format.
   * @param locale - BCP 47 language tag (defaults to "es-ES").
   * @returns Formatted month-year string.
   */
  formatMonthYear(date: Date, locale?: string): string

  /**
   * Formats a range of dates.
   * @param startDate - The starting date of the range.
   * @param endDate - The ending date, or null if open ended.
   * @param locale - BCP 47 language tag (defaults to "es-ES").
   * @returns Formatted date range string.
   */
  formatRange(startDate: Date, endDate: Date | null, locale?: string): string
}

/**
 * Service for localizing dates.
 */
export class DateFormatterService implements IDateFormatterService {
  public formatMonthYear(date: Date, locale: string = 'es-ES'): string {
    if (isNaN(date.getTime())) {
      return ''
    }
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long' })
  }

  public formatRange(startDate: Date, endDate: Date | null, locale: string = 'es-ES'): string {
    const startStr = this.formatMonthYear(startDate, locale)
    if (!endDate) {
      return locale.startsWith('es') ? `${startStr} - Presente` : `${startStr} - Present`
    }
    const endStr = this.formatMonthYear(endDate, locale)
    return `${startStr} - ${endStr}`
  }
}

export default DateFormatterService
