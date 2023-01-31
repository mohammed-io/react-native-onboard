import React, { FC } from 'react'
import { KeyboardAvoidingView, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { OnboardComponents } from '../index'
import { PRIMARY_BUTTON_TEXT_DEFAULT, PRIMARY_BUTTON_TEXT_LAST_PAGE_DEFAULT } from '../constants'
import { PageData } from '../types'

export interface FooterProps {
  style?: StyleProp<ViewStyle> | undefined
  Components: OnboardComponents
  paginationSelectedColor?: string
  paginationColor?: string
  currentPage: number
  goToNextPage: () => void
  goToPreviousPage: () => void
  pages?: PageData[]
  canContinue?: boolean
  setCanContinue?: (value: boolean) => void
  showFooter?: boolean
  showHeader?: boolean
  props?: any
}

export const Footer: FC<FooterProps> = ({
  style,
  Components,
  paginationSelectedColor,
  paginationColor,
  currentPage,
  goToNextPage,
  pages,
  canContinue,
  setCanContinue,
  showFooter = true,
  ...props
}) => {
  function getPrimaryButtonTitle() {
    if (pages && pages[currentPage] && pages[currentPage].primaryButtonTitle) {
      return pages[currentPage].primaryButtonTitle
    }
    return pages?.length - 1 === currentPage
      ? PRIMARY_BUTTON_TEXT_LAST_PAGE_DEFAULT
      : PRIMARY_BUTTON_TEXT_DEFAULT
  }

  const totalPages = pages?.length ?? 0

  return (
    <KeyboardAvoidingView behavior="position" style={[style]} {...props}>
      <Components.PaginationComponent
        paginationColor={paginationColor}
        paginationSelectedColor={paginationSelectedColor}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <Components.PrimaryButtonComponent
        text={getPrimaryButtonTitle()}
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        disabled={!canContinue}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({})
