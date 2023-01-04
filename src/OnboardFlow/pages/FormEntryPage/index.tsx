import React, { FC, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  COLOR_MUTED_TEXT_DEFAULT,
  COLOR_TEXT_DEFAULT,
  HORIZONTAL_PADDING_DEFAULT,
  TEXT_ALIGN_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../../../constants';
import { OnboardPageConfigParams } from '../../index';

export interface FormEntryPageProps {
  fields: FormEntryField[];
}

export interface FormEntryField {
  label?: string;
  placeHolder?: string;
  type: 'email' | 'text' | 'password';
  onSetText?: (text: string) => void;
  getErrorMessage?: (text: string) => string;
}

export const FormEntryPage: FC<OnboardPageConfigParams<FormEntryPageProps>> = ({
                                                                                 style,
                                                                                 titleStyle,
                                                                                 subtitleStyle,
                                                                                 textStyle,
                                                                                 pageData,
                                                                                 currentPage,
                                                                                 totalPages,
                                                                                 goToNextPage,
                                                                                 goToPreviousPage,
                                                                                 textAlign,
                                                                                 width,
                                                                                 props,
                                                                               }) => {

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

  function validateEmail(email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  const Field: FC<FormEntryField> = ({ label, placeHolder, type, onSetText, getErrorMessage }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState('');
    return <>
      <TextInput onFocus={() => {
        setIsFocused(true);
      }} onBlur={() => setIsFocused(false)} value={text} textContentType={getTextContentType(type)}
                 dataDetectorTypes={getDataDetectorType(type)}
                 maxLength={255} placeholder={placeHolder}
                 style={[styles.input, textStyle, isFocused ? styles.inputFocused : null]}
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
          style={[textStyle, styles.errorText]}>{errorMessage}</Text>}
    </>;
  };

  return (
    <View style={[styles.container, style, { width: width }]}>
      <KeyboardAvoidingView>
        <Text
          style={[styles.title, { textAlign: textAlign }, titleStyle]}>{pageData?.title}</Text>
        <Text
          style={[styles.subtitle, { textAlign: textAlign }, subtitleStyle]}>{pageData?.subtitle}</Text>
        {/* Map props.fields to <Input/> */}
        {props.fields.map((input, index) => (
          <View style={styles.fieldRow} key={index}><Field {...input} /></View>
        ))}
      </KeyboardAvoidingView>
    </View>
  );
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
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    fontSize: 18,
    paddingVertical: VERTICAL_PADDING_DEFAULT,
    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
    marginTop: VERTICAL_PADDING_DEFAULT * 2,
  },
  errorText: {
    fontSize: 14,
    color: '#a60202',
    marginTop: VERTICAL_PADDING_DEFAULT/4
  },
  inputFocused: {
    borderColor: '#000',
  },
  fieldRow: {
    marginBottom: VERTICAL_PADDING_DEFAULT/4,
  },
});