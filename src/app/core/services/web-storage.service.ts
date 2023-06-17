import { Injectable } from '@angular/core';
import { Nullable } from '@app-core/types';

/**
 * Utility to help manage storage in the browser.
 */
@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  constructor() {}


  /**
   * Removes all key/value pairs, if there are any.
   */
  clear = (): void =>
    localStorage.clear();


  /**
   *    Removes the given `key` from the browser's storage if it exists. If there is no item associated with the
   * given `key`, this method will do nothing.
   *
   * @param key
   *    {@link String} containing the name of the key you want to remove
   *
   * @return `true` if the `key` exists in the browser's storage and was removed,
   *         `false` otherwise
   */
  delete = (key: string): boolean => {
    if (this.exist(key)) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  }


  /**
   * Verifies if there is an item in the browser's storage related with provided `key`.
   *
   * @param key
   *    {@link String} containing the name of the key you want to search
   *
   * @return `true` if the `key` exists in the browser's storage,
   *         `false` otherwise
   */
  exist = (key: string): boolean =>
    null !== this.get(key);


  /**
   * Returns the given `key`'s value, or `null` if the `key` does not exist, in the browser's storage.
   *
   * @param key
   *    {@link String} containing the name of the key you want to retrieve the value of
   *
   * @return {@link String} containing the value of the `key`,
   *         `null` otherwise.
   */
  get = (key: string): Nullable<string> =>
    localStorage.getItem(key);


  /**
   *    Saves the given pair `key` / `value` in the browser's storage. If the `key` already exists, its value
   * will be updated with provided one.
   *
   * @param key
   *    {@link String} containing the name of the key you want to create/update
   * @param value
   *    {@link String} containing the value you want to give the key you are creating/updating
   */
  set = (key: string,
         value: string): void =>
    localStorage.setItem(
      key,
      value
    );

}
