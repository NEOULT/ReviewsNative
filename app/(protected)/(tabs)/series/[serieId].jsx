import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import MediaDetail from "../../../../components/MediaDetails";

const MovieDetailsScreen = () => {
  const { media } = useLocalSearchParams();
  const router = useRouter();
  const mediaObj = JSON.parse(media);

  return (
    <View style={{ flex: 1, backgroundColor: '#0A1B28' }}>
      <MediaDetail
        media={mediaObj}
        onBack={() => router.back()}
      />
    </View>
  );
}

export default MovieDetailsScreen;