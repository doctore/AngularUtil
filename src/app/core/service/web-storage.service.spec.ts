import { WebStorageService } from '@app-core/service';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/core/service/web-storage.service.spec.ts
 */
describe('WebStorageService', () => {

  let service: WebStorageService;

  // In-memory mock for localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      })
    };
  })();


  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock);
    vi.clearAllMocks();
    localStorage.clear();
    service = new WebStorageService();
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
      expect(localStorage.clear).toHaveBeenCalled();
    });

  });


  describe('delete', () => {

    it('when the key does not exist then it will not be deleted', () => {
      localStorage.setItem('key', 'value');

      const wasRemoved = service.delete('does not exist');

      expect(wasRemoved).toBe(false);
      expect(localStorage.getItem('key')).toEqual('value');
      expect(localStorage.removeItem).not.toHaveBeenCalled();
    });


    it('when the key exists then it will be removed from storage', () => {
      localStorage.setItem('key', 'value');

      const wasRemoved = service.delete('key');

      expect(wasRemoved).toBe(true);
      expect(localStorage.getItem('key')).toBeNull();
      expect(localStorage.removeItem).toHaveBeenCalledWith('key');
    });

  });



  describe('exist', () => {

    it('when the key does not exist then false is returned', () => {
      expect(service.exist('does not exist')).toBe(false);
    });


    it('when the key exists then its related value is returned', () => {
      localStorage.setItem('key', 'value');

      expect(service.exist('key')).toBe(true);
    });

  });


  describe('get', () => {

    it('when the key does not exist then null is returned', () => {
      expect(service.get('does not exist')).toBeNull();
    });


    it('when the key exists then its related value is returned', () => {
      localStorage.setItem('key', 'value');

      expect(service.get('key')).toEqual('value');
      expect(localStorage.getItem).toHaveBeenCalled();
    });

  });



  describe('set', () => {

    it('when the key/value was not stored then searching by the key null is returned', () => {
      expect(localStorage.getItem('key')).toBeNull();
    });


    it('when the key/value was stored then its related value is returned searching by its key', () => {
      service.set('key', 'value');

      expect(localStorage.setItem).toHaveBeenCalledWith('key', 'value');
      expect(localStorage.getItem('key')).toEqual('value');
    });

  });

});
