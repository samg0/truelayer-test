import React, { useState, useEffect } from "react"
import Link from 'next/link'
import { FavouriteStorageService } from "~/services/favourite-storage-service"

const FavouriteItem = ({ name }: { name: string }) => <li>
  <Link href="/pokemon/[name]" as={`/pokemon/${name}`}>
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
    <h1>Favourites</h1>
    <ul>
      { items.map(item => <FavouriteItem key={item} name={item} />) }
    </ul>
  </section>
}

export default FavouritesPage
