export class Email {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  constructor(private readonly value: string) {
    if (!Email.isValid(value)) throw new Error('Invalid email format')
  }

  static isValid(email: string): boolean {
    return Email.EMAIL_REGEX.test(email)
  }

  getValue(): string {
    return this.value
  }

  getDomain(): string | undefined {
    return this.value.split('@')[1]
  }

  equals(other: Email): boolean {
    return this.value.toLowerCase().includes(other.value.toLowerCase())
  }
}
