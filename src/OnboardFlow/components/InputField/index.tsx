import React, { FC, useState } from 'react'
import { ColorValue, StyleSheet, Text, TextInput, View } from 'react-native'
import { HORIZONTAL_PADDING_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../../constants'
import { TextStyles } from '../../types'

export interface FormEntryField {
  label?: string
  placeHolder?: string
  type: string
  /**
   * @deprecated Use onSaveData instead
   */
  onSetText?: (text: string) => void
  onSaveData?: (data: any) => void
  getErrorMessage?: (text: string) => string
  isRequired?: boolean
  prefill?: string
  id: string
  primaryColor?: string
  secondaryColor?: string
  canContinue?: boolean
  setCanContinue?: (value: boolean) => void
  props?: any
  backgroundColor?: ColorValue
}

export const InputField: FC<FormEntryField & TextStyles> = ({
  label,
  placeHolder,
  type,
  onSetText,
  getErrorMessage,
  textStyle,
  id,
  primaryColor,
  secondaryColor,
  prefill,
  backgroundColor,
}) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [text, setText] = useState(prefill ?? '')

  function getKeyboardType(inputType: string) {
    if (inputType == 'email') {
      return 'email-address'
    }

    return 'default'
  }

  function getTextContentType(inputType: string) {
    if (inputType == 'email') {
      return 'emailAddress'
    }

    if (inputType == 'password') {
      return 'password'
    }

    return 'none'
  }

  function getDataDetectorType(inputType: string) {
    return undefined
  }

  return (
    <View style={{ marginTop: -6 }}>
      <Text
        style={[
          {
            color: secondaryColor,
            fontSize: 12,
            backgroundColor: backgroundColor ?? '#FFFFFF',
            alignSelf: 'flex-start',
            position: 'relative',
            paddingHorizontal: 4,
            bottom: -22,
            left: 12,
            zIndex: 5,
            opacity: isFocused ? 1 : 0.0,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
      <TextInput
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={() => setIsFocused(false)}
        value={text}
        textContentType={getTextContentType(type)}
        dataDetectorTypes={getDataDetectorType(type)}
        maxLength={255}
        placeholder={placeHolder}
        style={[
          styles.option,
          {
            paddingVertical: VERTICAL_PADDING_DEFAULT,
            paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
            marginTop: VERTICAL_PADDING_DEFAULT,
          },
          { borderColor: isFocused ? primaryColor : secondaryColor },
          textStyle,
        ]}
        keyboardType={getKeyboardType(type)}
        secureTextEntry={type == 'password'}
        onChangeText={(string) => {
          const error = getErrorMessage ? getErrorMessage(string) : null
          if (error) {
            setErrorMessage(error)
          }
          setText(string)
          if (onSetText) {
            onSetText(string)
          }
        }}
      />
      {errorMessage ? <Text style={[textStyle, styles.errorText]}>{errorMessage}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  option: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    fontSize: 18,
  },
  errorText: {
    fontSize: 14,
    color: '#a60202',
    marginTop: VERTICAL_PADDING_DEFAULT / 4,
  },
})
