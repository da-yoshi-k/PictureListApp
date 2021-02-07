import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';

export default function MyPictureScreen(props) {
  const { navigation } = props;
  const { currentUser } = firebase.auth();
  function handlePress() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Profile' }],
        });
      })
      .catch(() => {
        Alert.alert('ログアウトに失敗しました');
      });
  }
  if (!currentUser) {
    return (
      <View style={notLoggedInStyles.container}>
        <Text style={notLoggedInStyles.innerText}>
          ログインしてプロフィールを作成しよう！
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LogIn' }],
            });
          }}
        >
          <Text style={notLoggedInStyles.linkText}>ログインはこちら</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>プロフィール</Text>

      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <Text style={styles.label}>ログアウト</Text>
      </TouchableOpacity>
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

const notLoggedInStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerText: {
    fontSize: 18,
    color: '#666666',
  },
  linkText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#FFA500',
  },
});
