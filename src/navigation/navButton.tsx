import {Button} from '@mui/material'
import type {FunctionComponent, ReactNode} from 'react'
import {Link, useLocation} from 'react-router'

interface NavButtonProps {
  to: string
  label: string
  icon: ReactNode
}

const NavButton: FunctionComponent<NavButtonProps> = ({to, label, icon}) => {
  const {pathname} = useLocation()
  const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <Button
      component={Link}
      to={to}
      color="inherit"
      startIcon={icon}
      aria-current={isActive ? 'page' : undefined}
      sx={{
        borderBottom: 2,
        borderColor: isActive ? 'common.white' : 'transparent',
        borderRadius: 0,
        fontWeight: isActive ? 700 : 400,
      }}
    >
      {label}
    </Button>
  )
}

export default NavButton
