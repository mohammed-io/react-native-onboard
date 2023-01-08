import React, { FC, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Page, PageProps } from './Page';
import { SwiperFlatList } from './Swiper';
import { SwiperFlatListRefProps } from './Swiper/SwiperProps';
import {
  COLOR_PAGINATION_DEFAULT,
  COLOR_PAGINATION_SELECTED_DEFAULT,
  DEFAULT_PAGE_TYPES,
  HORIZONTAL_PADDING_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from './constants';
import { PrimaryButton, PrimaryButtonProps } from './components/PrimaryButton';
import { Footer, FooterProps } from './Footer';
import { SecondaryButton, SecondaryButtonProps } from './components/SecondaryButton';
import { PageData, PaginationProps, TextStyles } from './types';
import { DotPagination } from './Pagination/components/Dot';
import { HeaderProps } from './Header';
import { BottomSheet, BottomSheetRef } from './BottomSheet';

export type PageType = string;

export type OnboardPageConfigParams<Props> = {
  props: Props;
} & PageProps & TextStyles;

export type OnboardPageTypesConfig = {
  [key: string]: (params: OnboardPageConfigParams<any>) => React.ReactNode;
};

interface OnboardFlowProps {
  backgroundImageUri?: string;
  dismissButtonStyle?: StyleProp<ViewStyle> | undefined;
  /**
   * @deprecated Use `type='fullscreen'` instead
   */
  fullscreenModal?: boolean;
  onBack?: () => void;
  onDone?: () => void;
  onNext?: () => void;
  pageStyle?: StyleProp<ViewStyle> | undefined;
  pageTypes?: OnboardPageTypesConfig;
  pages?: PageData[];
  paginationColor?: string;
  paginationSelectedColor?: string;
  showDismissButton?: boolean;
  style?: StyleProp<ViewStyle> | undefined;
  type?: 'inline' | 'fullscreen' | 'bottom-sheet';
  HeaderComponent?: FC<HeaderProps>;
  FooterComponent?: FC<FooterProps>;
  PaginationComponent?: FC<PaginationProps>;
  PrimaryButtonComponent?: FC<PrimaryButtonProps>;
  SecondaryButtonComponent?: FC<SecondaryButtonProps>;
}

export interface OnboardComponents {
  PrimaryButtonComponent: FC<PrimaryButtonProps>;
  SecondaryButtonComponent: FC<SecondaryButtonProps>;
  PaginationComponent: FC<PaginationProps>;
}


export const OnboardFlow: FC<OnboardFlowProps & TextStyles> = ({
                                                                 backgroundImageUri,
                                                                 dismissButtonStyle,
                                                                 fullscreenModal,
                                                                 textStyle,
                                                                 onBack,
                                                                 onDone,
                                                                 onNext,
                                                                 pageStyle,
                                                                 pageTypes = DEFAULT_PAGE_TYPES,
                                                                 pages,
                                                                 paginationColor = COLOR_PAGINATION_DEFAULT,
                                                                 paginationSelectedColor = COLOR_PAGINATION_SELECTED_DEFAULT,
                                                                 showDismissButton = false,
                                                                 style,
                                                                 subtitleStyle,
                                                                 textAlign = 'center',
                                                                 titleStyle,
                                                                 type = 'fullscreen',
                                                                 HeaderComponent = () => null,
                                                                 FooterComponent = Footer,
                                                                 PaginationComponent = DotPagination,
                                                                 PrimaryButtonComponent = PrimaryButton,
                                                                 SecondaryButtonComponent = SecondaryButton,
                                                                 ...props
                                                               }) => {
  const pagesMerged = { ...DEFAULT_PAGE_TYPES, ...pageTypes };
  const [currentPage, setCurrentPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const swiperRef = useRef<SwiperFlatListRefProps>();
  const [containerWidth, setContainerWidth] = useState<number>(Dimensions.get('window').width ?? 0);
  const windowHeight = Dimensions.get('window').height;
  const [maxTextHeight, setMaxTextHeight] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const components: OnboardComponents = {
    PrimaryButtonComponent,
    PaginationComponent,
    SecondaryButtonComponent,
  };

  const onLayout = (event) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  function handleIndexChange(item: { index: number; prevIndex: number }) {
    if (item.index != currentPage) {
      setCurrentPage(item.index);
    }
    if (item.index > item.prevIndex) {
      onNext && onNext();
      return;
    }
    if (item.index < item.prevIndex) {
      onBack && onBack();
      return;
    }
  }

  function handleDone() {
    setModalVisible(false);
    bottomSheetRef.current?.close();
    onDone && onDone();
  }

  function goToNextPage() {
    if (currentPage >= pages?.length - 1) {
      handleDone();
      return;
    }
    const nextIndex = swiperRef.current?.getCurrentIndex() + 1;
    setCurrentPage(nextIndex);
    swiperRef.current?.scrollToIndex({ index: nextIndex });
  }

  function goToPreviousPage() {
    const nextIndex = swiperRef.current?.getCurrentIndex() - 1;
    if (nextIndex < 0) {
      return;
    }
    setCurrentPage(nextIndex);
    swiperRef.current?.scrollToIndex({ index: nextIndex });
  }

  function DismissButton() {
    return (<View style={[styles.dismissIconContainer, dismissButtonStyle]}>
      <TouchableOpacity onPress={handleDone}>
        <Text style={styles.dismissIcon}>✕</Text>
      </TouchableOpacity>
    </View>);
  }

  function updateMaxTextHeight(height: number) {
    if (height > maxTextHeight) {
      setMaxTextHeight(height);
    }
  }

  const content = <ImageBackground source={{ uri: backgroundImageUri }} resizeMode='cover'
                                   style={styles.backgroundImage}>
    <SafeAreaView style={[styles.container, style]} onLayout={onLayout}>
      {showDismissButton && <DismissButton />}
      {HeaderComponent &&
        <HeaderComponent goToPreviousPage={goToPreviousPage} pages={pages} style={styles.header} Components={components}
                         currentPage={currentPage} goToNextPage={goToNextPage} />}
      <View style={styles.content}>
        <SwiperFlatList onChangeIndex={handleIndexChange} ref={swiperRef} index={currentPage}>
          {pages?.map((pageData, index) => (
            pageData.type && pagesMerged[pageData.type] ?
              <View key={index}>{pagesMerged[pageData.type]({
                style: pageStyle,
                textStyle,
                titleStyle,
                subtitleStyle,
                pageData,
                currentPage,
                totalPages: pages?.length,
                goToNextPage,
                goToPreviousPage,
                textAlign,
                width: containerWidth,
                props: pageData.props,
              })}</View> :
              <View key={index}>
                <Page
                  style={pageStyle}
                  titleStyle={titleStyle}
                  subtitleStyle={subtitleStyle}
                  textStyle={textStyle}
                  pageData={pageData}
                  currentPage={currentPage}
                  totalPages={pages?.length}
                  goToNextPage={goToNextPage}
                  goToPreviousPage={goToPreviousPage}
                  textAlign={textAlign}
                  width={containerWidth}
                  maxTextHeight={maxTextHeight}
                  setMaxTextHeight={updateMaxTextHeight}
                />
              </View>
          ))}
        </SwiperFlatList>
      </View>
      <FooterComponent goToPreviousPage={goToPreviousPage} pages={pages} style={styles.footer} Components={components}
                       currentPage={currentPage} goToNextPage={goToNextPage} />
    </SafeAreaView>
  </ImageBackground>;

  if (fullscreenModal === true || type === 'fullscreen') {
    return (
      <Modal visible={modalVisible}>
        {content}
      </Modal>);
  }

  if (type === 'bottom-sheet') {
    return (
      <BottomSheet height={windowHeight * 0.8} ref={bottomSheetRef}>
        {content}
      </BottomSheet>
    );
  }

  return (content);
};

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
    zIndex: 5,
  },
  header: {
    height: 64,
    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
    width: '100%',
    backgroundColor: 'pink',
  },

});