import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';
import { dateToString } from '../utils';

export default function MyPictureScreen(props) {
  const { navigation } = props;
  const { currentUser } = firebase.auth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db.collection('users').doc(currentUser.uid);
      unsubscribe = ref.onSnapshot(
        (doc) => {
          const data = doc.data();
          if (data) {
            setUser({
              id: doc.id,
              userName: data.userName,
              createdAt: data.createdAt.toDate(),
              // TODO アイコン機能の実装
              // userIcon: data.userIcon,
            });
          }
        },
        () => {
          Alert.alert('データの読み込みに失敗しました。');
        }
      );
    }
    return unsubscribe;
  }, []);

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
      <View style={styles.profileContainer}>
        <View style={styles.label}>
          <Text style={styles.labelText}>プロフィール</Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText}>ユーザー名</Text>
        </View>
        <View style={styles.userName}>
          <Text style={styles.userNameText}>{user && user.userName}</Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText}>登録日</Text>
        </View>
        <View style={styles.registerDate}>
          <Text style={styles.registerText}>
            {user && dateToString(user.createdAt)}
          </Text>
        </View>
      </View>
      <Button
        label="プロフィールを編集"
        onPress={() => {
          navigation.navigate('ProfileEdit', {
            id: user.id,
            userName: user.userName,
          });
        }}
      />
      <Button
        label="ログアウト"
        onPress={handlePress}
        buttonStyle={styles.logoutButton}
        labelStyle={styles.logoutLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  profileContainer: {
    paddingBottom: 20,
  },
  label: {
    paddingVertical: 12,
  },
  labelText: {
    color: '#777777',
    fontSize: 18,
  },
  userName: {
    paddingHorizontal: 12,
  },
  userNameText: {
    fontSize: 16,
  },
  registerDate: {
    paddingHorizontal: 12,
  },
  registerText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFA500',
    borderWidth: 2,
  },
  logoutLabel: {
    color: '#FFA500',
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
