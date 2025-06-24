import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import MediaDetail from "../../../../components/MediaDetails";

const MovieDetailsScreen = () => {
  const { movieId } = useLocalSearchParams();
  const router = useRouter();
  console.log(movieId,'transiciom');
  
  return (
    <View style={{ flex: 1, backgroundColor: '#0A1B28' }}>
      <MediaDetail
        mediaId={movieId}
        onBack={() => router.back()}
        isMovie={true} // Assuming this is a movie, set to true
      />
    </View>
  );
}

export default MovieDetailsScreen;