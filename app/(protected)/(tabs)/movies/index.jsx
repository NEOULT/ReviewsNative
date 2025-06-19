
import { StyleSheet, View } from 'react-native';

import MediaScreen from '../../../../components/common/MediaScreen';

const rawMovies = [
  {
    id: '1',
    cover_image: 'https://es.web.img3.acsta.net/pictures/22/01/27/16/40/2914301.jpg',
    title: 'Película de Ejemplo',
    year: 2024,
    duration: '2h 10m',
    genres: ['Acción', 'Aventura'],
    description: 'Una emocionante película de acción y aventura.',
    cast: ['Actor Uno', 'Actriz Dos', 'Actor Tres'],
    rating: 87,
    critic_rating: 92,
    community_rating: 85,
    comments: {
    community: [
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },
      { user: 'alguienConUnNombre2', text: 'Es una película increíblemente espectacular.', daysAgo: 2 },

    ],
    critics: [
      { user: 'críticoPro', text: 'Técnicamente impresionante.', daysAgo: 3 },

    ]
  }
  },
  {
    id: '2',
    cover_image: 'https://es.web.img3.acsta.net/pictures/22/01/27/16/40/2914301.jpg',
    title: 'Comedia Romántica',
    year: 2023,
    duration: '1h 45m',
    genres: ['Comedia', 'Romance'],
    description: 'Una divertida y encantadora comedia romántica.',
    cast: ['Actor Cuatro', 'Actriz Cinco'],
    rating: 74,
    critic_rating: 70,
    community_rating: 78,
  },
  {
    id: '3',
    cover_image: 'https://es.web.img3.acsta.net/pictures/22/01/27/16/40/2914301.jpg',
    title: 'El Misterio del Bosque',
    year: 2022,
    duration: '2h 5m',
    genres: ['Misterio', 'Thriller'],
    description: 'Un grupo de amigos se adentra en un bosque lleno de secretos y peligros inesperados.',
    cast: ['Laura Pérez', 'Carlos Gómez', 'Ana Torres'],
    rating: 65,
    critic_rating: 60,
    community_rating: 68,
  },
  {
    id: '4',
    cover_image: 'https://es.web.img3.acsta.net/pictures/22/01/27/16/40/2914301.jpg',
    title: 'Sueños de Futuro',
    year: 2025,
    duration: '2h 20m',
    genres: ['Ciencia Ficción', 'Drama'],
    description: 'En un mundo futurista, una joven lucha por cambiar el destino de la humanidad.',
    cast: ['Miguel Ruiz', 'Sofía Martínez', 'Pedro López'],
    rating: 91,
    critic_rating: 95,
    community_rating: 89,
  },
  // ...más películas...
];

const MovieScreen = () => {
  
  return (
    <View style={styles.container}>
      <MediaScreen data={rawMovies} title={'Movies'} route={'movies'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1B28',
  },
});

export default MovieScreen;
