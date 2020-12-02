import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const PlusSymbol: React.FC = () => (
  <>
    <Text style={Styles.text}>+</Text>
  </>
);

const Styles = StyleSheet.create({
  text: {
    paddingHorizontal: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    borderRadius: 100,
    borderWidth: 1,
    marginVertical: 4,
  }
});
