import { appConfig } from '../config/app.config'

/**
 * Interface defining standard logging operations.
 */
export interface ILoggerService {
  /**
   * Log info messages.
   * @param message - Main message to log.
   * @param context - Additional structured data context.
   */
  info(message: string, context?: Record<string, unknown>): void

  /**
   * Log warning messages.
   * @param message - Main warning message.
   * @param context - Additional structured data context.
   */
  warn(message: string, context?: Record<string, unknown>): void

  /**
   * Log error messages.
   * @param message - Error context description.
   * @param error - The actual error instance or detail.
   * @param context - Additional structured data context.
   */
  error(message: string, error?: unknown, context?: Record<string, unknown>): void
}

/**
 * Structured, environment-aware logger implementation.
 */
class LoggerService implements ILoggerService {
  private formatLog(level: 'INFO' | 'WARN' | 'ERROR', message: string, detail?: unknown, context?: Record<string, unknown>): string {
    const timestamp = new Date().toISOString()
    const parts = [`[${timestamp}] [${level}] ${message}`]
    if (detail) {
      parts.push(`Detail: ${detail instanceof Error ? detail.stack || detail.message : JSON.stringify(detail)}`)
    }
    if (context && Object.keys(context).length > 0) {
      parts.push(`Context: ${JSON.stringify(context)}`)
    }
    return parts.join(' | ')
  }

  public info(message: string, context?: Record<string, unknown>): void {
    if (appConfig.env !== 'test') {
      console.log(this.formatLog('INFO', message, undefined, context))
    }
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    if (appConfig.env !== 'test') {
      console.warn(this.formatLog('WARN', message, undefined, context))
    }
  }

  public error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    if (appConfig.env !== 'test') {
      console.error(this.formatLog('ERROR', message, error, context))
    }
  }
}

export const loggerService: ILoggerService = new LoggerService()
export default loggerService
