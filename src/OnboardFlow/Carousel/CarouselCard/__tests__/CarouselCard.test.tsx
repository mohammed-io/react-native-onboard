import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { CarouselCard } from '..'

describe('CarouselCard', () => {
  const cardData = {
    title: 'Test Card Title',
    subtitle: 'Content subtitle',
    imageUri: 'testImageUri',
  }

  test('Renders expected title and subtitle', () => {
    const { getByText, getByRole } = render(<CarouselCard cardData={cardData} />)

    expect(getByText(cardData.title)).toBeDefined()
    expect(getByText(cardData.subtitle)).toBeDefined()
    expect(getByRole('image').props.source).toEqual({ uri: cardData.imageUri })
  })

  test('Fires onPress if provided', () => {
    const onPress = jest.fn()
    const { getByText } = render(<CarouselCard cardData={cardData} onPress={onPress} />)

    fireEvent.press(getByText(cardData.title))
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
