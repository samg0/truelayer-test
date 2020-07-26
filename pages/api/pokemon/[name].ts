import { NextApiRequest, NextApiResponse } from 'next'
import { PokeApiClient, PokeApiError } from '~/services/poke-api-client'
import { TranslationApiClient } from '~/services/translation-api-client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query
  const lang = req.headers['accept-language']

  try {
    const pokeApi = new PokeApiClient(lang)
    const pokeResult = await pokeApi.getPokemon(name.toString())
    if (!pokeResult.success || !pokeResult.description) {
      switch (pokeResult.error) {
        case PokeApiError.NotFound:
          return res.status(404).json({ error: 'Pokemon not found' })
        case PokeApiError.LanguageNotFound:
          return res.status(406).json({ error: `No description found for lang ${lang}` })
        default:
          return res.status(500).json({ error: 'Server error' })
      }
    }

    const translationClient = new TranslationApiClient()
    const translationResult = await translationClient.translate(pokeResult.description)

    if (!translationResult.success || !translationResult.text) {
      return res.status(500).json({ error: 'Server error' })
    }

    res.status(200).json({ name, description: translationResult.text })
  } catch (e) {
    console.error(e.message)
    res.status(500).json({ error: 'Server error' })
  }
}
