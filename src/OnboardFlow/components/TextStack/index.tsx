import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextStyles } from '../../types';
import {
  COLOR_MUTED_TEXT_DEFAULT,
  COLOR_TEXT_DEFAULT,
  TEXT_ALIGN_DEFAULT,
  VERTICAL_PADDING_SMALL_DEFAULT,
} from '../../constants';

export interface TextStackProps {
  subtitle?: string;
  title?: string;
}

export const TextStack: FC<TextStackProps & TextStyles> = ({
                                                             title,
                                                             subtitle,
                                                             titleStyle,
                                                             subtitleStyle,
                                                             textStyle,
                                                             textAlign,
                                                             ...props
                                                           }) => {
  return (
    <>
      <Text
        style={[styles.title, { textAlign: textAlign }, titleStyle]}>{title}</Text>
      <Text
        style={[styles.subtitle, { textAlign: textAlign }, subtitleStyle]}>{subtitle}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLOR_TEXT_DEFAULT,
    lineHeight: 42,
    marginBottom: VERTICAL_PADDING_SMALL_DEFAULT,
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: COLOR_MUTED_TEXT_DEFAULT,
    textAlign: TEXT_ALIGN_DEFAULT,
    width: '100%',
  }
});