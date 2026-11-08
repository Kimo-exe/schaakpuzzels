import {Grid} from '@mui/material'
import {type FunctionComponent, useContext} from 'react'
import QueryBoundary from '@/components/queryBoundary.tsx'
import {FavoritesContext} from '@/context/favoritesContext.tsx'
import {features} from '@/data/features.tsx'
import DailyPuzzle from '@/pages/home/dailyPuzzle.tsx'
import FavoritesSection from '@/pages/home/favoritesSection.tsx'
import FeatureCard from '@/pages/home/featureCard.tsx'
import HeroSection from '@/pages/home/heroSection.tsx'
import HomeSection from '@/pages/home/homeSection.tsx'

const Home: FunctionComponent = () => {
  const {favorites} = useContext(FavoritesContext)

  const featureCards = features.map(feature => (
    <Grid key={feature.title} size={{xs: 12, md: 4}}>
      <FeatureCard {...feature} />
    </Grid>
  ))

  return (
    <>
      <HeroSection />
      <HomeSection title="Puzzel van de dag">
        <QueryBoundary loadingMessage="Puzzel van de dag ophalen...">
          <DailyPuzzle />
        </QueryBoundary>
      </HomeSection>
      <HomeSection title="Wat kan je hier doen?">
        <Grid container spacing={3}>
          {featureCards}
        </Grid>
      </HomeSection>
      <HomeSection title={`Jouw favorieten (${favorites.length})`}>
        <FavoritesSection />
      </HomeSection>
    </>
  )
}

export default Home
