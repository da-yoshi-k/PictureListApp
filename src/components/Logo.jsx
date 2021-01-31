import React from 'react';
import { Image } from 'react-native';

const logo = require('../../assets/logos/banner.png');

export default function Logo() {
  return (
    <Image
      source={logo}
      style={{
        width: 180,
        height: 42,
      }}
    />
  );
}
