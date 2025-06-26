import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

export function useImagePicker(maxSizeMB = 3) {
    const [imageUri, setImageUri] = useState(null);

    const validateImageSize = async (uri) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(uri);
            const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (fileInfo.size > maxSizeBytes) {
            Alert.alert("Imagen muy grande", `Debe pesar menos de ${maxSizeMB} MB.`);
            return false;
        }
        return true;
        } catch (error) {
            Alert.alert("Error", "No se pudo validar el tamaño de la imagen.");
        return false;
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permiso denegado", "Necesitamos permiso para acceder a la galería");
        return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const valid = await validateImageSize(uri);
        if (valid) setImageUri(uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permiso denegado", "Necesitamos permiso para usar la cámara");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const valid = await validateImageSize(uri);
        if (valid) setImageUri(uri);
        }
    };

    return { imageUri, setImageUri, pickImage, takePhoto };
}