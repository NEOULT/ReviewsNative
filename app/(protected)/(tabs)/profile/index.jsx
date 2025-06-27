import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageSelector from '../../../../components/ImagePicker';
import EditModal from '../../../../components/ModalProfile';
import { AuthContext } from '../../../../context/authContext';
import { ApiService } from '../../../../services/ApiService';


const api = new ApiService();

const ProfileScreen = () => {

    const { logOut, token} = useContext(AuthContext);

    api.setToken(token);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.getUserProfile();

                if(response.success) {
                    setProfileData({
                        user_name: response.data.user.user_name,
                        first_name: response.data.user.first_name,
                        last_name: response.data.user.last_name,
                        avatar: response.data.user.avatar || 'https://i.postimg.cc/MHw8VCDs/Captura-de-pantalla-2025-06-21-100631.png',
                        email: response.data.user.email,
                    });
                }

            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfile();
    }, [handleSave]);

    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        title: '',
        fields: [],
        onSubmit: () => {},
        submitButtonText: 'Save',
        dangerAction: false
    });

    const [profileData, setProfileData] = useState({});

    const onLogout = () => {
        logOut();
        console.log("User logged out");
        router.navigate('/login');
    };

    const openEditModal = (config) => {
        setModalConfig(config);
        setModalVisible(true);
    };

    const handleSave = async (newValues) => {
        setProfileData(prev => ({ ...prev, ...newValues }));

        try{
            const response = await api.updateProfile(newValues);
            
            if(response.success) {
                console.log("Profile updated successfully:", response.data);
            }
            
        }catch (error) {
            console.error("Error saving profile data:", error);
        }
        
    };

    const handleDelete = async (password) => {
        try {
            const response = await api.deleteProfile(password);
            if(response.success) {
                console.log("Account deleted successfully");
                logOut();
                router.navigate('/login');
            } 
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const ProfileItem = ({label, value, fieldName, fields = null}) => {
        return (
        <View style={styles.infoRow}>
            <View style={styles.infoText}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
            <TouchableOpacity onPress={() => openEditModal({
                title: `Edit ${label}`,
                fields: fields || [{
                    name: fieldName,
                    label: label,
                    value: value,
                    placeholder: `Enter your ${label.toLowerCase()}`
                }],
                onSubmit: handleSave
            })}>
                <Feather name="edit-2" size={18} color="#C3C3C3" />
            </TouchableOpacity>
        </View>
        );
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <MaterialIcons name="logout" size={22} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Profile</Text>
        </View>

        <ImageSelector
            style={styles.avatar}
        />
        
        <View style={styles.profileSection}>
            <ProfileItem
                label="Username"
                value={profileData.user_name}
                fieldName="user_name"
                fields={[
                    {
                        name: 'user_name',
                        label: 'Username',
                        value: profileData.user_name,
                        placeholder: 'Enter your username',
                        validate: v => {
                            if (v.length < 3) return 'Debe tener al menos 3 caracteres';
                            if (v.length > 30) return 'No puede exceder los 30 caracteres';
                            if (!/^[a-zA-Z0-9_]+$/.test(v)) return 'Solo se permiten letras, números y guiones bajos';
                            return true;
                        }
                    }
                ]}
            />
            <ProfileItem
                label="Name"
                value={profileData.first_name + ' ' + profileData.last_name}
                fieldName="name"
                fields={[
                    {
                    name: 'first_name',
                    label: 'First Name',
                    value: profileData.first_name,
                    placeholder: 'Enter your first name',
                    validate: v => {
                            if (v.length < 3) return 'Debe tener al menos 3 caracteres';
                            if (v.length > 30) return 'No puede exceder los 30 caracteres';
                            return true;
                        }
                    },
                    {
                    name: 'last_name',
                    label: 'Last Name',
                    value: profileData.last_name,
                    placeholder: 'Enter your last name',
                    validate: v => {
                            if (v.length < 3) return 'Debe tener al menos 3 caracteres';
                            if (v.length > 30) return 'No puede exceder los 30 caracteres';
                            return true;
                        }
                    }
                ]}
            />
            <ProfileItem
                label="Email"
                value={profileData.email}
                fieldName="email"
                fields={[
                    {
                    name: 'email',
                    label: 'Email',
                    value: profileData.email,
                    placeholder: 'Enter your email',
                    validate: v => {
                            if (v.length < 3) return 'Debe tener al menos 3 caracteres';
                            if (v.length > 20) return 'No puede exceder los 20 caracteres';
                            if (!/\S+@\S+\.\S+/.test(v)) return 'Email inválido';
                            return true;
                        }
                    }
                ]}
            />
        </View>
        
        <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.7}
            onPress={() => openEditModal({
                title: "Change Password",
                fields: [
                    {
                        name: 'current_password',
                        label: 'Current Password',
                        placeholder: 'Enter current password',
                        secureTextEntry: false,
                        validate: v => v.length >= 6 || 'Debe tener al menos 6 caracteres'
                    },
                    {
                        name: 'new_password',
                        label: 'New Password',
                        placeholder: 'Enter new password',
                        secureTextEntry: false,
                        validate: v => v.length >= 6 || 'Debe tener al menos 6 caracteres'
                    },
                    {
                        name: 'confirmPassword',
                        label: 'Confirm Password',
                        placeholder: 'Confirm new password',
                        secureTextEntry: false,
                        validate: (v, values) => v === values.new_password || 'Las contraseñas no coinciden'
                    }
                ],
                onSubmit: handleSave,
                submitButtonText: 'Change Password'
            })}
        >
            <Text style={styles.buttonText}>Change password</Text>
            <Feather name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
            style={[styles.button, styles.deleteButton]} 
            activeOpacity={0.7}
            onPress={() => openEditModal({
                title: "Delete Account",
                fields: [{
                    name: 'password',
                    label: 'Password',
                    placeholder: 'Enter your password to confirm',
                    secureTextEntry: true
                }],
                onSubmit: (values) => {
                    handleDelete(values.password);
                },
                submitButtonText: 'Delete Account',
                dangerAction: true
            })}
        >
            <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete account</Text>
            <Feather name="chevron-right" size={20} color="#FF3B30" />
        </TouchableOpacity>

        <EditModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title={modalConfig.title}
            fields={modalConfig.fields}
            onSubmit={modalConfig.onSubmit}
            submitButtonText={modalConfig.submitButtonText}
            dangerAction={modalConfig.dangerAction}
        />
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 40,
        position: 'relative',
    },
    header: {
        marginBottom: 20,
    },
    avatar: { 
        borderRadius: 100, 
        transform: [{ scale: 1.3 }], 
        marginVertical: 30, 
        alignSelf: 'center' 
    },
    profileSection: {
        marginVertical: 20,
        backgroundColor: '#0D354A',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 10,
    },
    infoText: {
        marginLeft: 5,
        flex: 1,
    },
    label: {
        fontSize: 13,
        color: '#C3C3C3',
    },
    value: {
        fontSize: 16,
        color: 'white',
        marginTop: 3,
        overflow: 'hidden',
    },
    button: {
        backgroundColor: '#0D354A',
        padding: 16,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    deleteButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    deleteButtonText: {
        color: '#FF3B30',
    },
    logoutButton: {
            position: 'absolute',
            top: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8,
            zIndex: 10,
        },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 4,
        fontSize: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
});

export default ProfileScreen;