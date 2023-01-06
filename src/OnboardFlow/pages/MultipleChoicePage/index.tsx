import React, { FC, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_TEXT_DEFAULT, HORIZONTAL_PADDING_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../../constants';
import { OnboardPageConfigParams } from '../../index';
import { pageStyles } from '../../Page/styles';
import { TextStack } from '../../components/TextStack';

export interface MultipleChoicePageProps {
  fields: MultipleChoiceField[];
  minChoices?: number;
  maxChoices?: number;
  onOptionsUpdated?: (options: MultipleChoiceField[]) => void;
}

export interface MultipleChoiceField {
  id?: string;
  title?: string;
  subtitle?: string;
  onUpdated?: (selected: boolean) => void;
}

export const MultipleChoicePage: FC<OnboardPageConfigParams<MultipleChoicePageProps>> = ({
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

  const [selectedOptions, setSelectedOptions] = useState<MultipleChoiceField[]>([]);
  const maxChoices = props.maxChoices ?? 1;
  const minChoices = props.minChoices ?? 1;

  const Field: FC<MultipleChoiceField> = ({ id, title, subtitle, onUpdated}) => {
    const [isSelected, setIsSelected] = useState(false);
    // Create touchable opacity for each field and use field style
    return (
      <TouchableOpacity onPress={() => {
        if (!isSelected) {
          if (maxChoices && selectedOptions.length >= maxChoices) {
            return;
          } else {
            setIsSelected(true);
            if (onUpdated) {
              onUpdated(true);
            }
          }
        } else {
          setIsSelected(false);
          if (onUpdated) {
            onUpdated(false);
          }
        }
      }}>
        <View style={[styles.option, isSelected ? styles.optionSelected : null]}>
          <Text style={[styles.optionTitle]}>{title}</Text>
        </View>
      </TouchableOpacity>);
  };

  return (
    <View style={[pageStyles.container, style, { width: width }]}>
      <KeyboardAvoidingView>
        <TextStack title={pageData?.title} subtitle={pageData?.subtitle} textStyle={textStyle} textAlign={textAlign}
                   titleStyle={titleStyle} subtitleStyle={subtitleStyle}></TextStack>
        {/* Map props.fields to <Input/> */}
        {props.fields.map((input, index) => (
          <View style={styles.fieldRow} key={index}><Field {...input} /></View>
        ))}
      </KeyboardAvoidingView>
    </View>
  );
};


const styles = StyleSheet.create({
  optionTitle: {
    fontSize: 18,
    color: COLOR_TEXT_DEFAULT,
    // marginBottom: VERTICAL_PADDING_DEFAULT / 2,
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
    marginTop: VERTICAL_PADDING_DEFAULT/4
  },
  optionSelected: {
    borderColor: '#000',
  },
  fieldRow: {
    // marginBottom: VERTICAL_PADDING_DEFAULT/4,
  },
});