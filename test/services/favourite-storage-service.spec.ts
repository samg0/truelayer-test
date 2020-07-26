import { FavouriteStorageService } from '~/services/favourite-storage-service'

const mockStore = {
  ...global.localStorage,
  getItem: jest.fn(),
  setItem: jest.fn()
}

const { STORAGE_KEY: key } = FavouriteStorageService

describe('Favourite storage service', () => {
  let service: FavouriteStorageService

  beforeEach(() => {
    jest.resetAllMocks()
    service = new FavouriteStorageService(mockStore)
  })

  describe('when local storage is blank', () => {
    describe('save', () => {
      it('saves to local storage', () => {
        service.save('foo')

        expect(mockStore.setItem).toHaveBeenCalledWith(key, '["foo"]')
      })
    })

    describe('remove', () => {
      it('removes from localstorage', () => {
        service.remove('foo')

        expect(mockStore.setItem).not.toHaveBeenCalled()
      })
    })

    describe('list', () => {
      it('returns an array of favourites', () => {
        expect(service.all()).toEqual([])
      })
    })

    describe('isSaved', () => {
      it('returns false when the favourite is not saved', () => {
        expect(service.isSaved('foo')).toEqual(false)
      })
    })
  })

  describe('when local storage is populated', () => {
    beforeEach(() => {
      mockStore.getItem.mockImplementation(() => JSON.stringify(['foo', 'bar']))
    })

    describe('save', () => {
      it('saves to localStorage', () => {
        service.save('baz')

        expect(mockStore.setItem).toHaveBeenCalledWith(key, '["foo","bar","baz"]')
      })

      it('does not save duplicates', () => {
        service.save('foo')

        expect(mockStore.setItem).not.toHaveBeenCalled()
      })
    })

    describe('remove', () => {
      it('can remove', () => {
        service.remove('foo')

        expect(mockStore.setItem).toHaveBeenCalledWith(key, '["bar"]')
      })

      it('handles removing items which are not saved', () => {
        expect(() => service.remove('baz')).not.toThrow()
      })
    })

    describe('list', () => {
      it('returns a list of favourites', () => {
        expect(service.all()).toEqual(['foo', 'bar'])
      })
    })

    describe('isSaved', () => {
      it('returns true when the favourite is saved', () => {
        expect(service.isSaved('foo')).toEqual(true)
      })
    })
  })
})
