import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MediaCardList from '../../components/MediaCardList';
import { ApiService } from '../../services/ApiService';
import MediaHeader from '../MediaHeader';

const apiService = new ApiService();

const MediaScreen = ({ route, title }) => {

  const type = route.slice(0, -1); // 'movies' or 'series'
  
  const [media, setMedia] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, hasMore: true });
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedSort, setSelectedSort] = useState('No Filters');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const router = useRouter();

  // Fetch paginado según el tipo (movies o series)
  const fetchMedia = useCallback(async (pageToFetch = 1, search = '') => {
    setLoading(pageToFetch === 1);
    try {
      let response;
      // Determina los flags de ordenamiento
      const sortByDate = selectedSort === 'Year';
      const sortByRate = selectedSort === 'Rating';
      if (route === 'movies') {
        if (search && search.length > 0) {
          response = await apiService.searchMovies(search, pageToFetch);
          console.log(response, 'response');
        } else {
          response = await apiService.getPaginatedMovies(
            pageToFetch,
            20,
            sortByDate,
            sortByRate
          );
        }
      } else if (route === 'series') {
        if (search && search.length > 0) {
          response = await apiService.searchSeries(search, pageToFetch);
        } else {
          response = await apiService.getPaginatedSeries(
            pageToFetch,
            20,
            sortByDate,
            sortByRate
          );
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
  }, [route, selectedSort]);

  useEffect(() => {
  setFilteredMedia(media);
}, [media]);

    // Fetch al escribir (con debounce)
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        fetchMedia(1, searchText);
      }, 400);
      return () => clearTimeout(delayDebounce);
    }, [searchText, fetchMedia]);

  const handleLoadMore = () => {
  if (pagination.hasMore && !loading) {
    if (selectedCategory && selectedCategory.length > 0 && !searchText) {
      apiService
        .searchByCategories(selectedCategory, pagination.page + 1, type)
        .then(response => {
          setMedia(prev => [
            ...prev,
            ...(response.data.data?.results || response.data.results || [])
          ]);
          setPagination({
            page: pagination.page + 1,
            hasMore:
              pagination.page + 1 <
              (response.data.data?.totalPages || response.data.totalPages)
          });
        });
    } else {
      fetchMedia(pagination.page + 1, searchText);
    }
  }
};

  // Fetch por categorías (cuando hay categorías seleccionadas y no hay búsqueda)
  useEffect(() => {
    if (selectedCategory && selectedCategory.length > 0 && !searchText) {
      setLoading(true);
      apiService
        .searchByCategories(selectedCategory, 1, type)
        .then(response => {
          setMedia(response.data.data?.results || response.data.results || []);
          setPagination({
            page: 1,
            hasMore:
              1 < (response.data.data?.totalPages || response.data.totalPages)
          });
        })
        .catch(() => setMedia([]))
        .finally(() => setLoading(false));
    }
  }, [selectedCategory, type, searchText]);

  useEffect(() => {
  if (selectedCategory.length === 0 && !searchText) {
    fetchMedia(1, '');
  }
}, [selectedCategory, searchText, fetchMedia]);

  const handleOnPress = (item) => {
    
    router.navigate({
      pathname: `/${route}/${item.tmdb_id || item.id}`,
      params: { localMediaId: item.id}
    }
  );
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