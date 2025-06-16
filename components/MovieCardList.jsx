// ...existing code...
import { FlatList, StyleSheet, View } from 'react-native';
import MovieCard from './MovieCard';

const movies = [
  {
    id: '1',
    title: 'Pelicula 1 de las maravillas de batman',
    cover_image: 'https://es.web.img3.acsta.net/pictures/22/01/27/16/40/2914301.jpg',
    community_rating: 85,
    critic_rating: 90,
    year: 2022,
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Pelicula 2',
    cover_image: 'https://es.web.img3.acsta.net/pictures/22/01/27/16/40/2914301.jpg',
    community_rating: 85,
    critic_rating: 90,
    year: 2022,
    rating: 4.5,
  },
  // ...más películas...
];

const MovieCardList = () => (
  <View style={styles.container}>
    <FlatList
      data={movies}
      keyExtractor={item => item.id}
      contentContainerStyle={{ gap: 30 }}
      renderItem={({ item }) => (
        <MovieCard
            title={item.title}
            cover_image={item.cover_image}
            community_rating={item.community_rating}
            critic_rating={item.critic_rating}
            year={item.year}
            rating={item.rating}
        />
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
});

export default MovieCardList;