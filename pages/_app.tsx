import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '~/components/layout'
import { GlobalStyles } from '~/styles/global'
import { NavBar } from '~/components/nav'

function MyApp ({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet" />
    </Head>
    <NavBar />
    <Layout>
      <Component {...pageProps} />
      <GlobalStyles />
    </Layout>
  </>
}

export default MyApp
