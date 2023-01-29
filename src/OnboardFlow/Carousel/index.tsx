import React, { FC } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { CardData } from '../types'
import { CarouselCard } from './CarouselCard'

export interface CarouselProps {
  cards: CardData[]
  onDismiss: (dismissed: CardData) => void
}

export const Carousel: FC<CarouselProps> = ({ cards, onDismiss }) => {
  const renderItem = (item) => {
    console.log('rendering: ', item)
   return <CarouselCard cardData={item} onDismiss={onDismiss} />
  }
  return (
    <FlatList
      data={cards}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id ?? `carousel-card-${index}`}
      horizontal
      contentContainerStyle={styles.wrapper}
    />
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200
  }
})