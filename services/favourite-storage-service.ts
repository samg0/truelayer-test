export class FavouriteStorageService {
  static STORAGE_KEY = 'pokemon-favouites'

  constructor (private store: Storage) {}

  all (): string[] {
    const all = this.store.getItem(FavouriteStorageService.STORAGE_KEY)
    if (!all) return []

    return JSON.parse(all)
  }

  save (name: string) {
    const all = this.all()
    if (all.indexOf(name) > -1) return

    all.push(name)
    this.saveAll(all)
  }

  remove (name: string) {
    const all = this.all()
    const index = all.indexOf(name)

    if (index < 0) return

    all.splice(index, 1)
    this.saveAll(all)
  }

  isSaved (name: string) {
    return this.all().indexOf(name) > -1
  }

  private saveAll (all: string[]) {
    this.store.setItem(FavouriteStorageService.STORAGE_KEY, JSON.stringify(all))
  }
}
