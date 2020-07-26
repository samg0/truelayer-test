import React, { useState, useCallback, ChangeEvent, FormEvent } from "react"
import { useRouter } from 'next/router'
import { PokeButton } from "./button"
import styled from "@emotion/styled"

const StyledForm = styled.form({
  display: 'flex',
  alignItems: 'flex-end',
  backgroundColor: '#eee',
  padding: 10,
  borderRadius: 3
})

const SearchBarWrapper = styled.fieldset({
  border: 0,
  padding: 0,
  flexGrow: 1,
  position: 'relative',
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'stretch',
  label: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: 0.2
  },
  input: {
    border: 0,
    borderRadius: 3,
    padding: 5,
    marginLeft: 0
  }
})

export const SearchBox = ({ initialQuery = '' }) => {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value || '')
  }, [query])

  const submit = useCallback((e: FormEvent) => {
    e.preventDefault()

    router.push('/pokemon/[name]', `/pokemon/${query.toLowerCase()}`)
  }, [query])

  return <StyledForm onSubmit={submit}>
    <SearchBarWrapper>
      <label htmlFor="search-box">Pokemon Name</label>
      <input id="search-box" value={query} onChange={handleChange} placeholder="Search..." />
    </SearchBarWrapper>
    <PokeButton primary type="submit">Search</PokeButton>
  </StyledForm>
}
