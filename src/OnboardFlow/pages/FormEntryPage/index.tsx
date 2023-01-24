import React, { FC } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { HORIZONTAL_PADDING_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../../constants'
import { OnboardPageConfigParams } from '../../index'
import { FormEntryField, InputField } from '../../components/InputField'
import { TextStack } from '../../components/TextStack'

export interface FormEntryPageProps {
  fields: FormEntryField[]
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
  onSaveData,
  textAlign,
  width,
  primaryColor,
  secondaryColor,
  props,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          width: width,
          paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
        },
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
        />
        <ScrollView>
          {props.fields.map((input, index) => (
            <View style={[{ marginTop: VERTICAL_PADDING_DEFAULT }]} key={index}>
              <InputField
                onSetText={(text: string) => {
                  if (onSaveData) {
                    onSaveData({
                      source: pageData,
                      data: {
                        id: input.id,
                        value: text,
                      },
                    })
                  }
                  if (input.onSetText) {
                    input.onSetText(text)
                  }
                }}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                textStyle={textStyle}
                {...input}
              />
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
})
