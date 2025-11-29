import { DOCUMENT, ɵPLATFORM_BROWSER_ID, ɵPLATFORM_SERVER_ID } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { CookieService } from '@app-core/services';

/**
 * To launch only this test:
 *
 *    ng test --include src/app/core/services/cookie.service.spec.ts
 */
describe('CookieService', () => {

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
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=123');

        expect(service.check('NotFound')).toEqual(false);
      });


      it('when the Cookie exists then true is returned', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=123');

        expect(service.check('foo')).toEqual(true);
      });


      it('when the Cookie exists then only checks for names not for values', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('c1=123; c2=456');

        expect(service.check('c1')).toEqual(true);
        expect(service.check('c2')).toEqual(true);
        expect(service.check('123')).toEqual(false);
        expect(service.check('456')).toEqual(false);
      });


      it('when the name of the Cookie is encoded then searching by decoded name returns true', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('%3B%2C%2F%3F%3A%40%26%3D%2B%24=exists;');

        expect(service.check(';,/?:@&=+$')).toEqual(true);
      });

    });



    describe('get', () => {

      it('when the Cookie does not exist then null is returned', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=123');

        expect(service.get('NotFound')).toBeNull();
      });


      it('when the Cookie exists then its value is returned', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=123');

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
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue(cookieString);

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
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=%E0%A4%A');

        expect(service.get('foo')).toEqual('%E0%A4%A');
      });

    });



    describe('getAll', () => {

      it('when there are no Cookies then empty array is returned', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('');

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
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue(cookieString);

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
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=123');

        expect(service.getOptional('NotFound').isPresent()).toBeFalse();
      });


      it('when the Cookie exists then an Optional containing its value is returned', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=123');

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
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue(cookieString);

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
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=%E0%A4%A');

        const result = service.getOptional('foo');

        expect(result.isPresent()).toBeTrue();
        expect(result.get()).toEqual('%E0%A4%A');
      });

    });

  });




  describe('Platform server', () => {

    beforeAll(() => {
      platformId = ɵPLATFORM_SERVER_ID;
    });


    describe('check', () => {

      it('then always return false', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('c1=123; c2=456');

        expect(service.check('c1')).toEqual(false);
        expect(service.check('c2')).toEqual(false);
      });

    });



    describe('get', () => {

      it('then always return null', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=123');

        expect(service.get('foo')).toBeNull();
      });

    });



    describe('getAll', () => {

      it('then always return empty array', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=123');

        expect(service.getAll()).toEqual([]);
      });

    });



    describe('getOptional', () => {

      it('then always return empty Optional', () => {
        spyOnProperty(mockDocument, 'cookie', 'get').and.returnValue('foo=123');

        expect(service.getOptional('foo').isPresent()).toBeFalse();
      });

    });

  });

});
