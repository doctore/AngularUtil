import { DOCUMENT, ɵPLATFORM_BROWSER_ID, ɵPLATFORM_SERVER_ID } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { CookieService } from '@app-core/services';
import { CookieOptions } from '@app-core/models';

/**
 * To launch only this test:
 *
 *    ng test --include src/app/core/services/cookie.service.spec.ts
 */
describe('CookieService', () => {

  let mockDocumentCookieGet: jasmine.Spy<(this:Document) => string>;
  let mockDocumentCookieSet: jasmine.Spy<(this:Document) => string>;
  const mockDocument: Document = document;
  let platformId: Object;
  let service: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useFactory: () => platformId },
        { provide: DOCUMENT, useFactory: () => mockDocument }
      ]
    });
    mockDocumentCookieGet = spyOnProperty(mockDocument, 'cookie', 'get');
    mockDocumentCookieSet = spyOnProperty(mockDocument, 'cookie', 'set');
    service = new CookieService(mockDocument, platformId);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });




  describe('Platform browser', () => {

    beforeAll(() => {
      platformId = ɵPLATFORM_BROWSER_ID;
    });


    describe('check', () => {

      it('when the Cookie does not exist then false is returned', () => {
        mockDocumentCookieGet.and.returnValue('foo=123');

        expect(service.check('NotFound')).toEqual(false);
      });


      it('when the Cookie exists then true is returned', () => {
        mockDocumentCookieGet.and.returnValue('foo=123');

        expect(service.check('foo')).toEqual(true);
      });


      it('when the Cookie exists then only checks for names not for values', () => {
        mockDocumentCookieGet.and.returnValue('c1=123; c2=456');

        expect(service.check('c1')).toEqual(true);
        expect(service.check('c2')).toEqual(true);
        expect(service.check('123')).toEqual(false);
        expect(service.check('456')).toEqual(false);
      });


      it('when the name of the Cookie is encoded then searching by decoded name returns true', () => {
        mockDocumentCookieGet.and.returnValue('%3B%2C%2F%3F%3A%40%26%3D%2B%24=exists;');

        expect(service.check(';,/?:@&=+$')).toEqual(true);
      });

    });



    describe('delete', () => {

      it('when invoked then the related Cookie is updated with empty as value and initial epoch time as expires value', () => {
        const expiresDate = new Date('Thu, 01 Jan 1970 00:00:01 GMT');
        const cookieOptions = CookieOptions.of(
          expiresDate,
          '/test',
          'example.com',
          true,
          'Lax'
        )

        const result = service.delete('foo', cookieOptions.path, cookieOptions.domain, cookieOptions.secure, cookieOptions.sameSite);

        expect(result).toBeTrue();
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('foo=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/test;domain=example.com;secure;sameSite=Lax;');
      });

    });



    describe('get', () => {

      it('when the Cookie does not exist then null is returned', () => {
        mockDocumentCookieGet.and.returnValue('foo=123');

        expect(service.get('NotFound')).toBeNull();
      });


      it('when the Cookie exists then its value is returned', () => {
        mockDocumentCookieGet.and.returnValue('foo=123');

        expect(service.get('foo')).toEqual('123');
      });


      it('when the Cookie exists and their values are encoded then their decoded values are returned', () => {
        const cookieString = [
          '%3B%2C%2F%3F%3A%40%26%3D%2B%24=%3B%2C%2F%3F%3A%40%26%3D%2B%24',
          '-H%40ll%C3%B6_%20W%C3%B6rld-=-H%40ll%C3%B6_%20W%C3%B6rld-',
          '%24uper%5ETEST(123)=%24uper%5ETEST(123)',
          'F()!!()%2Fbar=F()!!()%2Fbar',
          '*F.)%2Fo(o*=*F.)%2Fo(o*',
          '-O_o%7B1%2C2%7D=-O_o%7B1%2C2%7D',
          'B%3Far%7CFo%2Bo=B%3Far%7CFo%2Bo',
          'Hello%3DWorld%3B=Hello%3DWorld%3B',
          '%5Bfoo-_*.%5Dbar=%5Bfoo-_*.%5Dbar',
        ].join('; ');
        mockDocumentCookieGet.and.returnValue(cookieString);

        expect(service.get(';,/?:@&=+$')).toEqual(';,/?:@&=+$');
        expect(service.get('-H@llö_ Wörld-')).toEqual('-H@llö_ Wörld-');
        expect(service.get('$uper^TEST(123)')).toEqual('$uper^TEST(123)');
        expect(service.get('F()!!()/bar')).toEqual('F()!!()/bar');
        expect(service.get('*F.)/o(o*')).toEqual('*F.)/o(o*');
        expect(service.get('-O_o{1,2}')).toEqual('-O_o{1,2}');
        expect(service.get('B?ar|Fo+o')).toEqual('B?ar|Fo+o');
        expect(service.get('Hello=World;')).toEqual('Hello=World;');
        expect(service.get('[foo-_*.]bar')).toEqual('[foo-_*.]bar');
      });


      it('when the Cookie exists but decoding its value fails then original value is returned', () => {
        mockDocumentCookieGet.and.returnValue('foo=%E0%A4%A');

        expect(service.get('foo')).toEqual('%E0%A4%A');
      });

    });



    describe('getAll', () => {

      it('when there are no Cookies then empty array is returned', () => {
        mockDocumentCookieGet.and.returnValue('');

        expect(service.getAll()).toEqual([]);
      });


      it('when there are Cookies then an array ot tuples containing decoded cookie names and values is returned', () => {
        const cookieString = [
          '%3B%2C%2F%3F%3A%40%26%3D%2B%24=%3B%2C%2F%3F%3A%40%26%3D%2B%24',
          '%E0%A4%A=%E0%A4%A',
          '-H%40ll%C3%B6_%20W%C3%B6rld-=-H%40ll%C3%B6_%20W%C3%B6rld-',
          '%24uper%5ETEST(123)=%24uper%5ETEST(123)',
          'F()!!()%2Fbar=F()!!()%2Fbar',
          '*F.)%2Fo(o*=*F.)%2Fo(o*',
          '-O_o%7B1%2C2%7D=-O_o%7B1%2C2%7D',
          'B%3Far%7CFo%2Bo=B%3Far%7CFo%2Bo',
          'Hello%3DWorld%3B=Hello%3DWorld%3B',
          '%5Bfoo-_*.%5Dbar=%5Bfoo-_*.%5Dbar',
        ].join('; ');
        mockDocumentCookieGet.and.returnValue(cookieString);

        expect(service.getAll()).toEqual([
          [';,/?:@&=+$', ';,/?:@&=+$'],
          ['%E0%A4%A', '%E0%A4%A'],
          ['-H@llö_ Wörld-', '-H@llö_ Wörld-'],
          ['$uper^TEST(123)', '$uper^TEST(123)'],
          ['F()!!()/bar', 'F()!!()/bar'],
          ['*F.)/o(o*', '*F.)/o(o*'],
          ['-O_o{1,2}', '-O_o{1,2}'],
          ['B?ar|Fo+o', 'B?ar|Fo+o'],
          ['Hello=World;', 'Hello=World;'],
          ['[foo-_*.]bar', '[foo-_*.]bar']
        ]);

      });

    });



    describe('getOptional', () => {

      it('when the Cookie does not exist then empty Optional is returned', () => {
        mockDocumentCookieGet.and.returnValue('foo=123');

        expect(service.getOptional('NotFound').isPresent()).toBeFalse();
      });


      it('when the Cookie exists then an Optional containing its value is returned', () => {
        mockDocumentCookieGet.and.returnValue('foo=123');

        const result = service.getOptional('foo');

        expect(result.isPresent()).toBeTrue();
        expect(result.get()).toEqual('123');
      });


      it('when the Cookie exists and their values are encoded then their decoded values inside an Optional are returned', () => {
        const cookieString = [
          '%3B%2C%2F%3F%3A%40%26%3D%2B%24=%3B%2C%2F%3F%3A%40%26%3D%2B%24',
          '-H%40ll%C3%B6_%20W%C3%B6rld-=-H%40ll%C3%B6_%20W%C3%B6rld-',
          '%24uper%5ETEST(123)=%24uper%5ETEST(123)',
          'F()!!()%2Fbar=F()!!()%2Fbar',
          '*F.)%2Fo(o*=*F.)%2Fo(o*',
          '-O_o%7B1%2C2%7D=-O_o%7B1%2C2%7D',
          'B%3Far%7CFo%2Bo=B%3Far%7CFo%2Bo',
          'Hello%3DWorld%3B=Hello%3DWorld%3B',
          '%5Bfoo-_*.%5Dbar=%5Bfoo-_*.%5Dbar',
        ].join('; ');
        mockDocumentCookieGet.and.returnValue(cookieString);

        expect(service.getOptional(';,/?:@&=+$').get()).toEqual(';,/?:@&=+$');
        expect(service.getOptional('-H@llö_ Wörld-').get()).toEqual('-H@llö_ Wörld-');
        expect(service.getOptional('$uper^TEST(123)').get()).toEqual('$uper^TEST(123)');
        expect(service.getOptional('F()!!()/bar').get()).toEqual('F()!!()/bar');
        expect(service.getOptional('*F.)/o(o*').get()).toEqual('*F.)/o(o*');
        expect(service.getOptional('-O_o{1,2}').get()).toEqual('-O_o{1,2}');
        expect(service.getOptional('B?ar|Fo+o').get()).toEqual('B?ar|Fo+o');
        expect(service.getOptional('Hello=World;').get()).toEqual('Hello=World;');
        expect(service.getOptional('[foo-_*.]bar').get()).toEqual('[foo-_*.]bar');
      });


      it('when the Cookie exists but decoding its value fails then original value inside an Optional is returned', () => {
        mockDocumentCookieGet.and.returnValue('foo=%E0%A4%A');

        const result = service.getOptional('foo');

        expect(result.isPresent()).toBeTrue();
        expect(result.get()).toEqual('%E0%A4%A');
      });

    });



    describe('set', () => {

      it('when only name and value are provided then default options are used for the new Cookie', () => {
        const result = service.set('foo', '123');

        expect(result).toBeTrue();

        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('foo=123;sameSite=Lax;');
      });


      it('when name/value with special characters are provided then encoded name/value with default options are used for the new Cookie', () => {
        expect(service.set('-H@llö_ Wörld-', '-H@llö_ Wörld-')).toBeTrue();
        expect(service.set(';,/?:@&=+$', ';,/?:@&=+$')).toBeTrue();
        expect(service.set('-H@llö_ Wörld-', '-H@llö_ Wörld-')).toBeTrue();
        expect(service.set('$uper^TEST(123)', '$uper^TEST(123)')).toBeTrue();
        expect(service.set('F()!!()/bar', 'F()!!()/bar')).toBeTrue();
        expect(service.set('*F.)/o(o*', '*F.)/o(o*')).toBeTrue();
        expect(service.set('-O_o{1,2}', '-O_o{1,2}')).toBeTrue();
        expect(service.set('B?ar|Fo+o', 'B?ar|Fo+o')).toBeTrue();
        expect(service.set('Hello=World;', 'Hello=World;')).toBeTrue();
        expect(service.set('[foo-_*.]bar', '[foo-_*.]bar')).toBeTrue();

        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('%3B%2C%2F%3F%3A%40%26%3D%2B%24=%3B%2C%2F%3F%3A%40%26%3D%2B%24;sameSite=Lax;');
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('-H%40ll%C3%B6_%20W%C3%B6rld-=-H%40ll%C3%B6_%20W%C3%B6rld-;sameSite=Lax;');
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('%24uper%5ETEST(123)=%24uper%5ETEST(123);sameSite=Lax;');
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('F()!!()%2Fbar=F()!!()%2Fbar;sameSite=Lax;');
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('*F.)%2Fo(o*=*F.)%2Fo(o*;sameSite=Lax;');
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('-O_o%7B1%2C2%7D=-O_o%7B1%2C2%7D;sameSite=Lax;');
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('B%3Far%7CFo%2Bo=B%3Far%7CFo%2Bo;sameSite=Lax;');
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('Hello%3DWorld%3B=Hello%3DWorld%3B;sameSite=Lax;');
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('%5Bfoo-_*.%5Dbar=%5Bfoo-_*.%5Dbar;sameSite=Lax;');
      });


      it('when expires option is provided as a number then the Cookie will expire in the given minutes', () => {
        const cookieOptions: CookieOptions = CookieOptions.of(
          10
        );
        jasmine.clock().mockDate(new Date('Sun, 15 Mar 2020 10:00:00 GMT'));

        const result = service.set('foo', '123', cookieOptions);

        expect(result).toBeTrue();
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('foo=123;expires=Sun, 15 Mar 2020 10:10:00 GMT;sameSite=Lax;');
      });


      it('when expires option is provided as a Date then the Cookie will expire in the given value', () => {
        const cookieOptions: CookieOptions = CookieOptions.of(
          new Date('Mon, 15 Mar 2021 10:00:00 GMT')
        );

        const result = service.set('foo', '123', cookieOptions);

        expect(result).toBeTrue();
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('foo=123;expires=Mon, 15 Mar 2021 10:00:00 GMT;sameSite=Lax;');
      });


      it('when path option is provided then the Cookie will include it as an option', () => {
        const cookieOptions: CookieOptions = CookieOptions.of(
          undefined,
          '/test'
        );

        const result = service.set('foo', '123', cookieOptions);

        expect(result).toBeTrue();
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('foo=123;path=/test;sameSite=Lax;');
      });


      it('when domain option is provided then the Cookie will include it as an option', () => {
        const cookieOptions: CookieOptions = CookieOptions.of(
          undefined,
          undefined,
          'example.com'
        );

        const result = service.set('foo', '123', cookieOptions);

        expect(result).toBeTrue();
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('foo=123;domain=example.com;sameSite=Lax;');
      });


      it('when secure option is provided then the Cookie will include it as an option', () => {
        const cookieOptions: CookieOptions = CookieOptions.of(
          undefined,
          undefined,
          undefined,
          true
        );

        const result = service.set('foo', '123', cookieOptions);

        expect(result).toBeTrue();
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('foo=123;secure;sameSite=Lax;');
      });


      it('when secure option is false but sameSite is None then the Cookie will be forced to be secure', () => {
        const cookieOptions: CookieOptions = CookieOptions.of(
          undefined,
          undefined,
          undefined,
          false,
          'None'
        );

        const result = service.set('foo', '123', cookieOptions);

        expect(result).toBeTrue();
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('foo=123;secure;sameSite=None;');
      });


      it('when sameSite option is provided then the Cookie will include it as an option', () => {
        const cookieOptions: CookieOptions = CookieOptions.of(
          undefined,
          undefined,
          undefined,
          undefined,
          'Strict'
        );

        const result = service.set('foo', '123', cookieOptions);

        expect(result).toBeTrue();
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('foo=123;sameSite=Strict;');
      });


      it('when all the options are provided then the Cookie will include them', () => {
        const cookieOptions: CookieOptions = CookieOptions.of(
          new Date('Mon, 15 Mar 2021 10:00:00 GMT'),
          '/test',
          'example.com',
          true,
          'Strict'
        );

        const result = service.set('foo', '123', cookieOptions);

        expect(result).toBeTrue();
        // @ts-ignore
        expect(mockDocumentCookieSet).toHaveBeenCalledWith('foo=123;expires=Mon, 15 Mar 2021 10:00:00 GMT;path=/test;domain=example.com;secure;sameSite=Strict;');
      });

    });

  });




  describe('Platform server', () => {

    beforeAll(() => {
      platformId = ɵPLATFORM_SERVER_ID;
    });


    describe('check', () => {

      it('then always return false', () => {
        mockDocumentCookieGet.and.returnValue('c1=123; c2=456');

        expect(service.check('c1')).toEqual(false);
        expect(service.check('c2')).toEqual(false);
      });

    });



    describe('delete', () => {

      it('then always return false', () => {
        expect(service.delete('foo')).toBeFalse();
        expect(mockDocumentCookieSet).not.toHaveBeenCalled();
      });

    });



    describe('get', () => {

      it('then always return null', () => {
        mockDocumentCookieGet.and.returnValue('foo=123');

        expect(service.get('foo')).toBeNull();
      });

    });



    describe('getAll', () => {

      it('then always return empty array', () => {
        mockDocumentCookieGet.and.returnValue('foo=123');

        expect(service.getAll()).toEqual([]);
      });

    });



    describe('getOptional', () => {

      it('then always return empty Optional', () => {
        mockDocumentCookieGet.and.returnValue('foo=123');

        expect(service.getOptional('foo').isPresent()).toBeFalse();
      });

    });



    describe('set', () => {

      it('then always return false', () => {
        expect(service.set('foo', '123')).toBeFalse();
        expect(mockDocumentCookieSet).not.toHaveBeenCalled();
      });

    });

  });

});
