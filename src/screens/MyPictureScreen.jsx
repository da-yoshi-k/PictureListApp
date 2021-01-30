import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CircleButton from '../components/CircleButton';

export default function MyPictureScreen(props) {
  const { navigation } = props;
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
