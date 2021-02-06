import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';
import { dateToString } from '../utils';

let postImageURL = null;

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
      if (data) {
        data.postTitle ? data.postTitle : (data.postTitle = 'タイトルなし');
        data.bodyText ? data.bodyText : (data.bodyText = '本文なし');
        postImageURL = data.postImageURL;
        setPost({
          id: doc.id,
          postImageURL: data.postImageURL,
          postUser: data.postUser,
          postTitle: data.postTitle,
          bodyText: data.bodyText,
          createdAt: data.createdAt.toDate(),
        });
      }
    });
    return unsubscribe;
  }, []);

  function deletePost(id) {
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection('posts').doc(id);
      Alert.alert('投稿を削除します', 'よろしいですか？', [
        {
          text: 'キャンセル',
          onPress: () => {},
        },
        {
          text: '削除する',
          style: 'destructive',
          onPress: () => {
            ref
              .delete()
              .then(() => {
                navigation.goBack();
              })
              .catch(() => {
                Alert.alert('削除に失敗しました');
              });
          },
        },
      ]);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postTitle}>
        <Text style={styles.postTitleText}>{post && post.postTitle}</Text>
      </View>
      <View style={styles.postDate}>
        <Text style={styles.postDateText}>
          {post && dateToString(post.createdAt)}
        </Text>
      </View>
      <View style={styles.postImg}>
        <Image
          style={styles.postPictureImg}
          resizeMode="contain"
          source={{ uri: postImageURL }}
        />
      </View>
      <View style={styles.postBody}>
        <Text style={styles.bodyText}>{post && post.bodyText}</Text>
      </View>
      <View style={styles.controlButton}>
        <Button
          label="編集"
          onPress={() => {
            navigation.navigate('PostEdit', {
              id: post.id,
              postImageURL: post.postImageURL,
              postTitle: post.postTitle,
              bodyText: post.bodyText,
            });
          }}
        />
        <Button
          label="削除"
          onPress={() => {
            deletePost(post.id);
          }}
          buttonStyle={styles.deleteButton}
          labelStyle={styles.deleteLabel}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 500,
  },
  postPictureImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 240,
  },
  postTitle: {
    paddingBottom: 10,
  },
  postTitleText: {
    fontSize: 20,
    color: '#666666',
  },
  postBody: {
    paddingBottom: 30,
  },
  bodyText: {
    fontSize: 16,
  },
  controlButton: {
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#ED5565',
    borderWidth: 2,
    marginLeft: 30,
  },
  deleteLabel: {
    color: '#ED5565',
  },
});
