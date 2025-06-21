import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function MediaHeader({ onSearchChange ,onSortChange, onCategorySelect, title }) {
  const [searchText, setSearchText] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Rating');
  const [sortValue, setSortValue] = useState('');
  const sortOptions = ['Rating', 'Release Date'];
  const categoryOptions = [
  'Kids',
  'Soap',
  'News',
  'Drama',
  'Crimen',
  'Música',
  'Acción',
  'Familia',
  'Terror',
  'Bélica',
  'Talk',
  'Reality',
  'Western',
  'Historia',
  'Romance',
  'Comedia',
  'Animación',
  'Suspense',
  'Aventura',
  'Fantasía',
  'Misterio',
  'Documental',
  'Película de TV',
  'Sci-Fi & Fantasy',
  'Ciencia ficción',
  'War & Politics',
  'Action & Adventure'
];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search for a movie..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            onSearchChange?.(text);
          }}
          style={styles.input}
        />
        <Feather name="search" size={20} color="white" />
      </View>

      {/* Buttons */}
      <View style={styles.buttonsRow}>
        {/* Sort By */}
        <TouchableOpacity style={styles.button} onPress={() => setSortVisible(true)}>
          <Text style={styles.buttonText}>Sort By</Text>
          <MaterialIcons name="arrow-drop-down" size={20} color="white" />
        </TouchableOpacity>
        {/* Input para valor de sort */}
        <TextInput
          style={[
            styles.input, 
            { 
              width: 80, 
              backgroundColor: '#0D354A', 
              borderRadius: 12,
              textAlign: 'center',
              textAlignVertical: 'center',
             }
          ]}
          placeholder={selectedSort === 'Rating' ? 'Rating' : 'Year'}
          placeholderTextColor="white"
          value={sortValue}
          onChangeText={setSortValue}
          keyboardType={selectedSort === 'Rating' ? 'numeric' : 'default'}
        />
        {/* Categories */}
        <TouchableOpacity style={styles.button} onPress={() => setCategoryVisible(true)}>
          <Text style={styles.buttonText}>Categories</Text>
          <MaterialIcons name="arrow-drop-down" size={20} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* PARA ANGELINA */}
      {/* Sort Modal */}
      <Modal transparent visible={sortVisible} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setSortVisible(false)}>
          <View style={styles.modalBox}>
            <View style={styles.tagsWrap}>
              {categoryOptions.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.genreTag}
                  onPress={() => {
                    onCategorySelect(item);
                    setCategoryVisible(false);
                  }}
                >
                  <Text style={styles.genreText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Categories Modal */}
      <Modal transparent visible={categoryVisible} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setCategoryVisible(false)}>
          <View style={styles.modalBox}>
            <FlatList
              data={categoryOptions}
              keyExtractor={(item) => item}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.genreTag}
                  onPress={() => {
                    onCategorySelect(item);
                    setCategoryVisible(false);
                  }}
                >
                  <Text style={styles.genreText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#0D354A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    color: 'white',
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0D354A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
  backgroundColor: '#0D354A',
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  width: '90%', // Ocupa el 90% del ancho disponible
  maxWidth: 350, // Máximo ancho para pantallas grandes
  maxHeight: '80%', // 80% del alto de la pantalla
},
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    color: 'white',
    fontSize: 16,
  },
  tagsWrap: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center', // Centrar las etiquetas
  alignItems: 'center',
  paddingVertical: 10,
},

  genreTag: {
  backgroundColor: 'transparent',
  borderColor: '#5895B5',
  borderWidth: 2, // Reducir el grosor del borde
  borderRadius: 15,
  paddingHorizontal: 8,
  paddingVertical: 6,
  margin: 8, // Margen uniforme
  minWidth: 0, // Ancho mínimo mayor para mejor legibilidad
  maxWidth: 120,
  flexShrink: 1, // Permite que se ajuste al contenido
},
genreText: {
  color: '#5895B5',
  fontSize: 14, // Tamaño de fuente ligeramente mayor
  fontWeight: 'bold',
  textAlign: 'center', // Texto centrado
  flexWrap: 'wrap'
},

});
