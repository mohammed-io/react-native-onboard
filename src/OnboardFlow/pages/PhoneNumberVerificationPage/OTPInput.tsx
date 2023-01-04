import React, { FC, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

interface OTPInputProps {
  code: string;
  setCode: (code: string) => void;
  maximumLength: number;
  setIsPinReady: (isPinReady: boolean) => void;
  style?: ViewStyle;
}

export const OTPInput: FC<OTPInputProps> = ({ code, setCode, maximumLength, setIsPinReady, style }) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef<any>();

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);
  const boxDigit = (_, index) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const isFocused =
      isInputBoxFocused && isValueFocused;
    return (
      <View style={[styles.splitBoxes, isFocused ? styles.splitBoxesFocused : null]} key={index}>
        <Text style={styles.splitBoxText}>{digit}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <Pressable style={styles.splitOTPBoxesContainer} onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        style={styles.textInputHidden}
        value={code}
        onChangeText={setCode}
        keyboardType={'number-pad'}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInputHidden: {
    position: 'absolute',
    opacity: 0,
  },
  splitOTPBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  splitBoxes: {
    width: 45,
    height: 56,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },

  splitBoxText: {
    textAlign: 'center',
    fontSize: 20,
  },
  splitBoxesFocused: {
    borderColor: '#000',
  },
});