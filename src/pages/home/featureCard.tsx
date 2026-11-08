import {Button, Card, CardActions, CardContent, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'
import {Link} from 'react-router'
import type {IFeature} from '@/models/feature.ts'

const FeatureCard: FunctionComponent<IFeature> = ({title, description, to, linkLabel, icon}) => {
  return (
    <Card variant="outlined" sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <CardContent sx={{flexGrow: 1}}>
        {icon}
        <Typography variant="h6" component="h3" sx={{mt: 1}}>
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={to}>
          {linkLabel}
        </Button>
      </CardActions>
    </Card>
  )
}

export default FeatureCard
