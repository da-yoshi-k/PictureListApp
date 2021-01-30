import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PostDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>投稿詳細</Text>
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
