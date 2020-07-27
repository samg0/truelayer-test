import styled from "@emotion/styled"

export const PokeButton = styled.button<{ primary?: boolean }>(({ primary = false }) => ({
  padding: '5px 13px',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: 0.2,
  border: 0,
  borderRadius: 3,
  color: primary ? 'white' : 'black',
  backgroundColor: primary ? '#1502ff' : '#eee',
  cursor: 'pointer'
}))
