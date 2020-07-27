import React, { useState, useEffect } from "react"
import Link from 'next/link'
import { FavouriteStorageService } from "~/services/favourite-storage-service"
import Head from "next/head"

const FavouriteItem = ({ name }: { name: string }) => <li>
  <Link href="/pokemon/[name]" as={`/pokemon/${name}`} prefetch>
    <a>{ name }</a>
  </Link>
</li>

const FavouritesPage = () => {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    const storage = new FavouriteStorageService(localStorage)
    setItems(storage.all())
  }, [])

  return <section>
    <Head><title>Favourites</title></Head>
    <h1>Favourites</h1>
    <ul>
      { items.map(item => <FavouriteItem key={item} name={item} />) }
    </ul>
    { items.length === 0 && <p>No favourites yet!</p> }
  </section>
}

export default FavouritesPage
