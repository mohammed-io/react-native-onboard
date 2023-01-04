import React, { FC, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  COLOR_MUTED_TEXT_DEFAULT,
  COLOR_TEXT_DEFAULT,
  HORIZONTAL_PADDING_DEFAULT,
  TEXT_ALIGN_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../../../constants';
import { OnboardPageConfigParams } from '../../index';
import { OTPInput } from './OTPInput';

export interface PhoneNumberVerificationPageProps {
  invalidCodeMessage?: string;
  onSetVerificationCode?: (text: string) => void;
  onResendVerificationCode?: () => void;
}

export const PhoneNumberVerificationPage: FC<OnboardPageConfigParams<PhoneNumberVerificationPageProps>> = ({
                                                                                                             style,
                                                                                                             titleStyle,
                                                                                                             subtitleStyle,
                                                                                                             textStyle,
                                                                                                             pageData,
                                                                                                             currentPage,
                                                                                                             totalPages,
                                                                                                             goToNextPage,
                                                                                                             goToPreviousPage,
                                                                                                             textAlign = TEXT_ALIGN_DEFAULT,
                                                                                                             width,
                                                                                                             props,
                                                                                                           }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  function onChangeVerificationCode(text: string) {
    setVerificationCode(text);

    if (props.onSetVerificationCode) {
      props.onSetVerificationCode(text);
    }
  }

  return (
    <View style={[styles.container, style, { width: width }]}>
      <KeyboardAvoidingView>
        <Text
          style={[styles.title, { textAlign: textAlign }, titleStyle]}>{pageData?.title}</Text>
        <Text
          style={[styles.subtitle, { textAlign: textAlign }, subtitleStyle]}>{pageData?.subtitle}</Text>
        <OTPInput style={styles.otp} code={verificationCode} maximumLength={6} setIsPinReady={() => {
        }} setCode={(code) => {
          setVerificationCode(code);
        }} />
        <TouchableOpacity onPress={props.onResendVerificationCode}>
          <Text style={[styles.resendText]}>Resend code</Text>
        </TouchableOpacity>
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
  },
  resendText: {
    color: COLOR_MUTED_TEXT_DEFAULT,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'left',
    marginTop: VERTICAL_PADDING_DEFAULT,
  },
  otp: {
    marginTop: VERTICAL_PADDING_DEFAULT * 2,
  },

});