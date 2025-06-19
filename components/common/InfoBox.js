import { View, Text, StyleSheet, Animated, useWindowDimensions, TouchableOpacity, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function InfoBox({ message, type = "success", onHide, duration = 3000 }) {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  // Animación de entrada
  useEffect(() => {
    if (message) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          stiffness: 100,
          damping: 10,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        })
      ]).start();
    }
  }, [message, slideAnim, fadeAnim]);

  // Animación de salida antes de destruir
  useEffect(() => {
    if (message && onHide) {
      const timeout = setTimeout(() => {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 300,
            duration: 250,
            useNativeDriver: true,
            easing: Easing.in(Easing.quad),
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          })
        ]).start(() => {
          onHide();
        });
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [message, onHide, slideAnim, fadeAnim, duration]);

  if (!message) return null;

  const iconName = type === "error" ? "close-circle" : "checkmark-circle";
  const iconColor = type === "error" ? "#dc3545" : "#28a745";

  // --- PROCESAMIENTO DE MENSAJES PARA BULLETS ---
  let messages = [];
  if (Array.isArray(message)) {
    messages = message;
  } else if (typeof message === "string") {
    // Divide por salto de línea, punto y coma, o punto
    messages = message.split(/\n|\. |, /).filter(Boolean);
  } else {
    messages = [String(message)];
  }

  return (
    <Animated.View
      style={[
        styles.box,
        type === "error" ? styles.error : styles.success,
        {
          position: 'absolute',
          top: 40,
          right: 20,
          minWidth: width * 0.7,
          maxWidth: width * 0.9,
          zIndex: 999,
          transform: [{ translateX: slideAnim }],
          opacity: fadeAnim,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 8,
        }
      ]}
    >
      <View style={styles.contentContainer}>
        <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />
        <View style={{ flex: 1 }}>
          {messages.map((msg, idx) => (
            <Text key={idx} style={styles.text}>
              {type === "error" ? "• " : ""}
              {msg.trim()}
            </Text>
          ))}
        </View>
        <TouchableOpacity onPress={() => {
          Animated.timing(slideAnim, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
          }).start(() => onHide());
        }}>
          <Ionicons name="close" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  success: {
    backgroundColor: '#f0fff4',
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  error: {
    backgroundColor: '#fff0f0',
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  text: {
    color: '#333',
    fontSize: 14,
    flex: 1,
    marginHorizontal: 12,
    lineHeight: 20,
  },
  icon: {
    marginRight: 8,
  },
});