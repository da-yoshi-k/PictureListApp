import React from 'react';
import { StyleSheet, View } from 'react-native';

import PostItem from '../components/PostItem';
import CircleButton from '../components/CircleButton';

export default function PictureListScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <PostItem
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
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // paddingHorizontal: 12,
    // paddingVertical: 12,
  },
});
