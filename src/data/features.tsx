import ExtensionIcon from '@mui/icons-material/Extension'
import FavoriteIcon from '@mui/icons-material/Favorite'
import QuizIcon from '@mui/icons-material/Quiz'
import type {IFeature} from '@/models/feature.ts'

export const features: IFeature[] = [
  {
    title: 'Puzzelcollectie',
    description:
      'Bouw een collectie op met de puzzel van de dag en willekeurige puzzels van Chess.com. Filter op kleur, lengte of matcombinaties.',
    to: '/puzzels',
    linkLabel: 'Naar de puzzels',
    icon: <ExtensionIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Schaakquiz',
    description: 'Test je kennis van de spelregels, de stukken en de geschiedenis van het schaken in een korte quiz.',
    to: '/quiz',
    linkLabel: 'Start de quiz',
    icon: <QuizIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Favorieten',
    description: 'Markeer puzzels met een hartje. Ze verschijnen hieronder zodat je ze later nog eens kan bekijken.',
    to: '/puzzels',
    linkLabel: 'Favorieten verzamelen',
    icon: <FavoriteIcon fontSize="large" color="error" />,
  },
]
