// ...existing code...
import { StyleSheet, View } from 'react-native';
import MovieCardList from '../../../components/MovieCardList';

const App = () => (
  <View style={styles.container}>
    <MovieCardList />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center',     // Centra horizontalmente
    backgroundColor: '#0A1B28', // Fondo azul oscuro
  },
});

export default App;
// ...existing code...