import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import firebase from 'firebase';

import PostItem from '../components/PostItem';
import CircleButton from '../components/CircleButton';

export default function PictureListScreen(props) {
  const { navigation } = props;
  const { currentUser } = firebase.auth();
  const [allPosts, setAllPosts] = useState([]);
  const [userName, setUserName] = useState('');

  function userSearch(userId) {
    const db = firebase.firestore();
    const ref = db.collectionGroup('users').where('userId', '==', userId);
    ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        setUserName(data.userName);
        return;
      });
    });
    return;
  }

  useEffect(() => {
    const db = firebase.firestore();
    let unsubscribe = () => {};
    const ref = db.collection('posts').orderBy('createdAt', 'desc');
    unsubscribe = ref.onSnapshot(
      (snapshot) => {
        const allUserPosts = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          userSearch(data.postUser);
          allUserPosts.push({
            id: doc.id,
            postImageURL: data.postImageURL,
            userName: userName,
            postTitle: data.postTitle,
            bodyText: data.bodyText,
            createdAt: data.createdAt.toDate(),
          });
        });
        setAllPosts(allUserPosts);
      },
      () => {
        Alert.alert('データの読み込みに失敗しました。');
      }
    );
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <PostItem posts={allPosts} />
      {/* 投稿ボタンはログイン時にのみ表示 */}
      {currentUser && (
        <CircleButton
          name="plus"
          onPress={() => {
            navigation.navigate('PostCreate');
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
