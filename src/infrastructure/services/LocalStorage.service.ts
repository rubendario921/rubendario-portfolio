import { loggerService } from './Logger.service'

/**
 * Interface representing standard key-value storage operations.
 */
export interface IStorageService {
  /**
   * Retrieves an item from storage.
   * @param key - The key of the item to retrieve.
   * @returns The parsed item, or null if not found or invalid.
   */
  get<T>(key: string): T | null

  /**
   * Saves an item to storage.
   * @param key - The storage key.
   * @param value - The item to save.
   */
  set<T>(key: string, value: T): void

  /**
   * Removes an item from storage.
   * @param key - The storage key to remove.
   */
  remove(key: string): void

  /**
   * Clears all storage contents.
   */
  clear(): void
}

/**
 * Safe concrete implementation of IStorageService utilizing window.localStorage.
 */
export class LocalStorageService implements IStorageService {
  public get<T>(key: string): T | null {
    try {
      if (typeof window === 'undefined') return null
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : null
    } catch (error) {
      loggerService.error(`Failed to get item from LocalStorage for key: "${key}"`, error)
      return null
    }
  }

  public set<T>(key: string, value: T): void {
    try {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      loggerService.error(`Failed to set item in LocalStorage for key: "${key}"`, error)
    }
  }

  public remove(key: string): void {
    try {
      if (typeof window === 'undefined') return
      window.localStorage.removeItem(key)
    } catch (error) {
      loggerService.error(`Failed to remove item from LocalStorage for key: "${key}"`, error)
    }
  }

  public clear(): void {
    try {
      if (typeof window === 'undefined') return
      window.localStorage.clear()
    } catch (error) {
      loggerService.error('Failed to clear LocalStorage', error)
    }
  }
}

export default LocalStorageService
