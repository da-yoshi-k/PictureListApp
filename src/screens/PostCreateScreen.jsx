import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const img = require('../../assets/sample.jpg');

export default function PostCreateScreen(props) {
  const [postTitle, setPostTitle] = useState('');
  const [bodyText, setBodyText] = useState('');

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
      {/* <Text style={styles.sendButton}>OK</Text> */}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  postTitle: {},
  inputTitle: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  postBody: {
    paddingBottom: 10,
  },
  inputBody: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
