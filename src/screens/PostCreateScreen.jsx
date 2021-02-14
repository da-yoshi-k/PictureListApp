import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';

import Button from '../components/Button';
import { translationErrors } from '../utils';

export default function PostCreateScreen(props) {
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [userName, setUserName] = useState('');
  const { navigation } = props;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      setImageBlob(blob);
    }
  };

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

  useEffect(() => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    let unsubscribe = () => {};
    const ref = db.collection('users').doc(currentUser.uid);
    unsubscribe = ref.onSnapshot((doc) => {
      const data = doc.data();
      setUserName(data.userName);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('カメラの許可がないと実行できません');
        }
      }
    })();
  }, []);

  function handlePress() {
    const { currentUser } = firebase.auth();
    // 写真のアップロード
    const filename = [...Array(Math.ceil(36 / 9))]
      .map(() => Math.random().toString(36).split('.')[1])
      .join('')
      .slice(-36);
    const storageRef = firebase
      .storage()
      .ref()
      .child('images/' + filename);
    const putTask = storageRef.put(imageBlob);
    putTask.on(
      'state_changed',
      () => {},
      () => {
        alert('アップロードに失敗しました。サイズが大きいとか。');
      },
      () => {
        putTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // 投稿の保存
          const db = firebase.firestore();
          const ref = db.collection(`users/${currentUser.uid}/posts`);
          ref
            .add({
              postUser: currentUser.uid,
              userName: userName,
              postImageURL: downloadURL,
              postImageFileName: filename,
              postTitle: postTitle ? postTitle : 'タイトルなし',
              bodyText: bodyText ? bodyText : '本文なし',
              createdAt: new Date(),
            })
            .then(() => {
              navigation.goBack();
            })
            .catch((error) => {
              const errorMsg = translationErrors(error.code);
              Alert.alert(errorMsg.title, errorMsg.description);
            });
        });
      }
    );
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          投稿する写真を選択してください
        </Text>
      </View>
      <Button
        label={'写真の選択'}
        onPress={pickImage}
        buttonStyle={styles.imageButton}
        labelStyle={styles.imageLabel}
      />
      <View style={styles.postImg}>
        {image && (
          <Image
            style={styles.postPictureImg}
            resizeMode="contain"
            source={{ uri: image }}
          />
        )}
      </View>
      <View style={styles.postTitle}>
        <Text>タイトル(20文字以内)</Text>
        <TextInput
          value={postTitle}
          style={styles.inputTitle}
          onChangeText={(text) => {
            setPostTitle(text);
          }}
          maxLength={20}
        />
      </View>
      <View style={styles.postBody}>
        <Text>本文(400文字以内)</Text>
        <TextInput
          value={bodyText}
          style={styles.inputBody}
          onChangeText={(text) => {
            setBodyText(text);
          }}
          multiline
          maxLength={400}
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
  description: {
    paddingVertical: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
  },
  imageButton: {
    backgroundColor: '#FFFFFF',
  },
  imageLabel: {
    color: '#FFA500',
  },
  postImg: {
    paddingBottom: 10,
  },
  postPictureImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 240,
  },
  postTitle: { paddingVertical: 10 },
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
