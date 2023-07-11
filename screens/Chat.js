import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const allMessages = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: {
              _id: data.user._id,
              name: data.user.name,
            },
          };
        });
        setMessages(allMessages);
      });

    // Unsubscribe from the snapshot listener when component unmounts
    return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    if (messages.length > 0) {
      const newMessage = messages[0];
      console.log('newMessage:', newMessage);

      const messageData = {
        _id: newMessage._id,
        text: newMessage.text,
        createdAt: newMessage.createdAt,
        user: {
          _id: newMessage.user._id,
          name: route.params.data.name, // Access the name from route.params
        },
      };
      console.log('messageData:', messageData);

      // Update the state with the new message
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messageData)
      );

      // Save the new message to the Firestore collection
      firestore()
        .collection('chats')
        .doc(`${route.params.id}${route.params.data.userId}`)
        .collection('messages')
        .add(messageData);

      firestore()
        .collection('chats')
        .doc(`${route.params.data.userId}${route.params.id}`)
        .collection('messages')
        .add(messageData);
    }
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
