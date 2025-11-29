import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Nullable } from '@app-core/types';
import { Optional } from '@app-core/types/functional';
import { StringUtil } from '@app-core/util';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  static COOKIES_SEPARATOR: string = ';';

  static COOKIE_NAME_VALUE_SEPARATOR: string = '=';


  constructor(@Inject(DOCUMENT) private readonly document: Document,
              @Inject(PLATFORM_ID) private readonly platformId: Object) { }


  // TODO: code base
  //   https://github.com/stevermeister/ngx-cookie-service/blob/master/projects/ngx-cookie-service/src/lib/cookie.service.ts
  //   https://github.com/stevermeister/ngx-cookie-service/blob/master/projects/ngx-cookie-service/src/lib/cookie.service.spec.ts


  /**
   * Verifies if the provided `cookieName` exists or not in the list of Cookies managed by the browser.
   *
   * @param cookieName
   *    Cookie name
   *
   * @return `true` if `cookieName` exists, `false` otherwise
   */
  public check(cookieName: string): boolean {
    if (!this.isDocumentAccessible()) {
      return false;
    }
    cookieName = encodeURIComponent(
      cookieName
    );
    const regExp = CookieService.getCookieRegExp(
      cookieName
    );
    return regExp.test(
      this.document.cookie
    );
  }


  /**
   * Gets the Cookie's value related with provided `cookieName`.
   *
   * @param cookieName
   *    Cookie name
   *
   * @returns Cookie's value if `cookieName` exists, `null` otherwise
   */
  public get(cookieName: string): Nullable<string> {
    if (this.check(cookieName)) {
      const encodedName = encodeURIComponent(
        cookieName
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
   * @returns all the Cookies in an array of tuples
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
   * Gets an {@link Optional} containing the Cookie's value related with provided `cookieName`.
   *
   * @param cookieName
   *    Cookie name
   *
   * @return {@link Optional} containing the Cookie's value related with provided `cookieName`,
   *         {@link Optional#empty} otherwise.
   */
  public getOptional(cookieName: string): Optional<string> {
    return Optional.ofNullable(
      this.get(
        cookieName
      )
    );
  }


  /**
   * Gets Cookie Regular Expression ({@link RegExp})
   *
   * @param cookieName
   *    Cookie name
   *
   * @return property {@link RegExp}
   */
  private static getCookieRegExp(cookieName: string): RegExp {
    const escapedName: string = cookieName.replace(
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

}
