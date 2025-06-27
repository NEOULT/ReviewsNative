import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useImagePicker } from "../hooks/useImagePicker.js";

export default function ImageSelector({
  width = 100,
  height = 100,
  value,
  onChange,
  uploadType,
  uploadMetadata = {},
  style,
  title
}) {
  const { imageUri, setImageUri, pickImage, takePhoto } = useImagePicker();
  const [image, setImage] = useState(value || null);
  const [uploading, setUploading] = useState(false);


  const uploadImageToBackend = async (localUri) => {
    if (!uploadType) {
      return localUri;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const fileType = match ? `image/${match[1]}` : 'image';

      formData.append('file', {
        uri: localUri,
        name: filename,
        type: fileType,
      });

      formData.append('type', uploadType);

      for (const key in uploadMetadata) {
        formData.append(key, uploadMetadata[key]);
      }

        console.log('URI:', localUri);
        console.log('FormData:', formData);

      const response = await fetch('https://api-reviewsnative.onrender.com/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Error subiendo imagen');
      }

      const data = await response.json();

      setUploading(false);

      return data.url;

    } catch (error) {
      setUploading(false);
      console.log('Error subiendo imagen:', error);
      
      Alert.alert('Error', 'No se pudo subir la imagen');
      return null;
    }
  };

  useEffect(() => {
    if (imageUri) {
      (async () => {
        const uploadedUrl = await uploadImageToBackend(imageUri);
        if (uploadedUrl) {

            console.log('Imagen subida:', uploadedUrl);
            
          onChange(uploadedUrl);
          setImage(uploadedUrl);
        }
      })();
    }
  }, [imageUri]);

  useEffect(() => {
    console.log('Valor recibido en ImageSelector:', value);
    if (Array.isArray(value) && value.length > 0) {
    setImage(value[0].url);
    } else {
        setImage(value || null);
    }
  }, [value]);

  const handlePress = () => {
    if (image) {
      Alert.alert("Imagen seleccionada", "¿Qué deseas hacer?", [
        { text: "Cambiar imagen", onPress: showPickerOptions },
        { text: "Cancelar", style: "cancel" },
      ]);
    } else {
      showPickerOptions();
    }
  };

  const showPickerOptions = () => {
    Alert.alert("Seleccionar imagen", "¿Qué deseas hacer?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Cámara", onPress: takePhoto },
      { text: "Galería", onPress: pickImage },
    ]);
  };

  return (
    <TouchableOpacity
      style={[styles.square, { width, height }, style]}
      onPress={handlePress}
      disabled={uploading} 
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <MaterialIcons name="photo-camera" size={40} color="#999" />
          { title && <Text style={{ color: "#999", marginTop: 5 }}>
            {uploading ? "Subiendo..." : title = "Agrega una foto"}
          </Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  square: {
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
