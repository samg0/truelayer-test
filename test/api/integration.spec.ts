import { createMocks, MockResponse } from 'node-mocks-http'
import handler from '~/pages/api/pokemon/[name]'
import { NextApiResponse } from 'next'

jest.unmock('axios')

describe('/api/pokemon/[name]', () => {
  const makeRequest = async (name: string, headers: { [key: string]: string } = {}) => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { name },
      headers
    })
    await handler(req, res)
    return res
  }

  describe('for a valid name', () => {
    const name = 'charizard'
    const description = 'Spits fire that\nis hot enough to\nmelt boulders.\fKnown to cause\nforest fires\nunintentionally.'

    it('successfully returns name and description', async () => {
      const response = await makeRequest(name)
      expect(response._getStatusCode()).toBe(200)
      expect(response._getJSONData()).toHaveProperty('name', name)
      expect(response._getJSONData()).toHaveProperty('rawDescription', description)
    })

    describe('with a different language', () => {
      const germanDescription = 'Wenn dieses Pokémon einen Strahl glühenden\nFeuers speit, leuchtet seine Schwanzspitze auf.'

      it('has the correct description', async () => {
        const response = await makeRequest(name, { 'accept-language': 'de' })
        expect(response._getJSONData()).toHaveProperty('rawDescription', germanDescription)
      })

      describe('but the lang is not found', () => {
        it('returns a 406 error code', async () => {
          const response = await makeRequest(name, { 'accept-language': 'foo' })
          expect(response._getStatusCode()).toBe(406)
        })
      })
    })
  })

  describe('for an invalid name', () => {
    it('returns a 404 error code', async () => {
      const response = await makeRequest('foo')
      expect(response._getStatusCode()).toBe(404)
    })
  })
})
