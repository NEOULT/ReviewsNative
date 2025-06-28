import { Feather } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CommentItem({
    item,
    onEditComment,
    onDeleteComment,
    currentUserName,   
}) {    

    const [showOptions, setShowOptions] = useState(null);
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
    const moreBtnRef = useRef({});

    
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

    const isOwner = item.user_name === currentUserName;

    const wasEdited = item.updatedAt && item.updatedAt !== item.createdAt;
    
    return (

        <View style={styles.commentItem}>
            <Image
                source={{ uri: item.avatar || 'https://i.postimg.cc/MHw8VCDs/Captura-de-pantalla-2025-06-21-100631.png' }}
                style={styles.avatar}
                resizeMode="cover"
            />
            <View style={{ flexDirection: 'column', gap: 4, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                        <Text style={styles.username}>@{item.user_name}</Text>
                        {wasEdited ?
                            <Text style={styles.time}>
                            • editado {getTimeAgo(item.updatedAt)}
                            </Text>
                            : 
                            <Text style={styles.time}>•  {getTimeAgo(item.createdAt)}</Text>}
                    </View>                
                    {isOwner && (
                    <TouchableOpacity
                        ref={ref => { moreBtnRef.current[item.user_name] = ref; }}
                        onPress={() => {
                        if (moreBtnRef.current[item.user_name]) {
                            moreBtnRef.current[item.user_name].measureInWindow((x, y, width, height) => {
                            const screenWidth = Dimensions.get('window').width;
                            setMenuPos({
                                top: y + height - 120,
                                right: screenWidth - (x + width),
                            });
                            setShowOptions(item.user_name);
                            });
                        } else {
                            setShowOptions(item.user_name);
                        }
                        }}
                        style={{ padding: 4}}
                    >
                        <Feather name="more-vertical" size={18} color="#fff" />
                    </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.commentText}>{item.content}</Text>
            </View>
            {/* Modal de opciones */}
            {showOptions === item.user_name && (
            <Modal
                visible
                transparent
                animationType="fade"
                onRequestClose={() => setShowOptions(null)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowOptions(null)}>
                <View style={[styles.menuContainer, { top: menuPos.top, right: menuPos.right }]}>
                    <Pressable
                    style={styles.menuItem}
                    onPress={() => {
                        setShowOptions(null);
                        if (onEditComment) onEditComment(item);
                    }}
                    >
                    <Feather name="edit-2" size={17} color="#333" />
                    <Text style={styles.menuText}>Editar</Text>
                    </Pressable>
                    <Pressable
                        style={styles.menuItem}
                        onPress={() => {
                            setShowOptions(null);
                            if (onDeleteComment) onDeleteComment(item.id);
                        }}
                    >
                    <Feather name="trash-2" size={18} color="#333" />
                    <Text style={styles.menuText}>Eliminar</Text>
                    </Pressable>
                </View>
                </Pressable>
            </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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
    avatar: { 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        marginRight: 10 
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    menuContainer: {
        position: 'absolute',
        backgroundColor: '#f7f7f7',
        paddingVertical: 8,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.7,
        shadowRadius: 8,
        elevation: 8,
        minWidth: 120,
        zIndex: 100,
    },
    menuItem: {
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    menuText: {
        fontSize: 15,
        color: '#333',
    },
})