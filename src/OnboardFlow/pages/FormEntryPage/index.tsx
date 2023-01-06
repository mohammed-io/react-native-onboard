import React, { FC } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { HORIZONTAL_PADDING_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../../constants';
import { OnboardPageConfigParams } from '../../index';
import { FormEntryField, InputField } from '../../components/InputField';
import { pageStyles } from '../../Page/styles';
import { TextStack } from '../../components/TextStack';

export interface FormEntryPageProps {
  fields: FormEntryField[];
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


  return (
    <View style={[pageStyles.container, style, { width: width }]}>
      <KeyboardAvoidingView>
        <TextStack title={pageData?.title} subtitle={pageData?.subtitle} textStyle={textStyle} textAlign={textAlign}
                   titleStyle={titleStyle} subtitleStyle={subtitleStyle}></TextStack>
        {/* Map props.fields to <Input/> */}
        {props.fields.map((input, index) => (
          <View style={styles.fieldRow} key={index}><InputField {...input} /></View>
        ))}
      </KeyboardAvoidingView>
    </View>
  );
};


const styles = StyleSheet.create({
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
    marginTop: VERTICAL_PADDING_DEFAULT/4
  },
  optionSelected: {
    borderColor: '#000',
  },
  fieldRow: {
    // marginBottom: VERTICAL_PADDING_DEFAULT/4,
  },
});