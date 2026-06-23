/**
 * Set of helper utilities for date handling.
 */
export const DateUtils = {
  /**
   * Safe parsing of date string/Date.
   * @param value - Date representation.
   * @returns Date instance or null if invalid.
   */
  parseDate(value: string | Date | number): Date | null {
    const d = new Date(value)
    return isNaN(d.getTime()) ? null : d
  },

  /**
   * Calculates the difference in months between two dates.
   * @param start - Start date.
   * @param end - End date.
   * @returns The difference in months.
   */
  differenceInMonths(start: Date, end: Date): number {
    return (
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth())
    )
  },
}
