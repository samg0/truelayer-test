import { createMocks, MockResponse } from 'node-mocks-http'
import handler from '../../pages/api/pokemon/[name]'
import { NextApiResponse } from 'next'

describe('/api/pokemon/[name]', () => {
  const name = 'charizard'
  let response: MockResponse<NextApiResponse>

  beforeEach(async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { name }
    })
    await handler(req, res)
    response = res
  })

  describe('for a valid name', () => {
    it('responds 200', async () => {
      expect(response._getStatusCode()).toBe(200)
    })

    it('has the correct name', () => {
      expect(response._getJSONData()).toHaveProperty('name', name)
    })
  })
})
