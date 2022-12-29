import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { VERTICAL_PADDING_DEFAULT } from '../../../constants';

export interface SecondaryButtonProps {
  currentPage?: number;
  onPress: () => void;
  style?: ViewStyle;
  totalPages?: number;
  text: string;
}

export const SecondaryButton: FC<SecondaryButtonProps> = ({
                                                      currentPage,
                                                      onPress,
                                                      style,
                                                      totalPages,
                                                      text,
                                                      ...props
                                                    }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 32,
    marginBottom: VERTICAL_PADDING_DEFAULT,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 16,
  },
});