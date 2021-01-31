import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { func, shape, string, instanceOf, arrayOf } from 'prop-types';

import { dateToString } from '../utils';

const img = require('../../assets/sample.jpg');

export default function PostItem(props) {
  const { onPress, posts } = props;

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.postItem} onPress={onPress}>
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
  onPress: func,
  posts: arrayOf(
    shape({
      id: string,
      postTitle: string,
      bodyText: string,
      createdAt: instanceOf(Date),
    })
  ).isRequired,
};

PostItem.defaultProps = {
  onPress: null,
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
