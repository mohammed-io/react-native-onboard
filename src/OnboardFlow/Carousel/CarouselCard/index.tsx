import React, { FC } from 'react';
import { Image, ImageStyle, Pressable, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import { CardData } from '..';
import { Card } from '../../components/Card';
import { CardButton } from './CardButton';

export interface CarouselCardProps {
  onPress?: () => void
  style?: ViewStyle
  imageStyle?: ImageStyle
  cardData: CardData
}

const BASE_MARGIN_HORIZONTAL = 20;

export const CarouselCard: FC<CarouselCardProps> = ({ style, onPress, cardData, imageStyle }) => {

  const window = useWindowDimensions()
  const cardWidth = window.width - BASE_MARGIN_HORIZONTAL * 2;

  const {
    title,
    subtitle,
    ctaText,
    onCtaPress
  } = cardData;

  return (
    <Pressable onPress={onPress}>
      <Card style={[style, { width: cardWidth }]}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.baseTitleStyle, cardData.titleStyle ]}>{title}</Text>
            <Text style={[styles.baseSubTitleStyle, cardData.subtitleStyle ]}>{subtitle}</Text>
            {
              onCtaPress && (
                <CardButton text={ctaText ?? 'Learn More'} onPress={onCtaPress} />
              )
            }
          </View>
          <View style={styles.imageContainer}>
          <Image
            source={{ uri: cardData.imageUri }}
            accessibilityRole="image"
            resizeMode="contain"
            style={[
              styles.image,
              imageStyle
            ]}
          />
          </View>
        </View>
      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-around',
  },
  textContainer: {
    flex: 2
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 68,
    height: 68,
  },
  baseTitleStyle: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
    marginVertical: 4
  },
  baseSubTitleStyle: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: '#333333',
    marginVertical: 4,
  }
})