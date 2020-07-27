import * as React from 'react'
import { Global } from '@emotion/react'

export const GlobalStyles = () => (
  <Global
    styles={{
      'html, body': {
        fontFamily: `'Open Sans', sans-serif`,
        background: '#eee'
      },
      a: {
        color: 'black'
      }
    }}
  />
)
