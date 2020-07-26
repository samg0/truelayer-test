import React, { FC } from 'react'
import { SearchBox } from '~/components/search-box'
import { GetServerSidePropsContext } from 'next'
import Axios from 'axios'

type PokemonPageParams = { name: string }
type PokemonPageProps = { name: string, description: string }

export const getServerSideProps = async (ctx: GetServerSidePropsContext<PokemonPageParams>): Promise<{ props: PokemonPageProps } | undefined> => {
  const { params: { name } = {} } = ctx
  const showError = (code = 500, message = 'Server Error') => {
    if (!ctx.res) throw new Error(message)
    ctx.res.statusCode = code
    ctx.res.end(message)
  }

  if (!name) {
    showError(404, 'Not Found')
    return
  }

  try {
    const { data: { description } } = await Axios.get(`${process.env.API_URL}/api/pokemon/${name}`)
    if (!description) {
      showError(404, 'Not Found')
      return
    }

    return { props: { name, description } }
  } catch (e) {
    console.error(e)
    showError()
    return
  }
}

const PokemonPage: FC<PokemonPageProps> = ({ description, name }) => {
  return <>
    <header>
      <SearchBox initialQuery={name} />
    </header>
    <section>
      <h1>{ name }</h1>
      <p>{ description }</p>
    </section>
  </>
}

export default PokemonPage
