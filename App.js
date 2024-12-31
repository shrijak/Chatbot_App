import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Message from "./components/Message";

export default function App() {
  const [message, setMessage] = useState();
  const [messageItems, setMessageItems] = useState([]);
  const [messageData, setmessageData] = useState([]);
  const model = "llama3.2";
  const message_data = [];

  const handleAddMessage = async () => {
    if (message == null) {
      return;
    }
    Keyboard.dismiss();
    let message_c = message;
    setMessageItems([...messageItems, message]);
    setMessage(null);
    messageData.push({
      "role": "user",
      "content": message_c,
    });
    setmessageData(messageData);
    try {
      const response = await fetch(
        "<ollama_host>/api/chat", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          "messages": messageData,
          stream: false,
        }),
      });
      const json = await response.json();
      setmessageData([...messageData, json.message]);
      setMessageItems([...messageItems, message_c, json.message.content]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messagesWrapper}>
        <Text style={styles.sectionTitle}>Chat with the BOT</Text>
        <ScrollView style={styles.items}>
          {
            messageItems.map((item, index) => {

              return (
                <Message text={item} idx={index} />
              )
            })
          }
        </ScrollView>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeMessageWrapper}>
        <TextInput style={styles.input} placeholder='Message BOT' value={message} onChangeText={text => setMessage(text)} />
        <TouchableOpacity onPress={() => handleAddMessage()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>&#10147;</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  messagesWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 15,
    marginBottom: 145,
  },
  writeMessageWrapper: {
    position: 'absolute',
    bottom: 40,
    width: "100%",
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 340,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: "center",
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
  },
});
