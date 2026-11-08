import {Box, Typography} from '@mui/material'
import type {FunctionComponent, ReactNode} from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string
  icon?: ReactNode
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({title, subtitle, icon}) => {
  return (
    <Box sx={{mb: 4}}>
      <Typography variant="h3" component="h1" sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
        {icon}
        {title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{mt: 1, maxWidth: 720}}>
        {subtitle}
      </Typography>
    </Box>
  )
}

export default PageHeader
