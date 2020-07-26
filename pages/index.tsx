import React from 'react'
import { SearchBox } from '~/components/search-box'
import Head from 'next/head'

const IndexPage = () => <header>
  <Head><title>Pokemon Home</title></Head>
  <SearchBox />
</header>

export default IndexPage
