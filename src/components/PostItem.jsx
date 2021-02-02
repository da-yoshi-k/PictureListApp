import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { shape, string, instanceOf, arrayOf } from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import { dateToString } from '../utils';

const img = require('../../assets/sample.jpg');

export default function PostItem(props) {
  const { posts } = props;
  const navigation = useNavigation();

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.postItem}
          onPress={() => {
            navigation.navigate('PostDetail', { id: item.id });
          }}
        >
          <Image style={styles.pictureImg} resizeMode="contain" source={img} />
          <Text>☺ yamada taro</Text>
          <Text>{dateToString(item.createdAt)}</Text>
          <Text>{item.postTitle}</Text>
        </TouchableOpacity>
      )}
      numColumns={2}
      keyExtractor={(item) => item.id}
    />
  );
}

PostItem.propTypes = {
  posts: arrayOf(
    shape({
      id: string,
      postTitle: string,
      bodyText: string,
      createdAt: instanceOf(Date),
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  postItem: {
    flex: 1,
    flexDirection: 'column',
    width: '50%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    height: 200,
  },
  pictureImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 120,
  },
});
