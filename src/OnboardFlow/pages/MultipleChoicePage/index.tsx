import React, { FC, useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  COLOR_TEXT_DEFAULT,
  HORIZONTAL_PADDING_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../../constants'
import { OnboardPageConfigParams } from '../../index'
import { TextStack } from '../../components/TextStack'

export interface MultipleChoicePageProps {
  fields: MultipleChoiceField[]
  minChoices?: number
  maxChoices?: number
  onOptionsUpdated?: (options: MultipleChoiceField[]) => void
}

export interface MultipleChoiceField {
  id?: string
  title?: string
  subtitle?: string
  onUpdated?: (selected: boolean) => void
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
  onSaveData,
  textAlign,
  width,
  props,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<MultipleChoiceField[]>([])
  const maxChoices = props.maxChoices ?? 1
  const minChoices = props.minChoices ?? 1

  useEffect(() => {
    if (onSaveData) {
      onSaveData({ data: selectedOptions, source: pageData })
    }
  }, [selectedOptions])

  const Field: FC<MultipleChoiceField> = ({ id, title, subtitle, onUpdated }) => {
    // Create touchable opacity for each field and use field style
    const selected = selectedOptions.find(
      (option) => option.id === id && option.title === title && option.subtitle === subtitle
    )

    return (
      <TouchableOpacity
        onPress={() => {
          if (!selected) {
            if (maxChoices && selectedOptions.length >= maxChoices) {
              return
            } else {
              setSelectedOptions([...selectedOptions, { id, title, subtitle, onUpdated }])
            }
          } else {
            setSelectedOptions(
              selectedOptions.filter((option) => {
                return !(option.id === id && option.title === title && option.subtitle === subtitle)
              })
            )
          }
        }}
      >
        <View
          style={[
            styles.option,
            {
              paddingVertical: VERTICAL_PADDING_DEFAULT,
              paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
              marginTop: VERTICAL_PADDING_DEFAULT,
            },
            selected ? styles.optionSelected : null,
          ]}
        >
          <Text style={[styles.optionTitle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: HORIZONTAL_PADDING_DEFAULT },
        style,
        { width: width },
      ]}
    >
      <KeyboardAvoidingView>
        <TextStack
          title={pageData?.title}
          subtitle={pageData?.subtitle}
          textStyle={textStyle}
          textAlign={textAlign}
          titleStyle={titleStyle}
          subtitleStyle={subtitleStyle}
        ></TextStack>
        {/* Map props.fields to <Input/> */}
        <View style={{ marginTop: VERTICAL_PADDING_DEFAULT }}>
          {props.fields.map((input, index) => (
            <View key={index}>
              <Field {...input} />
            </View>
          ))}
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  optionTitle: {
    fontSize: 18,
    color: COLOR_TEXT_DEFAULT,
    width: '100%',
  },
  option: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 12,
    fontSize: 18,
  },
  optionSelected: {
    borderColor: '#000',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
})
