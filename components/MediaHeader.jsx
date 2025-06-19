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

  const sortOptions = ['Rating', 'Release Date'];
  const categoryOptions = ['Action', 'Drama', 'Comedy', 'Sci-fi'];

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

        {/* Categories */}
        <TouchableOpacity style={styles.button} onPress={() => setCategoryVisible(true)}>
          <Text style={styles.buttonText}>Categories</Text>
          <MaterialIcons name="arrow-drop-down" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Sort Modal */}
      <Modal transparent visible={sortVisible} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setSortVisible(false)}>
          <View style={styles.modalBox}>
            {sortOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.modalItem}
                onPress={() => {
                  onSortChange(option);
                  setSortVisible(false);
                }}
              >
                <Text style={styles.modalText}>{option}</Text>
              </TouchableOpacity>
            ))}
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
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onCategorySelect(item);
                    setCategoryVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
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
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#133A50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 200,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    color: 'white',
    fontSize: 16,
  },
});
