import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';

import Button from '../components/Button';
import { translationErrors } from '../utils';

export default function ProfileEditScreen(props) {
  const { navigation, route } = props;
  const { id, userName } = route.params;
  const [name, setName] = useState(userName);

  function handlePress() {
    const db = firebase.firestore();
    const ref = db.collection('users').doc(id);
    ref
      .set(
        {
          userName: name,
        },
        { merge: true }
      )
      .then(async () => {
        const { currentUser } = firebase.auth();
        const batch = db.batch();
        const selfPostRef = await db
          .collection(`users/${currentUser.uid}/posts`)
          .get();
        selfPostRef.docs.forEach((doc) => {
          batch.update(doc.ref, { userName: name });
        });
        await batch.commit();
        navigation.goBack();
      })
      .catch((error) => {
        const errorMsg = translationErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      });
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelText}>ユーザー名(15文字以内)</Text>
      </View>
      <View style={styles.userName}>
        <TextInput
          value={name}
          style={styles.inputUserName}
          onChangeText={(text) => {
            setName(text);
          }}
          maxLength={15}
        />
      </View>
      <Button label="変更を保存する" onPress={handlePress} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  label: {
    paddingVertical: 14,
  },
  labelText: {
    fontSize: 16,
  },
  userName: {
    paddingBottom: 14,
  },
  inputUserName: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
