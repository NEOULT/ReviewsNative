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
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const router = useRouter();

  // Fetch paginado según el tipo (movies o series)
  const fetchMedia = useCallback(async (pageToFetch = 1, search = '') => {
    setLoading(pageToFetch === 1);
    try {
      let response;
      if (route === 'movies') {
        if (search && search.length > 0) {
          response = await apiService.searchMovies(search, pageToFetch);
          console.log(response, 'response');
        } else {
          response = await apiService.getPaginatedMovies(pageToFetch, 20, 10);
        }
      } else if (route === 'series') {
        if (search && search.length > 0) {
          response = await apiService.searchSeries(search, pageToFetch);
        } else {
          response = await apiService.getPaginatedSeries(pageToFetch, 20, 10);
        }
      }
      setMedia(prev =>
        pageToFetch === 1
          ? (response.data.data?.results || response.data.results)
          : [
              ...prev,
              ...(response.data.data?.results || response.data.results)
            ]
      );
      setPagination({
        page: pageToFetch,
        hasMore:
          pageToFetch <
          (response.data.data?.totalPages || response.data.totalPages)
      });
    } catch (error) {
      setMedia([]);
    } finally {
      setLoading(false);
    }
  }, [route]);

    // Fetch al escribir (con debounce)
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        fetchMedia(1, searchText);
      }, 400);
      return () => clearTimeout(delayDebounce);
    }, [searchText, fetchMedia]);

  const handleLoadMore = () => {
    if (pagination.hasMore && !loading) {
      fetchMedia(pagination.page + 1, searchText);
    }
  };

  useEffect(() => {
    let filtered = [...media];
    if (selectedCategory) {
      filtered = filtered.filter((m) => m.category === selectedCategory);
    }
    if (selectedSort === 'Rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'Release Date') {
      filtered.sort((a, b) => b.year - a.year);
    }
    setFilteredMedia(filtered);
  }, [media, selectedSort, selectedCategory]);

  const handleOnPress = (item) => {
    router.navigate({
      pathname: `/${route}/${item.tmdb_id || item.id}`,
    });
  };

  return (
    <View style={styles.container}>
      <MediaHeader
        title={title}
        onSearchChange={setSearchText}
        onSortChange={setSelectedSort}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}

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