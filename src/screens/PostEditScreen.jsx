import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';

import Button from '../components/Button';
import { translationErrors } from '../utils';

export default function PostEditScreen(props) {
  const { navigation, route } = props;
  const { id, postImageURL, postTitle, bodyText } = route.params;
  const [title, setTitle] = useState(postTitle);
  const [body, setBody] = useState(bodyText);

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
    // 投稿の保存
    const db = firebase.firestore();
    const ref = db.collection('posts').doc(id);
    ref
      .set(
        {
          postUser: currentUser.uid,
          postTitle: title ? title : 'タイトルなし',
          bodyText: body ? body : '本文なし',
        },
        { merge: true }
      )
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
        <Image
          style={styles.postPictureImg}
          resizeMode="contain"
          source={{ uri: postImageURL }}
        />
      </View>
      <View style={styles.postTitle}>
        <Text>タイトル(20文字以内)</Text>
        <TextInput
          value={title}
          style={styles.inputTitle}
          onChangeText={(text) => {
            setTitle(text);
          }}
          maxLength={20}
        />
      </View>
      <View style={styles.postBody}>
        <Text>本文(400文字以内)</Text>
        <TextInput
          value={body}
          style={styles.inputBody}
          onChangeText={(text) => {
            setBody(text);
          }}
          multiline
          maxLength={400}
        />
      </View>
      <Button label="変更を保存する" onPress={handlePress} />
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
