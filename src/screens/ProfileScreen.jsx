import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MyPictureScreen() {
  return (
    <View style={styles.container}>
      <Text>プロフィール</Text>
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
