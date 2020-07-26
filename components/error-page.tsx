import React, { FC } from "react"
import Head from 'next/head'
import { SearchBox } from "./search-box"

export const ErrorPage: FC<{ error: string }> = ({ error }) => {
  return <>
    <Head><title>Something went wrong</title></Head>
    <SearchBox />
    <p>{ `${error} 😞` }</p>
  </>
}

