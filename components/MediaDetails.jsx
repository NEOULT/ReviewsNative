import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CommentModal from './commentModal'; // Asegúrate de que la ruta sea correcta
import StarRating from './StarRating';

import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/authContext'; // Asegúrate de que la ruta sea correcta
import { ApiService } from '../services/ApiService'; // Asegúrate de que la ruta sea correcta

const apiService = new ApiService();


export default function MediaDetail({ mediaId, onBack, isMovie, localMediaId }) {

  const {token} = useContext(AuthContext);

  const [showComments, setShowComments] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [media, setMedia] = useState();
  const [inputValue, setInputValue] = useState('');
  const [communityComments, setCommunityComments] = useState([]);
  const [criticsComments, setCriticsComments] = useState([]);
  const [communityPagination, setCommunityPagination] = useState({ page: 1, hasMore: true });
  const [criticsPagination, setCriticsPagination] = useState({ page: 1, hasMore: true });
  const [loadingMore, setLoadingMore] = useState(false);
    

  apiService.setToken(token);

  useEffect(() => {
  const fetchDetails = async () => {
    try {
      let response;
      if (isMovie) {
        response = await apiService.getMovieDetails(mediaId);
      } else {
        response = await apiService.getSeriesDetails(mediaId);
      }
      
      setMedia(response.data.data);
    } catch (error) { 
      setMedia(null);
    }
  };

  fetchDetails();
}, [mediaId]);


const fetchComments = async (tab = 'community', page = 1) => {
  setLoadingMore(true);
  try {
    let response;
    if (tab === 'community') {
      response = await apiService.getPaginatedComment(page, 15, localMediaId,'user');
      
      setCommunityComments(prev =>
        page === 1 ? response.data.data : [...prev, ...response.data.data]
      );
      setCommunityPagination({
        page,
        hasMore: page < response.data.totalPages
      });
    } else {
      response = await apiService.getPaginatedComment(page, 15, localMediaId, 'critic');

      setCriticsComments(prev =>
        page === 1 ? response.data.data : [...prev, ...response.data.data]
      );
      setCriticsPagination({
        page,
        hasMore: page < response.data.totalPages
      });
    }
  } catch (e) {
    console.error('Error fetching comments:', e);
  }
  setLoadingMore(false);
};

useEffect(() => {
  if (showComments) {
    fetchComments('community', 1);
    fetchComments('critics', 1);
  }
}, [showComments]);

  if (!media) {
  return (
    <View style={{ flex: 1, backgroundColor: '#0A1B28', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  );
}

  const handleSendComment = async (comment) => {
    if (!comment.trim()) return; // No enviar comentarios vacíos
    try {

      const response = await apiService.createComment(localMediaId,comment, isMovie);

      if (response.success){
        setInputValue(''); 
        fetchComments('community', 1); 
        fetchComments('critics', 1); 
      }
      
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  const handleLoadMoreComments = (tab) => {
    if (tab === 'community' && communityPagination.hasMore && !loadingMore) {
      fetchComments('community', communityPagination.page + 1);
    }
    if (tab === 'critics' && criticsPagination.hasMore && !loadingMore) {
      fetchComments('critics', criticsPagination.page + 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen y botón atrás */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: media.poster_path
              ? 'https://image.tmdb.org/t/p/original' + media.poster_path
              : 'https://i.postimg.cc/xTSJhVPn/Chat-GPT-Image-26-jun-2025-06-32-14-p-m.png'
          }}
          style={styles.image}
        />
        <LinearGradient
          colors={['transparent', '#0A1B28']}
          style={styles.gradient}
        />
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>{media.title}</Text>
        <Text style={styles.subinfo}>
        {media.release_date ? new Date(media.release_date).getFullYear() : ''} • {
          isMovie
            ? media.runtime
              ? `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`
              : ''
            : `Seasons ${media.seasons_count} • Episodes ${media.episodes_count}`
        }
      </Text>

        {/* Géneros */}
        <View style={styles.genres}>
          {Array.isArray(media?.categories) && media.categories.map((genre) => (
            <View style={styles.genreTag} key={genre._id}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>

        {/* Sinopsis */}
        <Text style={styles.description}>{media.synopsis}</Text>

        {/* Reparto */}
          <Text style={styles.castTitle}>Cast </Text>
          {/* Actores en 2 columnas, máximo 8 */}
          {Array.isArray(media.cast) && media.cast.filter(p => p.role === 'Actor').length > 0 ? (
            <View style={{ flexDirection: 'row', gap: 16 }}>
              {/* Columna 1 */}
              <View style={{ flex: 1 }}>
                {media.cast
                  .filter(p => p.role === 'Actor')
                  .slice(0, 8)
                  .filter((_, idx) => idx % 2 === 0)
                  .map(actor => (
                    <Text key={actor._id} style={styles.castText}>{actor.name}</Text>
                  ))}
              </View>
              {/* Columna 2 */}
              <View style={{ flex: 1 }}>
                {media.cast
                  .filter(p => p.role === 'Actor')
                  .slice(0, 8)
                  .filter((_, idx) => idx % 2 === 1)
                  .map(actor => (
                    <Text key={actor._id} style={styles.castText}>{actor.name}</Text>
                  ))}
              </View>
            </View>
          ) : (
            <Text style={styles.castText}>Sin actores</Text>
          )}
          {/* Directores, máximo 2 */}
          <Text style={styles.castText}>
            <Text style={styles.bold}>Directores: </Text>
            {Array.isArray(media.cast) && media.cast.filter(p => p.role === 'Director').length > 0
              ? media.cast.filter(p => p.role === 'Director').slice(0, 5).map(director => director.name).join(' • ')
              : Array.isArray(media.cast) && media.cast.filter(p => p.role === 'Creator').length > 0
                ? media.cast.filter(p => p.role === 'Creator').slice(0, 5).map(creator => creator.name).join(' • ')
                : 'Sin directores ni creadores'}
          </Text>
        {/* Puntuaciones */}
        <View style={styles.scores}>
          <Text style={styles.scoreText}>
            <Text style={styles.bold}>Score:</Text> {media.total_rating}/100
          </Text>
          <Text style={styles.scoreText}>
            🍅 {media.critic_rating}%   🍿 {media.user_rating}%
          </Text>
        </View>
      </View>

        <View style={styles.commentsSection}>
            <TouchableOpacity style={styles.commentButton} onPress={() => setShowComments(true)}>
                <Text style={styles.commentText}>Comments ({(media.comments?.community?.length || 0) + (media.comments?.critics?.length || 0)})</Text>
            </TouchableOpacity>
        </View>

        <CommentModal
          visible={showComments}
          onClose={() => setShowComments(false)}
          community={communityComments || []}
          critics={criticsComments || []}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendComment={handleSendComment}
          onLoadMore={handleLoadMoreComments}
          loadingMore={loadingMore}
        />

        <StarRating rating={userRating} onRatingChange={setUserRating} size={28} />


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A1B28',
    alignItems: 'center',
    paddingBottom: 30,
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
    width: 800,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 15,
    backgroundColor: '#00000088',
    borderRadius: 20,
    padding: 6,
  },
  content: {
    width: '90%',
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  subinfo: {
    color: '#ccc',
    marginBottom: 10,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  genreTag: {
    backgroundColor: 'transparent',
    borderColor: '#5895B5',
    borderWidth: 3, 
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  genreText: {
    color: '#5895B5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    fontSize: 15,
    marginBottom: 16,
    lineHeight: 22,
  },
  castTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  castText: {
    color: 'white',
    marginBottom: 20,
    fontSize: 14,
  },
  scores: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  scoreText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  commentsSection: {
  width: '100%',
  alignItems: 'center', // Centra horizontalmente
  marginVertical: 25,   // Opcional: espacio arriba y abajo
},

commentButton: {
  backgroundColor: '#133A50',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 12,
},

commentText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},

});
