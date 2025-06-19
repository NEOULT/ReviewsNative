import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/authContext.jsx';
import { ApiService } from '../services/ApiService.js';

import InfoBox from '../components/common/InfoBox.js';
import { useApiMessage } from '../hooks/useApiMessage.js';

const apiService = new ApiService();

export default function LoginScreen() {

  const [showPassword, setShowPassword] = useState(false);
  const { info, setInfo, clearInfo } = useApiMessage();
  const {logIn} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async(data) => {
    //console.log('Datos del formulario:', data);
    try {
        const result = await apiService.signIn(data);
        //console.log(result);
      
        if (!result.success) throw new Error(result.message);

        await logIn(result.data);
        setInfo({
        message: "¡Inicio de sesión exitoso!",
        type: "success"
      });

    }catch (error) {
        console.error('Error al iniciar sesion:', error);
        setInfo({
          message: "Usuario o contraseña incorrectos.",
          type: "error"
        });
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

        <View style={{ alignItems: 'center', marginTop: 300 }}>
          {/*----------------Email-------------------- */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Correo no válido',
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="ejemplo@correo.com"
                placeholderTextColor={'white'}
                style={[styles.input, errors.email && styles.inputError]}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

          {/*------------------Password----------------------*/}
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'Debe tener al menos 6 caracteres'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <View style={{ position: 'relative', width: 250 }}>
                <TextInput
                  placeholder="Contraseña"
                  placeholderTextColor={'white'}
                  secureTextEntry={!showPassword}
                  style={[styles.input, errors.password && styles.inputError, { paddingRight: 40 }]}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 12,
                    zIndex: 1,
                  }}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

          {/*----------------- Botón---------------- */}
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>
              {isSubmitting ? 'Enviando...' : 'Log In'}
            </Text>
          </TouchableOpacity>

          <Link href="/register" style={styles.link}> 
            <Text style={{ color: 'white' }}>¿No tienes cuenta? Regístrate</Text>
          </Link>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363849',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 100,
  },
  subtitle1: {
    fontSize: 40,
    color: 'white',
  },
  subtitle2: {
    fontSize: 40,
    color: '#4CCFFF',
  },
  subtitle3:{
    fontSize: 40,
    color: '#F2B059',
    fontWeight: 'bold',
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
    backgroundColor:"rgba(0,0,0,0.5)",
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red'
  },
  error: {
    color: 'red',
    marginBottom: 10
  },
  link: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor:'rgba(255, 255, 255, 0.5)',
    alignItems: 'center', 
    padding: 12, 
    borderRadius: 6, 
    marginTop: 10
  },
});