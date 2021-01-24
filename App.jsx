import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import PictureListScreen from './src/screens/PictureListScreen';
import MyPictureScreen from './src/screens/MyPictureScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PictureListStacks() {
  return (
    <Stack.Navigator
      initialRouteName="PictureListScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#039be5' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTitle: '写真一覧',
        headerTintColor: '#FFFFFF',
        headerBackTitle: 'Back',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="Home" component={PictureListScreen} />
    </Stack.Navigator>
  );
}

function MyPictureStacks() {
  return (
    <Stack.Navigator
      initialRouteName="MyPictureScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#8CD790' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTitle: '自分の投稿',
        headerTintColor: '#FFFFFF',
        headerBackTitle: 'Back',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="Home" component={MyPictureScreen} />
    </Stack.Navigator>
  );
}

function ProfileStacks() {
  return (
    <Stack.Navigator
      initialRouteName="MyPictureScreen"
      screenOptions={{
        headerStyle: { backgroundColor: '#FFBC61' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTitle: 'プロフィール',
        headerTintColor: '#FFFFFF',
        headerBackTitle: 'Back',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="Home" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="写真一覧"
          component={PictureListStacks}
          options={{
            tabBarIcon: () => <Feather name="grid" size={26} />,
          }}
        />
        <Tab.Screen
          name="自分の投稿"
          component={MyPictureStacks}
          options={{
            tabBarIcon: () => <Feather name="image" size={26} />,
          }}
        />
        <Tab.Screen
          name="プロフィール"
          component={ProfileStacks}
          options={{
            tabBarIcon: () => <Feather name="user" size={26} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
