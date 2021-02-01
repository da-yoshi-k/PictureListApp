import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import PostItem from '../components/PostItem';

export default function MyPictureScreen(props) {
  const { navigation } = props;
  const { currentUser } = firebase.auth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db
        .collectionGroup('posts')
        .where('postUser', '==', `${currentUser.uid}`)
        .orderBy('createdAt', 'desc');
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userPosts = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            userPosts.push({
              id: doc.id,
              postTitle: data.postTitle,
              bodyText: data.bodyText,
              createdAt: data.createdAt.toDate(),
            });
          });
          setPosts(userPosts);
        },
        (error) => {
          Alert.alert(error.toString());
          console.log(error.toString());
        }
      );
    }
    return unsubscribe;
  }, []);

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text>ログインして自分の投稿を確認しよう！</Text>
        <Text>プロフィールからユーザー登録してね</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>自分の写真リスト</Text>
      <PostItem
        posts={posts}
        onPress={() => {
          navigation.navigate('PostDetail');
        }}
      />
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate('PostCreate');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
