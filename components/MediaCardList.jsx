// ...existing code...
import { FlatList, StyleSheet, View } from 'react-native';
import MovieCard from './Media';

const MediaCardList = ({media, onPress, onEndReached}) => (
  
  <View style={styles.container}>
    <FlatList
      data={media}
      onEndReached={onEndReached}
      keyExtractor={item => item.id}
      contentContainerStyle={{ gap: 30 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <MovieCard
            onPress={() => onPress(item)}
            title={item.title}
            cover_image={item.poster_path}
            community_rating={item.user_rating}
            critic_rating={item.critic_rating}
            year={item.release_date}
            rating={item.total_rating}
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