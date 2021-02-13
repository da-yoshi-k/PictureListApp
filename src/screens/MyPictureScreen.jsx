import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import PostItem from '../components/PostItem';
import Loading from '../components/Loading';

export default function MyPictureScreen(props) {
  const { navigation } = props;
  const { currentUser } = firebase.auth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);

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
            console.log(doc.id);
            if (data) {
              const userRef = db.collection('users').doc(data.postUser);
              userRef.onSnapshot((userDoc) => {
                console.log(userDoc.id);
                const user = userDoc.data();
                userPosts.push({
                  id: doc.id,
                  postImageURL: data.postImageURL,
                  userName: user.userName,
                  postTitle: data.postTitle,
                  bodyText: data.bodyText,
                  createdAt: data.createdAt.toDate(),
                });
                setPosts(userPosts);
              });
            }
          });
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
        <Loading isLoading={isLoading} />
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
