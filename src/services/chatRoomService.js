import { API, graphqlOperation, Auth } from 'aws-amplify';

export const getCommonChatRoomWithUser = async (userID) => {
    const authUser = await Auth.currentAuthenticatedUser();

    // get all chatrooms of user1 
    const response = await API.graphql(graphqlOperation(
        listChatRooms, { id: authUser.attributes.sub }
    ));

    const chatRooms = response.data?.getUser?.chatRooms?.items || [];

    const chatRoom = chatRooms.find((chatRoomItem) => {
    return (
      chatRoomItem.chatRoom.users.items.length === 2 &&
      chatRoomItem.chatRoom.users.items.some(
        (userItem) => userItem.user.id === userID
      )
    );
  });

  return chatRoom;

};

export const listChatRooms = `
query GetUser($id: ID!) {
    getUser(id: $id) {
    id
    ChatRooms {
      items {
        chatRoom {
          id
          users {
            items {
              id
              user {
                id
              }
            }
          }
        }	
      }
    }
  }
}
`; 