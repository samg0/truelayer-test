/* eslint-disable @typescript-eslint/camelcase */
import { mockInstance } from '~/__mocks__/axios'
import { PokeApiClient, PokeApiError } from '~/services/poke-api-client'
import { PokemonSpeciesResponse } from '~/types/api/poke-api-response'
import { DeepPartial } from 'utility-types'
import { AxiosResponse, AxiosError } from 'axios'

const name = 'charizard'
const description = 'something like a dragon'
const mockResponse: DeepPartial<AxiosResponse<PokemonSpeciesResponse>> = {
  data: {
    flavor_text_entries: [
      { flavor_text: description, language: { name: 'en' } }
    ]
  }
}

describe('PokeApiClient', () => {
  let client: PokeApiClient

  beforeEach(() => {
    client = new PokeApiClient()
  })

  describe('when lang is not set', () => {
    it('sets the language to english by default', () => {
      expect(client.lang).toEqual('en')
    })
  })

  describe('when lang is set', () => {
    beforeEach(() => {
      mockInstance.get.mockResolvedValue(mockResponse)
      client = new PokeApiClient('en')
    })

    describe('and lang is found', () => {
      it('returns the correct description', async () => {
        const result = await client.getPokemon(name)
        expect(result).toMatchObject({
          error: null,
          description
        })
      })
    })

    describe('and lang is not found', () => {
      beforeEach(() => {
        client = new PokeApiClient('de')
      })

      it('returns a lang not found error', async () => {
        const result = await client.getPokemon(name)
        expect(result).toMatchObject({
          error: PokeApiError.LanguageNotFound,
          description: undefined
        })
      })
    })

    describe('when pokemon is not found', () => {
      beforeEach(() => {
        const response: DeepPartial<AxiosError> = { response: { status: 404 }, isAxiosError: true }
        mockInstance.get.mockRejectedValue(response)
      })

      it('returns a not found error', async () => {
        const result = await client.getPokemon(name)
        expect(result).toMatchObject({
          error: PokeApiError.NotFound,
          description: undefined
        })
      })
    })

    describe('when pokemon API responds with an unrecognised error', () => {
      beforeEach(() => {
        const response: DeepPartial<AxiosError> = { response: { status: 500 }, isAxiosError: true }
        mockInstance.get.mockRejectedValue(response)
      })

      it('returns a server error', async () => {
        const result = await client.getPokemon(name)
        expect(result).toMatchObject({
          error: PokeApiError.ServerError,
          description: undefined
        })
      })
    })
  })
})
