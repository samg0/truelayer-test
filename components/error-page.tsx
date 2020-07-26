import React, { FC } from "react"

export const ErrorPage: FC<{ error: string }> = ({ error }) => {
  return <p>{ `${error} 😞` }</p>
}

