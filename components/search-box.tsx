import React, { useState, useCallback, ChangeEvent, FormEvent } from "react"
import { useRouter } from 'next/router'

export const SearchBox = ({ initialQuery = '' }) => {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return
    setQuery(e.target.value)
  }, [query])

  const submit = useCallback((e: FormEvent) => {
    e.preventDefault()

    router.push('/pokemon/[name]', `/pokemon/${query.toLowerCase()}`)
  }, [query])

  return <form onSubmit={submit}>
    <label htmlFor="search-box">Pokemon Name</label>
    <input id="search-box" value={query} onChange={handleChange} />
    <button type="submit">Search</button>
  </form>
}
