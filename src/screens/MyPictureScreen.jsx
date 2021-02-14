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
            if (data) {
              userPosts.push({
                id: doc.id,
                postUser: data.postUser,
                postImageURL: data.postImageURL,
                userName: data.userName,
                postTitle: data.postTitle,
                bodyText: data.bodyText,
                createdAt: data.createdAt.toDate(),
              });
            }
          });
          setPosts(userPosts);
        },
        (error) => {
          Alert.alert(error.toString());
        }
      );
    }
    return unsubscribe;
  }, []);

  if (!currentUser) {
    return (
      <View style={notLoggedInStyles.container}>
        <Text style={notLoggedInStyles.innerText}>
          ログインして自分の投稿を確認しよう！
        </Text>
        <Text style={notLoggedInStyles.innerText}>
          プロフィールからユーザー登録してね
        </Text>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Text style={emptyStyles.innerText}>まだ自分の投稿がありません</Text>
        <Text style={emptyStyles.innerText}>
          右下の＋ボタンから投稿してみよう！
        </Text>
        <CircleButton
          name="plus"
          onPress={() => {
            navigation.navigate('PostCreate');
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PostItem posts={posts} />
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

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerText: {
    fontSize: 18,
    color: '#666666',
  },
});

const notLoggedInStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerText: {
    fontSize: 18,
    color: '#666666',
  },
});
