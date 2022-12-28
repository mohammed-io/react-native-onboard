import React from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, ViewStyle } from 'react-native';
import { FC } from 'react';
import { CONTINUE_BUTTON_TEXT_DEFAULT, FINISH_BUTTON_TEXT_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../../../constants';

export interface ContinueButtonProps {
  currentPage?: number;
  goToNextPage: () => void;
  style?: ViewStyle;
  totalPages?: number;
  text?: string;
  lastPageText?: string;
}

export const ContinueButton: FC<ContinueButtonProps> = ({
                                                          currentPage,
                                                          goToNextPage,
                                                          style,
                                                          totalPages,
                                                          text = CONTINUE_BUTTON_TEXT_DEFAULT,
                                                          lastPageText = FINISH_BUTTON_TEXT_DEFAULT,
                                                          ...props
                                                        }) => {
  const isLastPage = currentPage == totalPages - 1;

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.button, style]} onPress={goToNextPage}>
      <Text
        style={styles.buttonText}>{isLastPage ? lastPageText : text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    width: '100%',
    borderRadius: 32,
    marginTop: VERTICAL_PADDING_DEFAULT,
    marginBottom: VERTICAL_PADDING_DEFAULT,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 16,
  },
});