import React, { FC } from 'react';
import { Text } from 'react-native';
import { TextStyles } from '../../types';
import { pageStyles } from '../../Page/styles';

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
        style={[pageStyles.title, { textAlign: textAlign }, titleStyle]}>{title}</Text>
      <Text
        style={[pageStyles.subtitle, { textAlign: textAlign }, subtitleStyle]}>{subtitle}</Text>
    </>
  );
};