import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { func, shape, string } from 'prop-types';

export default function Button(props) {
  const { label, onPress, buttonStyle, labelStyle } = props;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  label: string.isRequired,
  onPress: func,
  buttonStyle: shape(),
  labelStyle: shape(),
};

Button.defaultProps = {
  onPress: null,
  buttonStyle: null,
  labelStyle: null,
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#FFA500',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFA500',
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: '#FFFFFF',
  },
});
