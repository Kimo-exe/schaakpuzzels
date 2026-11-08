import {Box, Container} from '@mui/material'
import type {FunctionComponent} from 'react'
import Footer from '@/components/footer.tsx'
import Navbar from '@/navigation/navbar.tsx'
import Routing from '@/navigation/routing.tsx'

const App: FunctionComponent = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Navbar />
      <Container component="main" maxWidth="lg" sx={{flexGrow: 1, py: 4}}>
        <Routing />
      </Container>
      <Footer />
    </Box>
  )
}

export default App
