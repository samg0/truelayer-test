import { createMocks } from 'node-mocks-http'
import handler from '~/pages/api/pokemon/[name]'

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
    const description = 'Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally.'

    it('successfully returns name and description', async () => {
      const response = await makeRequest(name)
      expect(response._getStatusCode()).toBe(200)
      expect(response._getJSONData()).toHaveProperty('name', name)
      expect(response._getJSONData()).toHaveProperty('description', description)
    })

    describe('with a different language', () => {
      const germanDescription = 'Wenn dieses pokémon einen strahl glühenden feuers speit,  leuchtet seine schwanzspitze auf.'

      it('has the correct description', async () => {
        const response = await makeRequest(name, { 'accept-language': 'de' })
        expect(response._getJSONData()).toHaveProperty('description', germanDescription)
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
