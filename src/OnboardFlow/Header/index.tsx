import React, { FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { OnboardComponents } from '../index'
import { PageData } from '../types'

export interface HeaderProps {
  style?: StyleProp<ViewStyle> | undefined
  Components: OnboardComponents
  paginationSelectedColor?: string
  paginationColor?: string
  currentPage: number
  goToNextPage: () => void
  goToPreviousPage: () => void
  pages?: PageData[]
  props?: any
}

export const Header: FC<HeaderProps> = ({
  style,
  Components,
  paginationSelectedColor,
  paginationColor,
  currentPage,
  goToNextPage,
  pages,
  ...props
}) => {
  const totalPages = pages?.length ?? 0

  return (
    <View style={[style]} {...props}>
      <Components.PaginationComponent
        paginationColor={paginationColor}
        paginationSelectedColor={paginationSelectedColor}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
