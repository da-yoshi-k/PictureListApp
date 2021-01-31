import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase';

import PictureListScreen from './src/screens/PictureListScreen';
import MyPictureScreen from './src/screens/MyPictureScreen';
import PostCreateScreen from './src/screens/PostCreateScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LogInScreen';
import Logo from './src/components/Logo';

import { firebaseConfig } from './env';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// expoでのAndroidのメッセージを無視
LogBox.ignoreLogs(['Setting a timer']);

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// ヘッダー設定
const screenOptions = {
  headerStyle: { backgroundColor: '#F5D97E' },
  headerTitleStyle: { color: '#FFFFFF' },
  headerTitle: (props) => <Logo />,
  headerTitleAlign: 'center',
  headerTintColor: '#FFFFFF',
  headerBackTitle: 'Back',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
};

// 投稿一覧
function PictureListStacks() {
  return (
    <Stack.Navigator
      initialRouteName="PictureListScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Home" component={PictureListScreen} />
      <Stack.Screen name="PostCreate" component={PostCreateScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
}

// 自分の投稿
function MyPictureStacks() {
  return (
    <Stack.Navigator
      // initialRouteName="PostCreateScreen"
      initialRouteName="MyPictureScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="MyHome" component={MyPictureScreen} />
      <Stack.Screen name="PostCreate" component={PostCreateScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
}

// プロフィール
function ProfileStacks() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="LogIn" component={LogInScreen} />
    </Stack.Navigator>
  );
}

// アプリケーション
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="投稿一覧"
          component={PictureListStacks}
          options={{
            tabBarIcon: () => <Feather name="grid" size={26} />,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="自分の投稿"
          component={MyPictureStacks}
          options={{
            tabBarIcon: () => <Feather name="image" size={26} />,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="プロフィール"
          component={ProfileStacks}
          options={{
            tabBarIcon: () => <Feather name="user" size={26} />,
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
