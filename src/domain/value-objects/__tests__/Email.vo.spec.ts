import { describe, it, expect } from 'vitest'
import { Email } from '../Email.vo'

describe('Email Value Object', () => {
  it('should accept valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name+tag@domain.co.uk',
      'a@b.co',
    ]

    validEmails.forEach((emailStr) => {
      const email = new Email(emailStr)
      expect(email.getValue()).toBe(emailStr)
    })
  })

  it('should reject invalid email addresses', () => {
    const invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@domain.com',
      'Joe Smith <email@domain.com>',
      'email.domain.com',
      'email@domain@domain.com',
    ]

    invalidEmails.forEach((emailStr) => {
      expect(() => new Email(emailStr)).toThrow('Invalid email format')
    })
  })

  it('should support equals comparison', () => {
    const email1 = new Email('test@domain.com')
    const email2 = new Email('test@domain.com')
    const email3 = new Email('other@domain.com')

    expect(email1.equals(email2)).toBe(true)
    expect(email1.equals(email3)).toBe(false)
  })
})
