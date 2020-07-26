import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SearchBox } from '~/components/search-box'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()
useRouter.mockImplementation(() => ({ push }))

describe('Search Box', () => {
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
})
