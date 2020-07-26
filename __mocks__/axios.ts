export const mockInstance = {
  get: jest.fn(),
  post: jest.fn()
}

export default {
  create: () => mockInstance
}
