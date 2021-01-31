import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';

export default function MyPictureScreen(props) {
  const { navigation } = props;
  const { currentUser } = firebase.auth();

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
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
});
