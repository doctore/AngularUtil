import { OrUndefined } from '@app-core/types';

export type SameSite = 'Lax' | 'None' | 'Strict';


export class CookieOptions {

  private _expires?: number | Date;    // When it is a number, its value is in minutes
  private _path?: string;
  private _domain?: string;
  private _secure?: boolean;
  private _sameSite?: SameSite;
  private _partitioned?: boolean;


  private constructor(expires: OrUndefined<number | Date>,
                      path: OrUndefined<string>,
                      domain: OrUndefined<string>,
                      secure: OrUndefined<boolean>,
                      sameSite: OrUndefined<SameSite>,
                      partitioned: OrUndefined<boolean>) {
    this._expires = expires;
    this._path = path;
    this._domain = domain;
    this._secure = secure;
    this._sameSite = sameSite;
    this._partitioned = partitioned;
  }


  static of(expires?: number | Date,
            path?: string,
            domain?: string,
            secure?: boolean,
            sameSite?: SameSite,
            partitioned?: boolean): CookieOptions {
    return new CookieOptions(
      expires,
      path,
      domain,
      secure,
      sameSite,
      partitioned
    );
  }


  get expires(): OrUndefined<number | Date> {
    return this._expires;
  }
  set expires(expires: OrUndefined<number | Date>) {
    this._expires = expires;
  }

  get path(): OrUndefined<string> {
    return this._path;
  }
  set path(path: OrUndefined<string>) {
    this._path = path;
  }

  get domain(): OrUndefined<string> {
    return this._domain;
  }
  set domain(domain: OrUndefined<string>) {
    this._domain = domain;
  }

  get secure(): OrUndefined<boolean> {
    return this._secure;
  }
  set secure(secure: OrUndefined<boolean>) {
    this._secure = secure;
  }

  get sameSite(): OrUndefined<SameSite> {
    return this._sameSite;
  }
  set sameSite(sameSite: OrUndefined<SameSite>) {
    this._sameSite = sameSite;
  }

  get partitioned(): OrUndefined<boolean> {
    return this._partitioned;
  }
  set partitioned(partitioned: OrUndefined<boolean>) {
    this._partitioned = partitioned;
  }

}
