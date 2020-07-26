import React, { FC, useEffect, useCallback, useState } from 'react'
import Head from 'next/head'
import { SearchBox } from '~/components/search-box'
import { GetServerSidePropsContext } from 'next'
import Axios from 'axios'
import { FavouriteStorageService } from '~/services/favourite-storage-service'
import { ErrorPage } from '~/components/error-page'
import { PokeButton } from '~/components/button'
import { isAxiosError } from '~/util/error-guard'

type PokemonPageParams = { name: string }
type PokemonPageProps = { name: string, description: string, error?: undefined } | { name?: undefined, description?: undefined, error: string }

const apiUrl = process.env.API_URL || 'http://localhost:3000'

export const getServerSideProps = async (ctx: GetServerSidePropsContext<PokemonPageParams>): Promise<{ props: PokemonPageProps } | undefined> => {
  const { params: { name } = {} } = ctx
  const showError = (code = 500, message = 'Server Error') => {
    ctx.res.statusCode = code
    return { props: { error: message } }
  }

  if (!name) return showError(404, 'Not Found')

  try {
    const { data: { description } } = await Axios.get(`${apiUrl}/api/pokemon/${name}`)

    return { props: { name, description } }
  } catch (e) {
    console.error('Client: ', e.message)
    if (isAxiosError(e) && e.response?.status === 404) return showError(404, `Pokemon ${name} Not Found`)
    return showError()
  }
}

const ValidPokemonPage: FC<{ name: string, description: string }> = ({ name, description }) => {
  const [isSaved, updateSaved] = useState(false)

  useEffect(() => {
    const store = new FavouriteStorageService(localStorage)
    updateSaved(store.isSaved(name))
  }, [name])

  const toggleSaved = useCallback(() => {
    const store = new FavouriteStorageService(localStorage)
    if (isSaved) store.remove(name)
    else store.save(name)

    updateSaved(!isSaved)
  }, [name, isSaved])

  return <>
    <Head><title>{ name }</title></Head>
    <header>
      <SearchBox initialQuery={name} />
    </header>
    <section>
      <h1>{ name }</h1>
      <p>{ description }</p>
      <PokeButton onClick={ toggleSaved }>
        { isSaved ? 'Remove from favourites' : 'Add to favourites' }
      </PokeButton>
    </section>
  </>
}

const PokemonPage: FC<PokemonPageProps> = ({ name, description, error }) => {
  if (error || !name || !description) return <ErrorPage error={error || 'Server Error'} />

  return <ValidPokemonPage name={name} description={description} />
}

export default PokemonPage
