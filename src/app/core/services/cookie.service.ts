import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Nullable } from '@app-core/types';
import { Optional } from '@app-core/types/functional';
import { StringUtil } from '@app-core/util';
import { CookieOptions, SameSite } from '@app-core/models';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  static COOKIES_SEPARATOR: string = ';';

  static COOKIE_NAME_VALUE_SEPARATOR: string = '=';


  constructor(@Inject(DOCUMENT) private readonly document: Document,
              @Inject(PLATFORM_ID) private readonly platformId: Object) { }


  /**
   * Verifies if the provided `name` exists or not in the list of Cookies managed by the browser.
   *
   * @param name
   *    Cookie name
   *
   * @return `true` if `name` exists, `false` otherwise
   */
  public check(name: string): boolean {
    if (!this.isDocumentAccessible()) {
      return false;
    }
    name = encodeURIComponent(
      name
    );
    const regExp = CookieService.getCookieRegExp(
      name
    );
    return regExp.test(
      this.document.cookie
    );
  }


  /**
   * Deletes a Cookie by name at given path and domain.
   *
   * @param name
   *    Cookie name
   * @param path
   *    Cookie path
   * @param domain
   *    Cookie domain
   * @param secure
   *    Cookie secure
   * @param sameSite
   *    Cookie SameSite
   *
   * @return `true` if there were no errors when removing the Cookie, `false` otherwise
   */
  delete(name: string,
         path?: string,
         domain?: string,
         secure?: boolean,
         sameSite: SameSite = 'Lax'): boolean {
    if (!this.isDocumentAccessible()) {
      return false;
    }
    const expiresDate = new Date('Thu, 01 Jan 1970 00:00:01 GMT');
    const cookiesOptions = CookieOptions.of(
      expiresDate,
      path,
      domain,
      secure,
      sameSite
    );
    return this.set(
      name,
      '',
      cookiesOptions
    );
  }


  /**
   * Gets the Cookie's value related with provided `name`.
   *
   * @param name
   *    Cookie name
   *
   * @return Cookie's value if `name` exists, `null` otherwise
   */
  public get(name: string): Nullable<string> {
    if (this.check(name)) {
      const encodedName = encodeURIComponent(
        name
      );
      const regExp = CookieService.getCookieRegExp(
        encodedName
      );
      const result = regExp.exec(
        this.document.cookie
      );
      return result?.[1]
        ? CookieService.safeDecodeURIComponent(
          result[1]
        )
        : null;
    }
    return null;
  }


  /**
   * Returns all cookies in an array of tuples with two elements:
   * <p>
   *    <ul>
   *      <li>Cookie name</li>
   *      <li>Cookie value</li>
   *    </ul>
   * <p>
   * @return all the Cookies in an array of tuples
   */
  getAll(): [string, string][] {
    if (!this.isDocumentAccessible()) {
      return [];
    }
    const cookies: [string, string][] = [];
    const document: Document = this.document;
    if (!StringUtil.isBlank(document.cookie)) {
      document.cookie.split(CookieService.COOKIES_SEPARATOR).forEach((currentCookie: string) => {
        const [cookieName, cookieValue] = currentCookie.split(
          CookieService.COOKIE_NAME_VALUE_SEPARATOR
        );
        cookies.push([
          CookieService.safeDecodeURIComponent(cookieName.replace(/^ /, '')),
          CookieService.safeDecodeURIComponent(cookieValue)
        ]);
      });
    }
    return cookies;
  }


  /**
   * Gets an {@link Optional} containing the Cookie's value related with provided `name`.
   *
   * @param name
   *    Cookie name
   *
   * @return {@link Optional} containing the Cookie's value related with provided `name`,
   *         {@link Optional#empty} otherwise.
   */
  public getOptional(name: string): Optional<string> {
    return Optional.ofNullable(
      this.get(
        name
      )
    );
  }


  /**
   * Sets a Cookie using provided information.
   *
   * @param name
   *    Cookie name
   * @param value
   *    Cookie value
   * @param options
   *    {@link CookieOptions} for the new Cookie
   *
   * @return `true` if there were no errors when setting the Cookie, `false` otherwise
   */
  public set(name: string,
             value: string,
             options?: CookieOptions): boolean {
    if (!this.isDocumentAccessible()) {
      return false;
    }
    let cookieString: string = encodeURIComponent(name) +
      CookieService.COOKIE_NAME_VALUE_SEPARATOR +
      encodeURIComponent(value) +
      CookieService.COOKIES_SEPARATOR;

    if (options?.expires) {
      let finalExpires: Date;
      if (typeof options.expires === 'number') {
        finalExpires = new Date(
          new Date().getTime() + options.expires * 1000 * 60    // options.expires minutes in the future
        );
      } else {
        finalExpires = options.expires;
      }
      cookieString += this.createCookieOption(
        'expires',
        finalExpires.toUTCString()
      );
    }
    if (options?.path) {
      cookieString += this.createCookieOption(
        'path',
        options.path
      );
    }
    if (options?.domain) {
      cookieString += this.createCookieOption(
        'domain',
        options.domain
      );
    }
    if (false === options?.secure && 'None' === options?.sameSite) {
      options.secure = true;
      console.warn(
        `Cookie ${name} was forced with secure flag because sameSite=None.`
      );
    }
    if (options?.secure) {
      cookieString += 'secure' +
        CookieService.COOKIES_SEPARATOR;
    }
    let finalSameSite = 'Lax';
    if (options?.sameSite) {
      finalSameSite = options.sameSite;
    }
    cookieString += this.createCookieOption(
      'sameSite',
      finalSameSite
    );
    if (options?.partitioned) {
      cookieString += 'Partitioned' +
        CookieService.COOKIES_SEPARATOR;
    }
    this.document.cookie = cookieString;
    return true;
  }


  /**
   * Gets Cookie Regular Expression ({@link RegExp})
   *
   * @param name
   *    Cookie name
   *
   * @return property {@link RegExp}
   */
  private static getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(
      /([[\]{}()|=;+?,.*^$\\])/gi,
      '\\$1'
    );
    return new RegExp(
      '(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)',
      'g'
    );
  }


  /**
   * Gets the decoded version of an encoded component of a Uniform Resource Identifier (URI).
   *
   * @param encodedURIComponent
   *    Value representing an encoded URI component.
   *
   * @return decoded version of an encoded component of a Uniform Resource Identifier (URI).
   */
  private static safeDecodeURIComponent(encodedURIComponent: string): string {
    try {
      return decodeURIComponent(
        encodedURIComponent
      );

    } catch {
      // Probably it is not uri encoded, return as is
      return encodedURIComponent;
    }
  }


  /**
   * Verifies if the {@link Document} object of the HTML DOM is accessible or not.
   *
   * @return `true` if {@link Document} object is accessible, `false` otherwise
   */
  private isDocumentAccessible(): boolean {
    return isPlatformBrowser(
      this.platformId
    );
  }


  /**
   * Returns the final {@link String} containing an option to add to a Cookie.
   *
   * @param option
   *    Identifier of the Cookie option
   * @param value
   *    Value of the Cookie option
   *
   * @return {@link String} with the Cookie option
   */
  private createCookieOption(option: string,
                             value: string): string {
    return option +
      CookieService.COOKIE_NAME_VALUE_SEPARATOR +
      value +
      CookieService.COOKIES_SEPARATOR;
  }

}
