import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CommentModal({ visible, onClose, community, critics }) {
  const [activeTab, setActiveTab] = useState('community');

  const commentsToShow = activeTab === 'community' ? community : critics;

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
          <ScrollView style={styles.commentsList}>
            {commentsToShow.map((comment, index) => (
              <View key={index} style={styles.commentItem}>
                <Text style={styles.username}>@{comment.user}</Text>
                <Text style={styles.time}>• hace {comment.daysAgo} días</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            ))}
          </ScrollView>
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
});
