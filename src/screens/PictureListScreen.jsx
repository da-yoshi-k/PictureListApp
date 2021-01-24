import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const imgPath = require('../../assets/sample.jpg');
const imgPath2 = require('../../assets/sample2.jpg');

export default function PictureListScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.postItem}>
        <Image style={styles.pictureImg} resizeMode="cover" source={imgPath} />
        <Text>☺ yamada taro</Text>
        <Text>2021年1月24日 22:00</Text>
        <Text>美味しいコーヒー</Text>
      </View>
      <View style={styles.postItem}>
        <Image style={styles.pictureImg} resizeMode="cover" source={imgPath2} />
      </View>
      <View style={styles.postItem}>
        <Image
          style={styles.pictureImg}
          resizeMode="cover"
          source={{ uri: 'https://placehold.jp/120x120.png' }}
        />
      </View>
      <View style={styles.postItem}>
        <Image
          style={styles.pictureImg}
          resizeMode="cover"
          source={{ uri: 'https://placehold.jp/120x120.png' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  postItem: {
    width: '50%',
    paddingHorizontal: 8,
    height: 200,
  },
  pictureImg: {
    alignSelf: 'center',
    width: 160,
    height: 120,
  },
});
