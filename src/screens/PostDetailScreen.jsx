import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';

const img = require('../../assets/sample.jpg');

export default function PostDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const { currentUser } = firebase.auth();

  useEffect(() => {
    let unsubscribe = () => {};
    const db = firebase.firestore();
    const ref = db.collection('posts').doc(id);
    unsubscribe = ref.onSnapshot((doc) => {
      const data = doc.data();
      setPost({
        id: doc.id,
        postUser: data.postUser,
        postTitle: data.postTitle,
        bodyText: data.bodyText,
        createdAt: data.createdAt.toDate(),
      });
    });
    return unsubscribe;
  }, []);

  function deletePost(id) {
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection('post').doc(id);
      Alert.alert('投稿を削除します', 'よろしいですか？', [
        {
          text: 'キャンセル',
          onPress: () => {},
        },
        {
          text: '削除する',
          style: 'destructive',
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert('削除に失敗しました');
            });
          },
        },
      ]);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text>投稿詳細</Text>
      <View style={styles.postImg}>
        <Image
          style={styles.postPictureImg}
          resizeMode="contain"
          source={img}
        />
      </View>
      <View style={styles.postTitle}>
        <Text>{post && post.postTitle}</Text>
      </View>
      <View style={styles.postBody}>
        <Text>{post && post.bodyText}</Text>
      </View>
      <Button
        label="編集"
        onPress={() => {
          navigation.navigate('PostEdit', { id: post.id });
        }}
      />
      <Button
        label="削除"
        onPress={() => {
          deletePost(post.id);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 32,
    // paddingBottom: 500,
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
