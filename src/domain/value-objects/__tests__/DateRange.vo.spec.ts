import { describe, it, expect } from 'vitest'
import { DateRange } from '../DateRange.vo'

describe('DateRange Value Object', () => {
  it('should create a valid date range', () => {
    const start = new Date('2024-01-01')
    const end = new Date('2024-12-31')
    const range = new DateRange(start, end)

    expect(range.startDate).toBe(start)
    expect(range.endDate).toBe(end)
    expect(range.isOpenEnded()).toBe(false)
    expect(range.isValid()).toBe(true)
  })

  it('should create an open-ended date range', () => {
    const start = new Date('2024-01-01')
    const range = new DateRange(start, null)

    expect(range.startDate).toBe(start)
    expect(range.endDate).toBeNull()
    expect(range.isOpenEnded()).toBe(true)
    expect(range.isValid()).toBe(true)
  })

  it('should throw if start date is invalid', () => {
    expect(() => new DateRange(new Date('invalid-date'), null)).toThrow('Invalid start date')
  })

  it('should throw if end date is invalid', () => {
    expect(() => new DateRange(new Date(), new Date('invalid-date'))).toThrow('Invalid end date')
  })

  it('should throw if start date is after end date', () => {
    const start = new Date('2024-12-31')
    const end = new Date('2024-01-01')
    expect(() => new DateRange(start, end)).toThrow('Start date cannot be after end date')
  })

  it('should format dates properly (locale month names)', () => {
    // Use local date constructor (year, month-1, day) to avoid UTC timezone drift
    const start = new Date(2024, 8, 1)  // September 2024
    const end = new Date(2025, 5, 30)   // June 2025
    const range = new DateRange(start, end)

    const formattedStart = range.formatStartDate('es-ES')
    const formattedEnd = range.formatEndDate('es-ES')

    // Verify month name is present in some form (locale may vary by environment)
    expect(formattedStart).toMatch(/sept(iembre)?/i)
    expect(formattedEnd).toMatch(/jun(io)?/i)
  })

  it('should calculate duration correctly', () => {
    const start = new Date('2024-01-01')
    const end = new Date('2025-03-01')
    const range = new DateRange(start, end)

    expect(range.getDuration()).toBe('1 year 2 months')
  })
})
