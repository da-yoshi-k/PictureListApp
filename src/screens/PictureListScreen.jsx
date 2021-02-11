import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import firebase from 'firebase';

import PostItem from '../components/PostItem';
import CircleButton from '../components/CircleButton';
import Loading from '../components/Loading';

export default function PictureListScreen(props) {
  const { navigation } = props;
  const { currentUser } = firebase.auth();
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    let unsubscribe = () => {};
    setLoading(true);
    const ref = db.collection('posts').orderBy('createdAt', 'desc');
    unsubscribe = ref.onSnapshot(
      (snapshot) => {
        const allUserPosts = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const userRef = db
            .collection('users')
            .where('userId', '==', data.postUser);
          userRef.onSnapshot((userSnapshot) => {
            userSnapshot.forEach((userDoc) => {
              const user = userDoc.data();
              allUserPosts.push({
                id: doc.id,
                postImageURL: data.postImageURL,
                userName: user.userName,
                postTitle: data.postTitle,
                bodyText: data.bodyText,
                createdAt: data.createdAt.toDate(),
              });
            });
            setAllPosts(allUserPosts);
          });
        });
        setLoading(false);
      },
      () => {
        setLoading(false);
        Alert.alert('データの読み込みに失敗しました。');
      }
    );
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
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
