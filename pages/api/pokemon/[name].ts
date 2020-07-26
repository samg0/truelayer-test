import { NextApiRequest, NextApiResponse } from 'next'
import { PokeApiClient, PokeApiError } from '~/services/poke-api-client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query
  const lang = req.headers['accept-language']

  const pokeApi = new PokeApiClient(lang)
  try {
    const pokeResult = await pokeApi.getPokemon(name.toString())
    if (!pokeResult.success) {
      switch (pokeResult.error) {
        case PokeApiError.NotFound:
          return res.status(404).json({ error: 'Pokemon not found' })
        case PokeApiError.LanguageNotFound:
          return res.status(406).json({ error: `No description found for lang ${lang}` })
        default:
          return res.status(500).json({ error: 'Server error' })
      }
    }

    res.status(200).json({ name, rawDescription: pokeResult.description })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
}
