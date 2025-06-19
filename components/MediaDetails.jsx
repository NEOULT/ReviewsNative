import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CommentModal from './commentModal'; // Asegúrate de que la ruta sea correcta
import StarRating from './StarRating';

export default function MediaDetail({ media, onBack, isMovie }) {

  const [showComments, setShowComments] = useState(false);
  const [userRating, setUserRating] = useState(0);

  return (

    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen y botón atrás */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: media.cover_image }} style={styles.image} />
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>{media.title}</Text>
        <Text style={styles.subinfo}>
          {media.year} • {
            isMovie ? 
            media.duration : 
            'Temporadas ' + media.seasons + ' • Episodios ' + media.episodes
          }
        </Text>

        {/* Géneros */}
        <View style={styles.genres}>
          {media.genres.map((genre) => (
            <View style={styles.genreTag} key={genre}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>

        {/* Sinopsis */}
        <Text style={styles.description}>{media.description}</Text>

        {/* Reparto */}
        <Text style={styles.castTitle}>Reparto:</Text>
        <Text style={styles.castText}>{media.cast.join(' • ')}</Text>

        {/* Puntuaciones */}
        <View style={styles.scores}>
          <Text style={styles.scoreText}>
            <Text style={styles.bold}>Puntuación:</Text> {media.rating}/10
          </Text>
          <Text style={styles.scoreText}>
            🍅 {media.critic_rating}%   🍿 {media.community_rating}%
          </Text>
        </View>
      </View>

        <View style={styles.commentsSection}>
            <TouchableOpacity style={styles.commentButton} onPress={() => setShowComments(true)}>
                <Text style={styles.commentText}>Comentarios ({media.comments.community.length + media.comments.critics.length})</Text>
            </TouchableOpacity>
        </View>

        <CommentModal
        visible={showComments}
        onClose={() => setShowComments(false)}
        community={media.comments.community}
        critics={media.comments.critics}
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
