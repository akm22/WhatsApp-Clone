import { View, StyleSheet, TextInput } from 'react-native'; 
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; 
import { useState } from 'react'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const InputBox = () => {
    
    const[newMessage, setNewMessage] = useState('');

    const onSend = () => {
        console.warn('Sending a new message: ', newMessage);
        setNewMessage(''); 
    }; 

    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            {/* Icon */}
            <AntDesign 
            name='plus' 
            size={22} 
            color='royalblue' />
            {/* Text Input */}
            <TextInput 
            value={newMessage} 
            onChangeText={setNewMessage} 
            style={styles.input} 
            placeholder='type your message...'/>
            {/* Icon */}
            <MaterialIcons 
            onPress={onSend} 
            style={styles.send} 
            name="send" size={16} color='white'/>
        </SafeAreaView>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        backgroundColor: 'whitesmoke', 
        padding: 5,
        paddingHorizontal: 10, 
        alignItems: 'center',
    },
    input: {
        flex: 1, 
        backgroundColor: 'white', 
        padding: 5, 
        borderRadius: 15, 
        paddingHorizontal: 10, 
        borderColor: 'gray', 
        borderWidth: StyleSheet.hairlineWidth, 
        marginHorizontal: 10, 
    },
    send: {
        backgroundColor: 'royalblue', 
        padding: 7,
        borderRadius: 15,
        overflow: 'hidden', 
    }, 
}); 

export default InputBox; 