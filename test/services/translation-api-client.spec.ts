/* eslint-disable @typescript-eslint/camelcase */
import { mockInstance } from '~/__mocks__/axios'
import { DeepPartial } from 'utility-types'
import { AxiosResponse, AxiosError } from 'axios'
import { TranslationResponse } from '~/types/api/translation-api-response'
import { TranslationApiClient, TranslationApiError } from '~/services/translation-api-client'

const text = 'hello world'
const translated = 'Valorous morrow to thee,  sir ordinary'
const mockResponse: DeepPartial<AxiosResponse<TranslationResponse>> = {
  data: {
    contents: { translated }
  }
}

describe('TranslationApiClient', () => {
  let client: TranslationApiClient

  beforeEach(() => {
    client = new TranslationApiClient()
  })

  describe('when the translation is successful', () => {
    beforeEach(() => {
      mockInstance.post.mockResolvedValue(mockResponse)
      client = new TranslationApiClient()
    })

    it('returns the correct text', async () => {
      const result = await client.translate(text)
      expect(result).toMatchObject({
        error: null,
        text: translated
      })
    })

    describe('but the response cannot be found', () => {
      beforeEach(() => {
        const response: DeepPartial<AxiosResponse> = { data: { contents: {} } }
        mockInstance.post.mockResolvedValue(response)
      })

      it('returns a server error', async () => {
        const result = await client.translate(text)
        expect(result).toMatchObject({
          error: TranslationApiError.ServerError,
          text: undefined
        })
      })
    })
  })

  describe('when translation API responds with an unrecognised error', () => {
    beforeEach(() => {
      const response: DeepPartial<AxiosError> = { response: { status: 500 }, isAxiosError: true }
      mockInstance.post.mockRejectedValue(response)
    })

    it('returns a server error', async () => {
      const result = await client.translate(text)
      expect(result).toMatchObject({
        error: TranslationApiError.ServerError,
        text: undefined
      })
    })
  })
})
