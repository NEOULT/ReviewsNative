import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MediaCardList from '../../components/MediaCardList';
import MediaHeader from '../MediaHeader';

const MovieScreen = ({data, route, title}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedSort, setSelectedSort] = useState('Rating');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredMedia, setFilteredMedia] = useState(data);
  const router = useRouter();

  const handleOnPress = (media) => {
  
    router.navigate({
        pathname: `/${route}/${media.id}`,
        params: { media: JSON.stringify(media) },
        });
 }

  useEffect(() => {
    let media = [...data];

    // Filtro por búsqueda
    if (searchText) {
      media = media.filter((m) =>
        m.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtro por categoría
    if (selectedCategory) {
      media = media.filter((m) => m.category === selectedCategory);
    }

    // Orden
    if (selectedSort === 'Rating') {
      media.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'Release Date') {
      media.sort((a, b) => b.year - a.year);
    }

    setFilteredMedia(media);
  }, [searchText, selectedSort, selectedCategory]);

  return (
    <View style={styles.container}>
      <MediaHeader
        title={title}
        onSearchChange={setSearchText}
        onSortChange={setSelectedSort}
        onCategorySelect={setSelectedCategory}
      />
      <MediaCardList media={filteredMedia} onPress={handleOnPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0A1B28',
  },
});

export default MovieScreen;
