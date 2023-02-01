import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';

const BASE_CARD_STYLE: ViewStyle = {
  padding: 20,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#D7D7D7',
  backgroundColor: '#FFFFFF'
}

interface CardProps {
  style?: ViewStyle | ViewStyle[]
  children: React.ReactNode
}

export const Card: FC<CardProps> = ({ style, children }) => {
  return (
    <View style={[BASE_CARD_STYLE, style]}>
      {children}
    </View>
  )
}