import React, { FC } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { HORIZONTAL_PADDING_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../../constants'
import { OnboardPageConfigParams } from '../../index'
import { FormEntryField, InputField } from '../../components/InputField'
import { TextStack } from '../../components/TextStack'

export interface FormEntryPageProps {
    fields: FormEntryField[]
}

const PAGE_DATA_ENTRY_TYPE = 'FormEntryPageData'
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
                    paddingTop: VERTICAL_PADDING_DEFAULT,
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
                ></TextStack>
                {props.fields.map((input, index) => (
                    <View style={[{ marginTop: VERTICAL_PADDING_DEFAULT }]} key={index}>
                        <InputField
                            onSetText={(text: string) => {
                                if (onSaveData) {
                                    onSaveData({
                                        source: PAGE_DATA_ENTRY_TYPE,
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
                            {...input}
                        />
                    </View>
                ))}
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
