// ...existing code...
import { FlatList, StyleSheet, View } from 'react-native';
import MovieCard from './Media';

const MediaCardList = ({media, onPress}) => (
  
  <View style={styles.container}>
    <FlatList
      data={media}
      keyExtractor={item => item.id}
      contentContainerStyle={{ gap: 30 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <MovieCard
            onPress={() => onPress(item)}
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
    width: '100%'
  },
});

export default MediaCardList;