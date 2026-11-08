import {Box, Container, Link, Typography} from '@mui/material'
import type {FunctionComponent} from 'react'

const Footer: FunctionComponent = () => {
  return (
    <Box component="footer" sx={{py: 3, mt: 6, borderTop: 1, borderColor: 'divider'}}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          Puzzels aangeboden door{' '}
          <Link href="https://www.chess.com/news/view/published-data-api" target="_blank" rel="noreferrer">
            de Chess.com Published-Data API
          </Link>
          . Zet &amp; Mat is een schoolproject en niet verbonden aan Chess.com.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
