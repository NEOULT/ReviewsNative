import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const EditModal = ({
    visible,
    onClose,
    title,
    fields,
    onSubmit,
    submitButtonText = 'Save',
    dangerAction = false
}) => {
    const [formValues, setFormValues] = useState(
        fields.reduce((acc, field) => {
            acc[field.name] = field.value || '';
            return acc;
        }, {})
    );
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormValues(
            fields.reduce((acc, field) => {
                acc[field.name] = field.value || '';
                return acc;
            }, {})
        );
        setErrors({});
    }, [fields, visible]);

    const handleInputChange = (name, value) => {
        setFormValues(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = () => {
        let valid = true;
        let newErrors = {};
        fields.forEach(field => {
            if (field.validate) {
                const result = field.validate(formValues[field.name], formValues);
                if (result !== true) {
                    valid = false;
                    newErrors[field.name] = result;
                }
            }
        });
        setErrors(newErrors);
        if (!valid) return;
        onSubmit(formValues);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalBody}>
                        {fields.map((field) => (
                            <View key={field.name} style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>{field.label}</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        dangerAction && styles.dangerInput,
                                        errors[field.name] && { borderColor: '#FF3B30' }
                                    ]}
                                    value={formValues[field.name]}
                                    onChangeText={(text) => handleInputChange(field.name, text)}
                                    placeholder={field.placeholder}
                                    secureTextEntry={field.secureTextEntry || false}
                                    keyboardType={field.keyboardType || 'default'}
                                    autoCapitalize={field.autoCapitalize || 'sentences'}
                                />
                                {errors[field.name] && (
                                    <Text style={{ color: '#FF3B30', fontSize: 13, marginTop: 2 }}>
                                        {errors[field.name]}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            dangerAction && styles.dangerButton
                        ]}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitButtonText}>{submitButtonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0D354A',
    },
    modalBody: {
        marginBottom: 5,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    dangerInput: {
        borderColor: '#FF3B30',
        backgroundColor: '#FFF9F9',
    },
    submitButton: {
        backgroundColor: '#0D354A',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    dangerButton: {
        backgroundColor: '#FF3B30',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditModal;