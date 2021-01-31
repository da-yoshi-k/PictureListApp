import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import PostItem from '../components/PostItem';
import CircleButton from '../components/CircleButton';

export default function PictureListScreen(props) {
  const { navigation } = props;
  const { currentUser } = firebase.auth();

  return (
    <View style={styles.container}>
      <PostItem
        onPress={() => {
          navigation.navigate('PostDetail');
        }}
      />
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
