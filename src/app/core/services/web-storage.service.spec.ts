import { TestBed } from '@angular/core/testing';
import { WebStorageService } from '@app-core/services';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/services/web-storage.service.spec.ts
 */
describe('WebStorageService', () => {

  let service: WebStorageService;


  beforeEach(() => {
    const mockLocalStorage = buildMockLocalStorage();

    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);

    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);

    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);

    TestBed.configureTestingModule({});
    service = TestBed.inject(WebStorageService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  describe('clear', () => {

    it('when the cache is cleared then no one item is stored on it', () => {
      localStorage.setItem('key', 'value');
      expect(localStorage.getItem('key')).toEqual('value');

      service.clear();
      expect(localStorage.getItem('key')).toBeNull();
    });

  });



  describe('delete', () => {

    it('when the key does not exist then it will not be deleted', () => {
      localStorage.setItem('key', 'value');

      service.delete('does not exist');

      expect(localStorage.getItem('key')).toEqual('value');
    });


    it('when the key exists then it will be removed from storage', () => {
      localStorage.setItem('key', 'value');

      service.delete('key');

      expect(localStorage.getItem('key')).toBeNull();
    });

  });



  describe('exist', () => {

    it('when the key does not exist then false is returned', () => {
      expect(service.exist('does not exist')).toBeFalse();
    });


    it('when the key exists then its related value is returned', () => {
      localStorage.setItem('key', 'value');

      expect(service.exist('key')).toBeTrue();
    });

  });



  describe('get', () => {

    it('when the key does not exist then null is returned', () => {
      expect(service.get('does not exist')).toBeNull();
    });


    it('when the key exists then its related value is returned', () => {
      localStorage.setItem('key', 'value');

      expect(service.get('key')).toEqual('value');
    });

  });



  describe('set', () => {

    it('when the key/value was not stored then searching by the key null is returned', () => {
      expect(localStorage.getItem('key')).toBeNull();
    });


    it('when the key/value was stored then its related value is returned searching by its key', () => {
      service.set('key', 'value');

      expect(localStorage.getItem('key')).toEqual('value');
    });

  });


  function buildMockLocalStorage() {
    let store: any = {};
    return {
      clear: () => {
        store = {};
      },
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };
  }

});
