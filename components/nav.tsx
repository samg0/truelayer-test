import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import Link from 'next/link'

const StyledLink = styled.a({
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: 0.1,
  textDecoration: 'none',
  marginRight: 20
})

const StyledNav = styled.nav({
  textAlign: 'center',
  marginTop: 20
})

const NavLink = ({ href, label }: { href: string, label: string }) => {
  const router = useRouter()
  const active = useMemo(() => router.pathname === href, [router])

  return <Link href={href}>
    <StyledLink style={{ fontWeight: active ? 'bold' : 'normal' }}>
      { label }
    </StyledLink>
  </Link>
}

const navItems = { Home: '/', Favourites: '/favourites' }

export const NavBar = () => <StyledNav>
  { Object.entries(navItems).map(([label, href]) => (
    <NavLink key={href} href={href} label={label} />
  ))}
</StyledNav>
