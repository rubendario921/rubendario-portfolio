/**
 * Interface representing the application configuration.
 */
export interface IAppConfig {
  /**
   * The title of the portfolio application.
   */
  readonly title: string

  /**
   * The current running environment (development, production, or test).
   */
  readonly env: 'development' | 'production' | 'test'
}

/**
 * Implementation of IAppConfig that reads and validates configuration from the environment.
 */
class AppConfig implements IAppConfig {
  public readonly title: string
  public readonly env: 'development' | 'production' | 'test'

  /**
   * Constructs the AppConfig and validates env values.
   * @throws {Error} If a required environment variable is missing or invalid.
   */
  constructor() {
    this.title = this.getEnvVariable('VITE_APP_TITLE', 'Rubén Darío - Portfolio')
    const environment = this.getEnvVariable('VITE_ENV', 'development')

    if (environment !== 'development' && environment !== 'production' && environment !== 'test') {
      throw new Error(`Invalid environment value for VITE_ENV: "${environment}". Expected "development", "production", or "test".`)
    }
    this.env = environment
  }

  /**
   * Safe getter for environment variables with optional fallback.
   * @param key - The name of the environment variable.
   * @param defaultValue - Fallback value if environment variable is not defined.
   * @returns The environment variable value.
   * @throws {Error} if variable is missing and no default is provided.
   */
  private getEnvVariable(key: string, defaultValue?: string): string {
    const value = import.meta.env[key]
    if (value === undefined || value === null || value === '') {
      if (defaultValue !== undefined) {
        return defaultValue
      }
      throw new Error(`Environment validation error: Required variable "${key}" is not set.`)
    }
    return String(value)
  }
}

export const appConfig: IAppConfig = new AppConfig()
export default appConfig
