/**
 * Storage Service
 *
 * Astrazione per localStorage con possibilità di swap verso IndexedDB
 */

/**
 * Interface per Storage Service
 */
export interface IStorageService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
  has(key: string): boolean;
  keys(): string[];
}

/**
 * Implementazione localStorage
 */
class LocalStorageService implements IStorageService {
  private readonly prefix: string = 'coachone_';

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error: unknown) {
      console.error('Storage get error', error);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (error: unknown) {
      console.error('Storage set error', error);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error: unknown) {
      console.error('Storage remove error', error);
    }
  }

  clear(): void {
    try {
      const keys = this.keys();
      keys.forEach((key: any) => this.remove(key));
    } catch (error: unknown) {
      console.error('Storage clear error', error);
    }
  }

  has(key: string): boolean {
    return localStorage.getItem(this.prefix + key) !== null;
  }

  keys(): string[] {
    const allKeys = Object.keys(localStorage);
    return allKeys
      .filter((key: any) => key.startsWith(this.prefix))
      .map((key: any) => key.replace(this.prefix, ''));
  }
}

/**
 * Singleton instance
 */
export const storageService: IStorageService = new LocalStorageService();
