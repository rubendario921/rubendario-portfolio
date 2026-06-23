/**
 * Collection of helper functions for string manipulation and matching.
 */
export const StringUtils = {
  /**
   * Slugify a given text.
   * @param text - Input text.
   * @returns Slugified text.
   */
  slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  },

  /**
   * Safe check if text contains target string (case insensitive and normalized).
   * @param source - The text to search in.
   * @param target - The text to search for.
   * @returns True if matched.
   */
  includesIgnoreCase(source: string, target: string): boolean {
    if (!source || !target) return false
    const srcNorm = source
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    const tgtNorm = target
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    return srcNorm.includes(tgtNorm)
  },
}
