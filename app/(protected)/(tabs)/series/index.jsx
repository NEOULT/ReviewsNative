
import { StyleSheet, View } from 'react-native';

import MediaScreen from '../../../../components/common/MediaScreen';



const SerieScreen = () => {
  
  return (
    <View style={styles.container}>
      <MediaScreen title={'Series'} route={'series'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1B28',
  },
});

export default SerieScreen;
