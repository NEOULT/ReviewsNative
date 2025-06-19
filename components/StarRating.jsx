// components/StarRating.js
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

export default function StarRating({ rating, onRatingChange, size = 32 }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
          <MaterialCommunityIcons
            name={star <= rating ? 'star' : 'star-outline'}
            size={size}
            color="#BABABA"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
