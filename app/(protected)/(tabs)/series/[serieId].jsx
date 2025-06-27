import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import MediaDetail from "../../../../components/MediaDetails";

const MovieDetailsScreen = () => {
  const { serieId, localMediaId } = useLocalSearchParams();
  const router = useRouter();
    
  return (
    <View style={{ flex: 1, backgroundColor: '#0A1B28' }}>
      <MediaDetail
        mediaId={serieId}
        onBack={() => router.back()}
        localMediaId={localMediaId} 
      />
    </View>
  );
}

export default MovieDetailsScreen;