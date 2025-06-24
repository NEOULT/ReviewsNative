
import { StyleSheet, View } from 'react-native';

import MediaScreen from '../../../../components/common/MediaScreen';

const MovieScreen = () => {
  
  return (
    <View style={styles.container}>
      <MediaScreen title={'Movies'} route={'movies'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1B28',
  },
});

export default MovieScreen;
