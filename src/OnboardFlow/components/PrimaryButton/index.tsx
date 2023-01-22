import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import {
  COLOR_BUTTON_DEFAULT,
  PRIMARY_BUTTON_TEXT_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../../constants'
import { TextStyles } from '../../types'

export interface PrimaryButtonProps {
  currentPage?: number
  goToNextPage: () => void
  style?: ViewStyle
  totalPages?: number
  text?: string
}

export const PrimaryButton: FC<PrimaryButtonProps & TextStyles> = ({
  currentPage,
  goToNextPage,
  style,
  totalPages,
  text = PRIMARY_BUTTON_TEXT_DEFAULT,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.button, style]} onPress={goToNextPage}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR_BUTTON_DEFAULT,
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
})
