import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CommentModal({
  visible,
  onClose,
  community,
  critics,
  inputValue,
  setInputValue,
  onSendComment,
  onLoadMore, 
  loadingMore, 
}) {
  const [activeTab, setActiveTab] = useState('community');

  const commentsToShow = activeTab === 'community' ? community : critics;

  const getTimeAgo = (createdAt) => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now - created;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffMinutes < 1) return 'justo ahora';
  if (diffMinutes < 60) return `hace ${diffMinutes} min`;
  if (diffHours < 24) return `hace ${diffHours} h`;
  if (diffDays < 7) return `hace ${diffDays} días`;
  return `hace ${diffWeeks} sem`;
};

  const renderItem = ({ item }) => (
    <View style={styles.commentItem}>

      <Image
        source={{ uri: item.avatar || 'https://i.postimg.cc/MHw8VCDs/Captura-de-pantalla-2025-06-21-100631.png' }}
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
        resizeMode="cover"
      />
      <View style={{ flexDirection: 'column', gap: 4, flex: 1 }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Text style={styles.username}>@{item.user_name}</Text>
          <Text style={styles.time}>• {getTimeAgo(item.createdAt)}</Text>
        </View>
        <Text style={styles.commentText}>{item.content}</Text>
      </View>
      
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Barra superior */}
          <View style={styles.handleBar} />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </TouchableOpacity>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'community' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('community')}
            >
              <Text style={styles.tabText}>Comunidad</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'critics' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('critics')}
            >
              <Text style={styles.tabText}>Críticos</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de comentarios */}
          <FlatList
            data={commentsToShow}
            renderItem={renderItem}
            keyExtractor={(_, idx) => idx.toString()}
            style={styles.commentsList}
            onEndReached={() => onLoadMore && onLoadMore(activeTab)}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator size="small" color="#fff" style={{ margin: 10 }} />
              ) : null
            }
          />

          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Escribe un comentario..."
              placeholderTextColor="#aaa"
              value={inputValue}
              onChangeText={setInputValue}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={6}
            />
            <TouchableOpacity style={styles.sendButton} onPress={() => onSendComment(inputValue)}>
              <MaterialCommunityIcons name="send" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000088',
  },
  modalContent: {
    backgroundColor: '#0A1B28',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    maxHeight: '90%',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: '#133A50',
  },
  activeTab: {
    backgroundColor: '#1F4D6D',
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentsList: {
    marginTop: 10,
  },
  commentItem: {
    borderBottomColor: '#1F4D6D',
    borderBottomWidth: 1,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
  },
  time: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 4,
  },
  commentText: {
    color: '#fff',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#133A50',
    borderTopWidth: 1,
    borderTopColor: '#1F4D6D',
    marginTop: 8,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1F4D6D',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 15,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#1F4D6D',
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
