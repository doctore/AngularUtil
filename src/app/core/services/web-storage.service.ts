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
   *    Removes the given {@code key} from the browser's storage if it exists. If there is no item associated with the
   * given {@code key}, this method will do nothing.
   *
   * @param key
   *    {@link String} containing the name of the key you want to remove
   *
   * @return {@code true} if the {@code key} exists in the browser's storage and was removed,
   *         {@code false} otherwise
   */
  delete = (key: string): boolean => {
    if (this.exist(key)) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  }


  /**
   * Verifies if there is an item in the browser's storage related with provided {@code key}.
   *
   * @param key
   *    {@link String} containing the name of the key you want to search
   *
   * @return {@code true} if the {@code key} exists in the browser's storage,
   *         {@code false} otherwise
   */
  exist = (key: string): boolean =>
    null !== this.get(key);


  /**
   * Returns the given {@code key}'s value, or {@code null} if the {@code key} does not exist, in the browser's storage.
   *
   * @param key
   *    {@link String} containing the name of the key you want to retrieve the value of
   *
   * @return {@link String} containing the value of the {@code key}. If the {@code key} does not exist, {@code null} is returned.
   */
  get = (key: string): Nullable<string> =>
    localStorage.getItem(key);


  /**
   *    Saves the given pair {@code key} / {@code value} in the browser's storage. If the {@code key} already exists, its
   * value will be updated with provided one.
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
