import { Image, StyleSheet, Text, View } from 'react-native';

export default function MovieCard ({cover_image, title, year, critic_rating, community_rating, rating}) {
  return (
    <View style={styles.container}>
      {/* Mitad izquierda - Imagen de portada */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: cover_image }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      {/* Mitad derecha - Datos de la película */}
      <View style={styles.infoContainer}>
        {/* Título */}
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
                {title.length > 25 ? title.slice(0, 25) + '...' : title}
            </Text>
        </View>
        
        {/* Año */}
        <Text style={styles.yearText}>{year}</Text>
        
        {/* Porcentajes */}
        <View style={styles.ratingsContainer}>
          <Text style={styles.percentageText}>🍅 {critic_rating} % </Text>
          <Text style={styles.percentageText}>🍿 {community_rating} % </Text>
        </View>
        
        {/* Valoración */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {rating}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    height: 230, // Ajusta según necesites
    backgroundColor: '#0D354A',
    borderRadius: 22,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1.2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  robinText: {
    color: '#FFD700', // Amarillo dorado
    fontSize: 20,
  },
  yearText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    marginBottom: 10,
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  percentageText: {
    color: 'white',
    fontSize: 16,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});