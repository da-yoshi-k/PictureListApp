import React from 'react';
import { StyleSheet, View } from 'react-native';
import PostItem from '../components/PostItem';

export default function PictureListScreen() {
  return (
    <View style={styles.container}>
      <PostItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // paddingHorizontal: 12,
    // paddingVertical: 12,
  },
});
