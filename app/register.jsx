import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ImageBackground,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import InfoBox from "../components/common/InfoBox";
import { useApiMessage } from "../hooks/useApiMessage";
import { ApiService } from "../services/ApiService";

const apiService = new ApiService();

export default function SignUpScreen() {

  const [showPassword, setShowPassword] = useState(false);
  const { info, setInfo, clearInfo } = useApiMessage();
const {
control,
handleSubmit,
formState: { errors, isSubmitting },
} = useForm();


const onSubmit = async (data) => {
//console.log("Datos del formulario:", data);
const payload = {
    ...data,
    role: data.critic ? "critic" : "user",
  };
try {
    const resultado = await apiService.signUp(payload);
    setInfo({
        message: "Registro de usuario exitoso!",
        type: "success"
      });
    console.log("Respuesta del servidor:", resultado);
} catch (error) {
    setInfo({
          message:error,
          type: "error"
    });
    if(error == "Error: User already exists") {
      setInfo({
          message:"El usuario ya existe.",
          type: "error"
    });
    }
    
}
};

return (
<View style={styles.screenContainer}>
    <InfoBox
        message={info.message}
        type={info.type}
        onHide={clearInfo}
        duration={2000}
    />
    <ImageBackground
    source={require('../assets/images/login.png')}
    style={styles.container}
    resizeMode="cover"
    imageStyle={{ opacity: 0.7 }}
    >

    <View style={{ alignItems: "center", marginTop: 170 }}>

        {/*----------------Username---------------- */}
        <Controller
        control={control}
        name="user_name"
        rules={{ 
          required: "El nombre es obligatorio", 
          maxLength: 
          { value: 30, message: "El nombre no puede exceder los 30 caracteres" } 
        }}
        render={({ field: { onChange, value } }) => (
            <TextInput
            placeholder="Username"
            placeholderTextColor={"white"}
            style={[styles.input, errors.user_name && styles.inputError]}
            onChangeText={onChange}
            value={value}
            />
        )}
        />
        {errors.user_name && (
        <Text style={styles.error}>{errors.user_name.message}</Text>
        )}


        {/*----------------First Name---------------- */}
        <Controller
        control={control}
        name="first_name"
        rules={{ 
          required: "El nombre es obligatorio", 
          maxLength: 
          { value: 30, message: "El nombre no puede exceder los 30 caracteres" } 
        }}
        render={({ field: { onChange, value } }) => (
            <TextInput
            placeholder="Nombre"
            placeholderTextColor={"white"}
            style={[styles.input, errors.first_name && styles.inputError]}
            onChangeText={onChange}
            value={value}
            />
        )}
        />
        {errors.first_name && (
        <Text style={styles.error}>{errors.first_name.message}</Text>
        )}

        {/*---------------Last Name--------------- */}
        <Controller
        control={control}
        name="last_name"
        rules={{ 
          required: "El apellido es obligatorio",
          maxLength: 
          { value: 30, message: "El apellido no puede exceder los 30 caracteres" }
        }}
        render={({ field: { onChange, value } }) => (
            <TextInput
            placeholder="Apellido"
            placeholderTextColor={"white"}
            style={[styles.input, errors.last_name && styles.inputError]}
            onChangeText={onChange}
            value={value}
            />
        )}
        />
        {errors.last_name && (
        <Text style={styles.error}>{errors.last_name.message}</Text>
        )}

        {/*------------------Email-------------------- */}
        <Controller
        control={control}
        name="email"
        rules={{
            required: "El correo es obligatorio",
            pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Correo no válido",
            },
            maxLength: {
            value: 50,
            message: "El correo no puede exceder los 50 caracteres",
            },
        }}
        render={({ field: { onChange, value } }) => (
            <TextInput
            placeholder="ejemplo@correo.com"
            placeholderTextColor={"white"}
            style={[styles.input, errors.email && styles.inputError]}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
            />
        )}
        />
        {errors.email && (
        <Text style={styles.error}>{errors.email.message}</Text>
        )}

        {/* Password */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <View style={{ position: "relative", width: 250 }}>
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor={"white"}
                secureTextEntry={!showPassword}
                style={[
                  styles.input,
                  errors.password && styles.inputError,
                  { paddingRight: 40 },
                ]}
                onChangeText={onChange}
                value={value}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 12,
                  zIndex: 1,
                }}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 10 }}>
          <Controller
            control={control}
            name="critic"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  thumbColor={value ? "#F2B059" : "#ccc"}
                  trackColor={{ false: "#767577", true: "#F2B059" }}
                />
                <Text style={{ color: "white", marginLeft: 8 }}>¿Eres crítico?</Text>
              </>
            )}
          />
        </View>

        {/* Botón */}
        <TouchableOpacity
        style={[styles.button]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        activeOpacity={0.8}
        >
            <Text style={{ color: "white", fontSize: 18 }}>
                {isSubmitting ? "Enviando..." : "Sign Up"}
            </Text>
        </TouchableOpacity>

        {/* Enlace a login */}
        <Link href="/login" style={styles.link}>
            <Text style={{ color: "white" }}>
                ¿Ya tienes cuenta? Inicia sesión
            </Text>
        </Link>
    </View>
    </ImageBackground>
</View>
);
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#363849",
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
  },
  subtitle1: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
  },
  subtitle2: {
    fontSize: 40,
    color: "#F2B059",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.5)",
    padding: 10,
    marginBottom: 10,
    width: 250,
    height: 50,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  link: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
});
