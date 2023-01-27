import React, { FC, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Page, PageProps } from './Page'
import { SwiperFlatList } from './Swiper'
import { SwiperFlatListRefProps } from './Swiper/SwiperProps'
import {
  COLOR_PRIMARY_DEFAULT,
  COLOR_SECONDARY_DEFAULT,
  DEFAULT_FORM_ENTRY_TYPES,
  DEFAULT_PAGE_TYPES,
  HORIZONTAL_PADDING_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from './constants'
import { PrimaryButton, PrimaryButtonProps } from './components/PrimaryButton'
import { Footer } from './Footer'
import { SecondaryButton, SecondaryButtonProps } from './components/SecondaryButton'
import { OnboardFlowProps, PageData, PaginationProps, TextStyles } from './types'
import { DotPagination } from './Pagination/components/Dot'
import { BottomSheet, BottomSheetRef } from './BottomSheet'
import { FormEntryField } from './components/InputField'

export type PageType = string

export type OnboardPageConfigParams<Props> = {
  props: Props
} & PageProps &
  TextStyles

export type FormElementTypeConfigParams<Props> = {
  props: Props
} & FormEntryField &
  TextStyles

export type OnboardPageTypesConfig = {
  [key: string]: (params: OnboardPageConfigParams<any>) => React.ReactNode
}

export type FormElementTypesConfig = {
  [key: string]: (params: FormElementTypeConfigParams<any>) => React.ReactNode
}

export interface OnboardComponents {
  PrimaryButtonComponent: FC<PrimaryButtonProps>
  SecondaryButtonComponent: FC<SecondaryButtonProps>
  PaginationComponent: FC<PaginationProps>
}

export const OnboardFlow: FC<OnboardFlowProps & TextStyles> = ({
  autoPlay = false,
  backgroundImageUri,
  dismissButtonStyle,
  fullscreenModal,
  textStyle,
  onBack,
  onDone,
  onNext,
  onSaveData,
  canContinue,
  setCanContinue,
  pageStyle,
  pageTypes = DEFAULT_PAGE_TYPES,
  formElementTypes = DEFAULT_FORM_ENTRY_TYPES,
  pages,
  paginationColor = COLOR_SECONDARY_DEFAULT,
  paginationSelectedColor = COLOR_PRIMARY_DEFAULT,
  showDismissButton = false,
  enableScroll = true,
  style,
  subtitleStyle,
  textAlign = 'center',
  titleStyle,
  type = 'fullscreen',
  HeaderComponent = () => null,
  customVariables = {},
  FooterComponent = Footer,
  PaginationComponent = DotPagination,
  PrimaryButtonComponent = PrimaryButton,
  SecondaryButtonComponent = SecondaryButton,
  primaryColor = COLOR_PRIMARY_DEFAULT,
  secondaryColor = COLOR_SECONDARY_DEFAULT,
  ...props
}) => {
  const pagesMerged = { ...DEFAULT_PAGE_TYPES, ...pageTypes }
  const formElementsMerged = { ...DEFAULT_FORM_ENTRY_TYPES, ...formElementTypes }
  const [currentPage, setCurrentPage] = useState(0)
  const [modalVisible, setModalVisible] = useState(true)
  const swiperRef = useRef<SwiperFlatListRefProps>()
  const [containerWidth, setContainerWidth] = useState<number>(Dimensions.get('window').width ?? 0)
  const windowHeight = Dimensions.get('window').height
  const [maxTextHeight, setMaxTextHeight] = useState<number>(0)
  const bottomSheetRef = useRef<BottomSheetRef>(null)
  const showHeader = pages[currentPage].showHeader !== false
  const showFooter = pages[currentPage].showFooter !== false

  const components: OnboardComponents = {
    PrimaryButtonComponent,
    PaginationComponent,
    SecondaryButtonComponent,
  }

  const onLayout = (event) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }

  useEffect(() => {
    if (onSaveData && pages[currentPage]) {
      onSaveData(
        {
          data: {
            type: 'IMPRESSION',
            page: pages[currentPage].type ?? 'default',
          },
          source: pages[currentPage],
        },
        getPageId(pages[currentPage], currentPage)
      )
    }
  }, [currentPage])

  function getPageId(pageData: PageData, index: number) {
    return pageData?.id ?? index + ''
  }

  function handleIndexChange(item: { index: number; prevIndex: number }) {
    if (item.index != currentPage) {
      setCurrentPage(item.index)
    }
    if (item.index > item.prevIndex) {
      onNext && onNext()
      return
    }
    if (item.index < item.prevIndex) {
      onBack && onBack()
      return
    }
  }

  function handleDone() {
    setModalVisible(false)
    bottomSheetRef.current?.close()
    onDone && onDone()
  }

  function goToNextPage() {
    if (currentPage >= pages?.length - 1) {
      handleDone()
      return
    }
    const nextIndex = swiperRef.current?.getCurrentIndex() + 1
    setCurrentPage(nextIndex)
    swiperRef.current?.scrollToIndex({ index: nextIndex })
  }

  function goToPreviousPage() {
    const nextIndex = swiperRef.current?.getCurrentIndex() - 1
    if (nextIndex < 0) {
      return
    }
    setCurrentPage(nextIndex)
    swiperRef.current?.scrollToIndex({ index: nextIndex })
  }

  function DismissButton() {
    return (
      <View style={[styles.dismissIconContainer]}>
        <TouchableOpacity onPress={handleDone}>
          <Text style={[styles.dismissIcon, dismissButtonStyle]}>✕</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function updateMaxTextHeight(height: number) {
    if (height > maxTextHeight) {
      setMaxTextHeight(height)
    }
  }

  const content = (
    <ImageBackground
      source={{ uri: backgroundImageUri }}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={[styles.container, style]} onLayout={onLayout}>
        {showDismissButton ? <DismissButton /> : null}
        {showHeader && HeaderComponent ? (
          <HeaderComponent
            goToPreviousPage={goToPreviousPage}
            pages={pages}
            style={styles.header}
            Components={components}
            currentPage={currentPage}
            goToNextPage={goToNextPage}
          />
        ) : null}
        <View style={styles.content}>
          <SwiperFlatList
            scrollEnabled={enableScroll && canContinue}
            onChangeIndex={handleIndexChange}
            ref={swiperRef}
            index={currentPage}
            autoplay={autoPlay}
          >
            {pages?.map((pageData, index) =>
              pageData.type && pagesMerged[pageData.type] ? (
                <View key={index} style={{ width: containerWidth }}>
                  {pagesMerged[pageData.type]({
                    formElementTypes: formElementTypes,
                    style: [
                      pageStyle,
                      pageData.style ? (pageData.style as StyleProp<ViewStyle>) : null,
                    ],
                    textStyle: [
                      textStyle,
                      pageData.textStyle ? (pageData.textStyle as StyleProp<TextStyle>) : null,
                    ],
                    titleStyle: [
                      titleStyle,
                      pageData.titleStyle ? (pageData.titleStyle as StyleProp<TextStyle>) : null,
                    ],
                    subtitleStyle: [
                      subtitleStyle,
                      pageData.subtitleStyle
                        ? (pageData.subtitleStyle as StyleProp<TextStyle>)
                        : null,
                    ],
                    pageData,
                    pageIndex: index,
                    currentPage,
                    totalPages: pages?.length,
                    goToNextPage,
                    goToPreviousPage,
                    textAlign,
                    width: containerWidth,
                    props: pageData.props,
                    customVariables,
                    primaryColor,
                    secondaryColor,
                    onSaveData: (data) => {
                      if (onSaveData) {
                        onSaveData(data, getPageId(pageData, index))
                      }
                    },
                    setCanContinue,
                    canContinue,
                  })}
                </View>
              ) : (
                <View key={index} style={{ width: containerWidth }}>
                  <Page
                    formElementTypes={formElementTypes}
                    style={[
                      pageStyle,
                      pageData.style ? (pageData.style as StyleProp<ViewStyle>) : null,
                    ]}
                    titleStyle={[
                      titleStyle,
                      pageData.titleStyle ? (pageData.titleStyle as StyleProp<TextStyle>) : null,
                    ]}
                    subtitleStyle={[
                      subtitleStyle,
                      pageData.subtitleStyle
                        ? (pageData.subtitleStyle as StyleProp<TextStyle>)
                        : null,
                    ]}
                    textStyle={[
                      textStyle,
                      pageData.textStyle ? (pageData.textStyle as StyleProp<TextStyle>) : null,
                    ]}
                    pageData={pageData}
                    pageIndex={index}
                    currentPage={currentPage}
                    totalPages={pages?.length}
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPreviousPage}
                    textAlign={textAlign}
                    width={containerWidth}
                    maxTextHeight={maxTextHeight}
                    setMaxTextHeight={updateMaxTextHeight}
                    customVariables={customVariables}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    onSaveData={(data) => {
                      if (onSaveData) {
                        onSaveData(data, getPageId(pageData, index))
                      }
                    }}
                    setCanContinue={setCanContinue}
                    canContinue={canContinue}
                  />
                </View>
              )
            )}
          </SwiperFlatList>
        </View>
        <FooterComponent
          paginationSelectedColor={paginationSelectedColor}
          paginationColor={paginationColor}
          goToPreviousPage={goToPreviousPage}
          pages={pages}
          style={[styles.footer, !showFooter ? { opacity: 0.0 } : null]}
          Components={components}
          currentPage={currentPage}
          goToNextPage={goToNextPage}
          canContinue={canContinue}
          setCanContinue={setCanContinue}
        />
      </SafeAreaView>
    </ImageBackground>
  )

  if (fullscreenModal === true || type === 'fullscreen') {
    return <Modal visible={modalVisible}>{content}</Modal>
  }

  if (type === 'bottom-sheet') {
    return (
      <BottomSheet height={windowHeight * 0.8} ref={bottomSheetRef}>
        {content}
      </BottomSheet>
    )
  }

  return content
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#000',
    width: '100%',
    borderRadius: 32,
    marginTop: VERTICAL_PADDING_DEFAULT,
    marginBottom: VERTICAL_PADDING_DEFAULT,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: VERTICAL_PADDING_DEFAULT,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignContent: 'space-between',
  },
  content: {
    flex: 1,
    flexGrow: 4,
  },
  backgroundImage: {
    flex: 1,
  },
  buttonBackgroundImage: {
    borderRadius: 32,
    marginHorizontal: 32,
  },
  dismissIcon: {
    fontSize: 22,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    backgroundColor: 'transparent',
  },
  dismissIconContainer: {
    position: 'absolute',
    flex: 1,
    top: VERTICAL_PADDING_DEFAULT * 2,
    right: HORIZONTAL_PADDING_DEFAULT,
    zIndex: 1000,
  },
  header: {
    height: 64,
    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
    width: '100%',
  },
})
