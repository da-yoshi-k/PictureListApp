import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MyPictureScreen() {
  return (
    <View style={styles.container}>
      <Text>自分の写真リスト</Text>
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
