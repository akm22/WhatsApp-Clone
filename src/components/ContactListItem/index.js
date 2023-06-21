import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getCommonChatRoomWithUser } from "../../services/chatRoomService"; 

const ContactListItem = ({ user }) => {
    const navigation = useNavigation();

    const onPress = async () => {
        // Check if we already have a Chatroom with User
        const existingChatRoom = await getCommonChatRoomWithUser(user.id);
        if (existingChatRoom) {
            navigation.navigate("Chat", {id: existingChatRoom.id}); 
            return;
        }

        // Create a new Chatroom 
        const newChatRoomData = await API.graphql(
            graphqlOperation(createChatRoom, { input: {} }));
        console.log(newChatRoomData);
        if (!newChatRoomData.data?.createChatRoom) {
            console.log("Error creating the Chatroom");
        }
        const newChatRoom = newChatRoomData.data?.createChatRoom;
        // Add clicked user to this Chatroom
        await API.graphql(graphqlOperation(createUserChatRoom, {
            input: { 
                chatRoomId: newChatRoom.id, 
                userId: user.id 
                }
        })
        );

        // Add the Auth user to the Chatroom
        const authUser = await Auth.currentAuthenticatedUser();
        await API.graphql(graphqlOperation(createUserChatRoom, {
            input: { 
                chatRoomId: newChatRoom.id, 
                userId: authUser.attributes.sub 
            }
        })
        );

        // Navigate to the new Chatroom
        navigation.navigate("Chat", {id: newChatRoom.id}); 
    };

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image
                source={{ uri: user.image }}
                style={styles.image} />
            <View style={styles.content}>
                <Text numberOfLines={1} style={styles.name}>
                    {user.name}
                </Text>

                <Text numberOfLines={2} style={styles.subTitle}>
                    {user.status}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        height: 70,
        alignItems: 'center',

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
    },
    subTitle: {
        color: 'gray',
    },
});

export default ContactListItem; 