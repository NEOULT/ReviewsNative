import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MediaCardList from '../../components/MediaCardList';
import { ApiService } from '../../services/ApiService';
import MediaHeader from '../MediaHeader';

const apiService = new ApiService();

const MediaScreen = ({ route, title }) => {
  const [media, setMedia] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, hasMore: true });
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedSort, setSelectedSort] = useState('Rating');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const router = useRouter();

  // Fetch paginado según el tipo (movies o series)
  const fetchMedia = useCallback(async (pageToFetch = 1) => {
    setLoading(pageToFetch === 1);
    try {
      let response;
      if (route === 'movies') {
        response = await apiService.getPaginatedMovies(pageToFetch, 5);
      } else if (route === 'series') {
        response = await apiService.getPaginatedSeries(pageToFetch, 5);
      }
      setMedia(prev =>
        pageToFetch === 1
          ? response.data.results
          : [...prev, ...response.data.results]
      );
      setPagination({
        page: pageToFetch,
        hasMore: pageToFetch < response.data.totalPages
      });
    } catch (error) {
      setMedia([]);
    } finally {
      setLoading(false);
    }
  }, [route]);

  useEffect(() => {
    fetchMedia(1);
  }, [fetchMedia]);

  const handleLoadMore = () => {
    if (pagination.hasMore && !loading) {
      fetchMedia(pagination.page + 1);
    }
  };

  useEffect(() => {
    let filtered = [...media];
    if (searchText) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((m) => m.category === selectedCategory);
    }
    if (selectedSort === 'Rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'Release Date') {
      filtered.sort((a, b) => b.year - a.year);
    }
    setFilteredMedia(filtered);
  }, [media, searchText, selectedSort, selectedCategory]);

  const handleOnPress = (item) => {
    router.navigate({
      pathname: `/${route}/${item.tmdb_id}`
    });
  };

  return (
    <View style={styles.container}>
      <MediaHeader
        title={title}
        onSearchChange={setSearchText}
        onSortChange={setSelectedSort}
        onCategorySelect={setSelectedCategory}
      />
      {loading && (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      )}
      {!loading && filteredMedia.length === 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: '#fff' }}>No results found</Text>
        </View>
      )}
      <MediaCardList media={filteredMedia} onPress={handleOnPress} onEndReached={handleLoadMore} />
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

export default MediaScreen;