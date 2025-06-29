import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

  function getRatingColor(rating) {
    if (rating <= 35) return '#E53935'; // Rojo
    if (rating <= 69) return '#FFA726'; // Naranja
    return '#43A047';                   // Verde
  }

export default function MediaCard ({cover_image, title, year, critic_rating, community_rating, rating, onPress}) {
  
  return (
    // ...existing code...
    
<Pressable onPress={onPress} style={styles.container}>
<View style={styles.container}>
  
  {/* Imagen */}
  <View style={styles.imageContainer}>
    <Image
  resizeMode='cover'
  source={{
    uri: cover_image
      ? 'https://image.tmdb.org/t/p/original' + cover_image
      : 'https://i.postimg.cc/xTSJhVPn/Chat-GPT-Image-26-jun-2025-06-32-14-p-m.png'
  }}
  style={styles.image}
/>
  </View>
  {/* Info */}
  <View style={styles.infoContainer}>
    {/* Título */}
  
    <Text style={styles.titleText}>
      {title.length > 25 ? title.slice(0, 25) + '...' : title}
    </Text>
    {/* Ratings tomate y cotufa */}
    <View style={styles.ratingsRow}>
      <View style={styles.ratingDetail}>
        <Text style={styles.ratingValue}> 🍿 {critic_rating}% </Text>
      </View>
      <View style={styles.ratingDetail}>
        <Text style={styles.ratingValue}> 🍅  {community_rating}%</Text>
      </View>
    </View>
    {/* Espacio flexible */}
    <View style={{ flex: 1 }} />
    {/* Año y rating box */}
    <View style={styles.bottomRow}>
      <Text style={styles.yearText}>
        {year ? new Date(year).getFullYear() : ''}
      </Text>
      <View
        style={[
          styles.ratingBox,
          { backgroundColor: getRatingColor(rating) }
        ]}
      >
        <Text style={styles.ratingBoxText}>{rating}</Text>
      </View>
    </View>
  </View>
</View>
  </Pressable>
// ...existing code...
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 230, // Ajusta según necesites
    backgroundColor: '#0D354A',
    borderRadius: 22,
    overflow: 'visible',
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1.2,
  },
  bottomRow: {
    justifyContent: 'flex-start',
  },  
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
  },
  infoContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    marginBottom: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  robinText: {
    color: '#FFD700', // Amarillo dorado
    fontSize: 20,
  },
  yearText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 25,
    fontWeight: 'bold',
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ratingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 20
  },
  ratingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  ratingLabel: {
    fontSize: 16,
  },
  ratingValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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

  ratingBox: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    height: 50,
    minWidth: 50,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderBottomRightRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBoxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  }

});