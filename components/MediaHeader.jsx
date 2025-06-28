import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ApiService } from '../services/ApiService'; // Asegúrate de que esta ruta sea correcta

const apiService = new ApiService();

export default function MediaHeader({ onSearchChange ,onSortChange, setSelectedCategory, selectedCategory, title }) {
  const [searchText, setSearchText] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('No Filters');
  const sortOptions = ['Rating', 'Year', 'No Filters'];
  const [categoryOptions, setCategoryOptions] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiService.getAllCategories();

      setCategoryOptions(response.data.categories); // Asegúrate que response.data sea un array de objetos { _id, name }
    };
    fetchCategories();
  }, []);

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
        <View
          style={[
            styles.input,
            {
              width: 80,
              backgroundColor: '#0D354A',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              height: 40, // Asegura altura visual similar al input
            }
          ]}
        >
          <Text style={[styles.buttonText, { textAlign: 'center' }]}>
            {selectedSort}
          </Text>
        </View>
        {/* Categories */}
        <TouchableOpacity style={styles.button} onPress={() => {setCategoryVisible(true)}}>
          <Text style={styles.buttonText}>Categories</Text>
          <MaterialIcons name="arrow-drop-down" size={20} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Sort Modal */}
      <Modal transparent visible={sortVisible} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setSortVisible(false)}>
          <View style={styles.modalBox}>
            <View style={styles.tagsColumn}>
              {sortOptions.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.genreTag}
                  onPress={() => {
                    onSortChange(item);
                    setSelectedSort(item);
                    setSortVisible(false);
                  }}
                >
                  <Text style={styles.genreText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* PARA ANGELINA */}

      {/* Categories Modal */}
      <Modal transparent visible={categoryVisible} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setCategoryVisible(false)}>
          <View style={styles.modalBox}>
            <View style={styles.tagsWrap}>
              {categoryOptions.map((cat) => (
                <TouchableOpacity
                  key={cat._id}
                  style={[styles.genreTag, selectedCategory.includes(cat._id) && styles.tagActive]}
                  onPress={() => toggleCategory(cat._id)}
                >
                  <Text style={[styles.genreText, selectedCategory.includes(cat._id) && {color: '#fff'}]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.clearButton} onPress={() => setSelectedCategory([])}>
              <Text style={styles.clearButtonText}>Limpiar</Text>
            </TouchableOpacity>
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
  paddingHorizontal: 10,
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

  tagsColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  genreTag: {
  backgroundColor: 'transparent',
  borderColor: '#5895B5',
  borderWidth: 2, // Reducir el grosor del borde
  borderRadius: 15,
  paddingHorizontal: 8,
  paddingVertical: 6,
  margin: 4,
  minWidth: 0, // Ancho mínimo mayor para mejor legibilidad
  maxWidth: 145,
  flexShrink: 1, // Permite que se ajuste al contenido
},
genreText: {
  color: '#5895B5',
  fontSize: 14, // Tamaño de fuente ligeramente mayor
  fontWeight: 'bold',
  textAlign: 'center', // Texto centrado
  flexWrap: 'wrap'
},

tagActive: {
  backgroundColor: '#5895B5',
  borderColor: '#fff',
  color: '#fff',
},
clearButton: {
  backgroundColor: '#0D354A',
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  alignItems: 'center',
  marginTop: 10,
  alignSelf: 'center',
  width: '50%',
  maxWidth: 300,  
  borderWidth: 1,
  borderColor: '#FF3B30',
},
clearButtonText: {
  color: '#FF3B30',
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'center',
  textTransform: 'uppercase',
  }

});
