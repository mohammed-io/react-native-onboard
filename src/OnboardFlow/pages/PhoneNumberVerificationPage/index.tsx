import React, { FC, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  COLOR_MUTED_TEXT_DEFAULT,
  HORIZONTAL_PADDING_DEFAULT,
  TEXT_ALIGN_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../../constants';
import { OnboardPageConfigParams } from '../../index';
import { OTPInput } from '../../components/OTPInput';
import { TextStack } from '../../components/TextStack';

export interface PhoneNumberVerificationPageProps {
  invalidCodeMessage?: string;
  onSetVerificationCode?: (text: string) => boolean;
  onResendVerificationCode?: () => void;
  resendCodeText?: string;
  invalidCodeText?: string;
  codeLength?: number;
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
  const maximumLength = props.codeLength ?? 6;

  async function onChangeVerificationCode(text: string) {
    setVerificationCode(text);

    if (props.onSetVerificationCode && props.codeLength && text.length === maximumLength) {
      const result = props.onSetVerificationCode(text);
      setIsInvalid(!result);
    }
  }

  return (
    <View style={[styles.container, style, { width: width }]}>
      <KeyboardAvoidingView>
        <TextStack title={pageData?.title} subtitle={pageData?.subtitle} textStyle={textStyle} textAlign={textAlign}
                   titleStyle={titleStyle} subtitleStyle={subtitleStyle}></TextStack>
        <OTPInput textStyle={textStyle} style={styles.otp} code={verificationCode} maximumLength={maximumLength}
                  setIsPinReady={() => {
                  }} setCode={(code) => {
          onChangeVerificationCode(code);
        }} />
        <TouchableOpacity onPress={props.onResendVerificationCode}>
          <Text style={[styles.resendText]}>{props.resendCodeText ?? `Resend code`}</Text>
        </TouchableOpacity>
        {isInvalid &&
          <Text
            style={[textStyle, styles.errorText]}>{props.invalidCodeText ?? 'Invalid code'}</Text>}
      </KeyboardAvoidingView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
      flexDirection: 'column',
      paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
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