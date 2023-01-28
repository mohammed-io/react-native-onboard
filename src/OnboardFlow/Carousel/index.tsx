import React, { FC } from 'react'
import { TextStyles } from '../types';
import { CarouselCard } from './CarouselCard'

export interface CardContentData {
  title?: string;
  subtitle?: string;
  imageUri?: string;

  onCtaPress?: () => void,
  ctaText?: string;
}

export type CardData = CardContentData & TextStyles

export interface CarouselProps {
  cards: CardData[]
}

export const Carousel: FC<CarouselProps> = ({ cards }) => {
  return (
    <>
    {
      cards.map((cardData: CardData) => (
        <CarouselCard cardData={cardData}/>
      ))
    }
    </>
  )
}