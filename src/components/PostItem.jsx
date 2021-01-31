import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { func } from 'prop-types';

// const imgPath = require('../../assets/sample.jpg');
// const imgPath2 = require('../../assets/sample2.jpg');

export default function PostItem(props) {
  const [dataSource, setDataSource] = useState([]);
  const { onPress } = props;

  useState(() => {
    // TODO 削除
    // ダミーの投稿を表示させるための記述
    // eslint-disable-next-line
    const items = Array.apply(null, Array(60)).map((v, i) => ({
      id: i,
      src: 'https://placehold.jp/150x150.png',
    }));
    setDataSource(items);
  }, []);

  return (
    <FlatList
      data={dataSource}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.postItem} onPress={onPress}>
          <Image
            style={styles.pictureImg}
            resizeMode="contain"
            source={{ uri: item.src }}
          />
          <Text>☺ yamada taro</Text>
          <Text>2021年1月24日 22:00</Text>
          <Text>投稿のタイトル</Text>
        </TouchableOpacity>
      )}
      numColumns={2}
      keyExtractor={(item) => item.id}
    />
  );
}

PostItem.propTypes = {
  onPress: func,
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
