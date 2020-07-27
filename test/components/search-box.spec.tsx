import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SearchBox } from '~/components/search-box'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()
useRouter.mockImplementation(() => ({ push }))

describe('Search Box', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('searches for a pokemon', () => {
    const { getByLabelText, getByText } = render(<SearchBox />)
    const input = getByLabelText('Pokemon Name')
    fireEvent.input(input, { target: { value: 'charizard' } })

    const btn = getByText('Search')
    fireEvent.click(btn)

    expect(push).toHaveBeenCalledWith('/pokemon/[name]', '/pokemon/charizard')
  })

  it('uses an existing query if provided', () => {
    const { getByLabelText } = render(<SearchBox initialQuery='foo' />)

    const input = getByLabelText('Pokemon Name')

    expect(input).toHaveValue('foo')
  })

  it('can handle submitting an empty search box', () => {
    const { getByText } = render(<SearchBox />)
    const btn = getByText('Search')

    btn.click()
    expect(push).not.toHaveBeenCalled()
  })

  it('it shows a loading message', () => {
    const { getByText, rerender } = render(<SearchBox initialQuery={'foo'} />)
    const btn = getByText('Search')

    btn.click()
    expect(btn).toHaveTextContent('Loading...')

    // Initial query will change when route changes
    rerender(<SearchBox initialQuery={'bar'} />)

    expect(btn).toHaveTextContent('Search')
  })
})
