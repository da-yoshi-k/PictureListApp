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
            navigation.navigate('PostDetail', {
              id: item.id,
              userId: item.postUser,
            });
          }}
        >
          <View style={styles.postImage}>
            <Image
              style={styles.pictureImg}
              resizeMode="contain"
              source={{ uri: item.postImageURL }}
            />
          </View>
          <View style={styles.postTitle}>
            <Text style={styles.postTitleText}>{item.postTitle}</Text>
          </View>
          <View style={styles.userName}>
            <Text style={styles.userNameText}>{item.userName}</Text>
          </View>
          <Text>{dateToString(item.createdAt)}</Text>
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
      postUser: string,
      postImageURL: string,
      userName: string,
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
    height: 210,
  },
  postImage: {
    paddingBottom: 5,
  },
  pictureImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 120,
  },
  postTitle: {
    width: 160,
    paddingHorizontal: 2,
  },
  postTitleText: {
    fontSize: 14,
    color: '#111111',
  },
  userName: {
    width: 160,
    paddingHorizontal: 2,
  },
  userNameText: {
    fontSize: 12,
    color: '#666666',
  },
});
