import React, { FC, ReactElement, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Modal,
  SafeAreaView,
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
  HORIZONTAL_PADDING_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../constants';
import { DotPagination } from './Pagination/components/Dot';
import { PrimaryButton, PrimaryButtonProps } from './components/PrimaryButton';
import { Footer, FooterProps } from './Footer';
import { SecondaryButton, SecondaryButtonProps } from './components/SecondaryButton';
import { PaginationProps } from './types';

export type PageType = string;

export type OnboardPageConfigParams<Props> = {
  pageProps: PageProps;
  props: Props;
};

export interface PageData {
  title?: string;
  subtitle?: string;
  primaryButtonTitle?: string;
  imageUri?: string;
  imageComponent?: ReactElement;
  props?: any;
  type?: PageType;
}

export type OnboardPageTypesConfig = {
  [key: string]: (params: OnboardPageConfigParams<any>) => React.ReactNode;
};

interface OnboardFlowProps {
  pageTypes?: OnboardPageTypesConfig;
  style?: ViewStyle;
  pageStyle?: ViewStyle;
  titleStyle?: ViewStyle;
  subtitleStyle?: ViewStyle;
  onBack?: () => void;
  onNext?: () => void;
  onDone?: () => void;
  pages?: PageData[];
  fullscreenModal?: boolean;
  showDismissButton?: boolean;
  backgroundImage?: string;
  paginationSelectedColor?: string;
  paginationColor?: string;
  secondaryButtonText?: string;
  textAlign?: 'left' | 'center' | 'right';
  PrimaryButtonComponent?: FC<PrimaryButtonProps>;
  SecondaryButtonComponent?: FC<SecondaryButtonProps>;
  PaginationComponent?: FC<PaginationProps>;
  FooterComponent?: FC<FooterProps>;
}

export interface OnboardComponents {
  PrimaryButtonComponent: FC<PrimaryButtonProps>;
  SecondaryButtonComponent: FC<SecondaryButtonProps>;
  PaginationComponent: FC<PaginationProps>;
}

export const OnboardFlow: FC<OnboardFlowProps> = ({
                                                    style,
                                                    pageStyle,
                                                    titleStyle,
                                                    subtitleStyle,
                                                    onBack,
                                                    onNext,
                                                    onDone,
                                                    pages,
                                                    pageTypes = {},
                                                    fullscreenModal = true,
                                                    showDismissButton = false,
                                                    backgroundImage,
                                                    paginationSelectedColor = COLOR_PAGINATION_SELECTED_DEFAULT,
                                                    paginationColor = COLOR_PAGINATION_DEFAULT,
                                                    PrimaryButtonComponent = PrimaryButton,
                                                    PaginationComponent = DotPagination,
                                                    SecondaryButtonComponent = SecondaryButton,
                                                    FooterComponent = Footer,
                                                    textAlign = 'center',
                                                    ...props
                                                  }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const swiperRef = useRef<SwiperFlatListRefProps>();
  const [width, setWidth] = useState<number>(Dimensions.get('window').width ?? 0);
  const [height, setHeight] = useState<number>(Dimensions.get('window').height ?? 0);
  const components: OnboardComponents = {
    PrimaryButtonComponent,
    PaginationComponent,
    SecondaryButtonComponent,
  };

  const onLayout = (event) => {
    setWidth(event.nativeEvent.layout.width);
    setHeight(event.nativeEvent.layout.height);
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
    return (<View style={styles.dismissIconContainer}>
      <TouchableOpacity onPress={handleDone}>
        <Text style={styles.dismissIcon}>✕</Text>
      </TouchableOpacity>
    </View>);
  }

  const content = <ImageBackground source={{ uri: backgroundImage }} resizeMode='cover'
                                   style={styles.backgroundImage}>
    <SafeAreaView style={[styles.container, style]} onLayout={onLayout}>
      {showDismissButton && <DismissButton/>}
      <View style={styles.content}>
        <SwiperFlatList onChangeIndex={handleIndexChange} ref={swiperRef} index={currentPage}>
          {pages?.map((pageData, index) => (
            pageData.type && pageTypes[pageData.type] ?
              <View key={index}>{pageTypes[pageData.type]({
                pageProps: {
                  style: pageStyle,
                  titleStyle,
                  subtitleStyle,
                  pageData,
                  currentPage,
                  totalPages: pages?.length,
                  goToNextPage,
                  goToPreviousPage,
                  textAlign,
                  width,
                }, props: pageData.props,
              })}</View> :
              <View key={index}>
                <Page
                  style={pageStyle}
                  titleStyle={titleStyle}
                  subtitleStyle={subtitleStyle}
                  pageData={pageData}
                  currentPage={currentPage}
                  totalPages={pages?.length}
                  goToNextPage={goToNextPage}
                  goToPreviousPage={goToPreviousPage}
                  textAlign={textAlign}
                  width={width}
                />
              </View>
          ))}
        </SwiperFlatList>
      </View>
      <FooterComponent pages={pages} style={styles.footer} Components={components} currentPage={currentPage} goToNextPage={goToNextPage} />
    </SafeAreaView>
  </ImageBackground>;

  if (!fullscreenModal) {
    return content;
  }

  return (
    <Modal visible={modalVisible}>
      {content}
    </Modal>);
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
    backgroundColor: 'transparent'
  },
  dismissIconContainer: {
    position: 'absolute',
    flex: 1,
    top: VERTICAL_PADDING_DEFAULT*2,
    right: HORIZONTAL_PADDING_DEFAULT,
    zIndex: 5,
  }
});