import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';

import Button from '../components/Button';
import { translationErrors } from '../utils';

const img = require('../../assets/sample.jpg');

export default function PostCreateScreen(props) {
  const [postTitle, setPostTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const { navigation } = props;

  useEffect(() => {
    const parent = props.navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  function handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`posts`);
    ref
      .add({
        postUser: currentUser.uid,
        postTitle,
        bodyText,
        createdAt: new Date(),
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        const errorMsg = translationErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      });
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.postImg}>
        <Text>写真を登録してください</Text>
        <Image
          style={styles.postPictureImg}
          resizeMode="contain"
          source={img}
        />
      </View>
      <View style={styles.postTitle}>
        <Text>タイトル</Text>
        <TextInput
          value={postTitle}
          style={styles.inputTitle}
          onChangeText={(text) => {
            setPostTitle(text);
          }}
        />
      </View>
      <View style={styles.postBody}>
        <Text>本文</Text>
        <TextInput
          value={bodyText}
          style={styles.inputBody}
          onChangeText={(text) => {
            setBodyText(text);
          }}
          multiline
        />
      </View>
      <Button label="投稿する" onPress={handlePress} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  postPictureImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 240,
  },
  sendButton: {
    height: 48,
  },
  postTitle: { paddingBottom: 10 },
  inputTitle: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 10,
    paddingBottom: 4,
  },
  postBody: {
    paddingBottom: 10,
  },
  inputBody: {
    textAlignVertical: 'top',
    height: 100,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
