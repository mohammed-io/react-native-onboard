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

export interface PhoneNumberEntryPageProps {
  invalidNumberMessage?: string;
  onSetPhoneNumber?: (text: string) => void;
}

export const PhoneNumberEntryPage: FC<OnboardPageConfigParams<PhoneNumberEntryPageProps>> = ({
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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  function onChangePhoneNumber(text: string) {
    var cleaned = ('' + text).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : ''),
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

      setPhoneNumber(number);

      return;
    }

    setPhoneNumber(text);

    // TODO: Add validation
    if (props.onSetPhoneNumber) {
      props.onSetPhoneNumber(text);
    }
  }

  function getInput() {
    return <>
      <TextInput onFocus={() => {
        setIsFocused(true);
      }} onBlur={() => setIsFocused(false)} value={phoneNumber} textContentType='telephoneNumber'
                 dataDetectorTypes='phoneNumber'
                 maxLength={14} placeholder={'Mobile number'}
                 style={[styles.phoneNumberInput, textStyle, isFocused ? styles.phoneNumberInputFocused : null]}
                 keyboardType='phone-pad'
                 onChangeText={onChangePhoneNumber} />
      {isInvalid &&
        <Text
          style={[styles.errorText, textStyle]}>{props.invalidNumberMessage ?? 'Invalid phone number'}</Text>}
    </>;
  }

  return (
    <View style={[styles.container, style, { width: width }]}>
      <KeyboardAvoidingView>
        <Text
          style={[styles.title, { textAlign: textAlign }, titleStyle]}>{pageData?.title}</Text>
        <Text
          style={[styles.subtitle, { textAlign: textAlign }, subtitleStyle]}>{pageData?.subtitle}</Text>
        {getInput()}
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
  phoneNumberInput: {
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
    fontSize: 18,
    color: 'red',
  }, phoneNumberInputFocused: {
    borderColor: '#000',
  },

});