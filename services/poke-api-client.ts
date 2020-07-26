import Axios from 'axios'
import { PokemonSpeciesResponse } from '~/types/api/poke-api-response'
import { isAxiosError } from '~/util/error-guard'

const POKE_API_URL = 'https://pokeapi.co/api/v2/'

export enum PokeApiError {
  NotFound = 'notFound',
  LanguageNotFound = 'languageNotFound',
  ServerError = 'serverError'
}

class PokeApiResult {
  constructor (
    public error: PokeApiError | null,
    public description?: string
  ) {}

  get success () { return !this.error && this.description }
}

export class PokeApiClient {
  constructor (public lang: string = 'en') {}
  private instance = Axios.create({ baseURL: POKE_API_URL })

  async getPokemon (name: string): Promise<PokeApiResult> {
    try {
      const res = await this.instance.get<PokemonSpeciesResponse>(`/pokemon-species/${name}`)
      const description = res.data.flavor_text_entries.find(e => e.language.name === this.lang)

      if (!description) return new PokeApiResult(PokeApiError.LanguageNotFound)

      return new PokeApiResult(null, description.flavor_text)
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 404) {
        return new PokeApiResult(PokeApiError.NotFound)
      }

      return new PokeApiResult(PokeApiError.ServerError)
    }
  }
}
