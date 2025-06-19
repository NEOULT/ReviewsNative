import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import MediaDetail from "../../../../components/MediaDetails";

const MovieDetailsScreen = () => {
  const { media } = useLocalSearchParams();
  const router = useRouter();
  const movieObj = JSON.parse(media);
  
  return (
    <View style={{ flex: 1, backgroundColor: '#0A1B28' }}>
      <MediaDetail
        media={movieObj}
        onBack={() => router.back()}
        isMovie={true} // Assuming this is a movie, set to true
      />
    </View>
  );
}

export default MovieDetailsScreen;