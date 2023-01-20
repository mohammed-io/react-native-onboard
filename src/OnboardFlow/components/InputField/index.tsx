import React, { FC, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput } from 'react-native';
import {
  COLOR_MUTED_TEXT_DEFAULT,
  COLOR_TEXT_DEFAULT,
  HORIZONTAL_PADDING_DEFAULT,
  TEXT_ALIGN_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../../constants';
import { TextStyles } from '../../types';

export interface FormEntryField {
  label?: string;
  placeHolder?: string;
  type: 'email' | 'text' | 'password';
  onSetText?: (text: string) => void;
  getErrorMessage?: (text: string) => string;
  isRequired?: boolean;
  id: string;
}

export const InputField: FC<FormEntryField & TextStyles> = ({
                                                              label,
                                                              placeHolder,
                                                              type,
                                                              onSetText,
                                                              getErrorMessage,
                                                              textStyle,
                                                              id,
                                                            }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  function getKeyboardType(inputType: string) {
    if (inputType == 'email') {
      return 'email-address';
    }

    return 'default';
  }

  function getTextContentType(inputType: string) {
    if (inputType == 'email') {
      return 'emailAddress';
    }

    if (inputType == 'password') {
      return 'password';
    }

    return 'none';
  }

  function getDataDetectorType(inputType: string) {

    return undefined;
  }


  return <>
    <TextInput onFocus={() => {
      setIsFocused(true);
    }} onBlur={() => setIsFocused(false)} value={text} textContentType={getTextContentType(type)}
               dataDetectorTypes={getDataDetectorType(type)}
               maxLength={255} placeholder={placeHolder}
               style={[styles.option, textStyle, isFocused ? styles.optionSelected : null]}
               keyboardType={getKeyboardType(type)}
               secureTextEntry={type == 'password'}
               onChangeText={(string) => {
                 const error = getErrorMessage ? getErrorMessage(string) : null;
                 if (error) {
                   setErrorMessage(error);
                 }
                 setText(string);
                 if (onSetText) {
                   onSetText(string);
                 }
               }} />
    {errorMessage &&
      <Text
        style={[styles.errorText]}>{errorMessage}</Text>}
  </>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLOR_TEXT_DEFAULT,
    lineHeight: 42,
    marginBottom: VERTICAL_PADDING_DEFAULT / 2,
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: COLOR_MUTED_TEXT_DEFAULT,
    textAlign: TEXT_ALIGN_DEFAULT,
    width: '100%',
  },
  image: {
    marginTop: VERTICAL_PADDING_DEFAULT,
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  bottomContainerText: {
    position: Platform.OS == 'web' ? 'relative' : 'absolute',
    bottom: 0,
    height: 270,
    width: '100%',
  },
  option: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    fontSize: 18,
    paddingVertical: VERTICAL_PADDING_DEFAULT,
    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
    marginTop: VERTICAL_PADDING_DEFAULT,
  },
  errorText: {
    fontSize: 14,
    color: '#a60202',
    marginTop: VERTICAL_PADDING_DEFAULT / 4,
  },
  optionSelected: {
    borderColor: '#000',
  },
  fieldRow: {
    // marginBottom: VERTICAL_PADDING_DEFAULT/4,
  },
});
