import Axios from 'axios'
import { TranslationResponse } from '~/types/api/translation-api-response'

const TRANSLATION_API_URL = 'https://api.funtranslations.com/translate/shakespeare'

export enum TranslationApiError {
  ServerError = 'serverError'
}

class TranslationApiResult {
  constructor (
    public error: TranslationApiError | null,
    public text?: string
  ) {}

  get success () { return !this.error && this.text }
}

export class TranslationApiClient {
  constructor (public lang: string = 'en') {}
  private instance = Axios.create({ baseURL: TRANSLATION_API_URL })

  async translate (text: string): Promise<TranslationApiResult> {
    // the API is rated limited, allow skipping
    // translation during testing
    if (process.env.SKIP_TRANSLATION) return new TranslationApiResult(null, text)

    try {
      const res = await this.instance.post<TranslationResponse>('/', { text })
      const { translated } = res.data.contents

      if (translated) return new TranslationApiResult(null, translated)

      return new TranslationApiResult(TranslationApiError.ServerError)
    } catch (e) {
      return new TranslationApiResult(TranslationApiError.ServerError)
    }
  }
}

