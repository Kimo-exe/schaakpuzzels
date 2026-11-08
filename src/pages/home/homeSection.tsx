import {Box, Typography} from '@mui/material'
import type {FunctionComponent, PropsWithChildren} from 'react'

interface HomeSectionProps extends PropsWithChildren {
  title: string
}

const HomeSection: FunctionComponent<HomeSectionProps> = ({title, children}) => {
  return (
    <Box component="section" sx={{mb: 5}}>
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

export default HomeSection
