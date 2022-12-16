import { ImageBackground, Modal, SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';
import { FC, useRef, useState } from 'react';
import { FrigadePageProps, Page, PageData } from './Page';
import { SwiperFlatList } from './Swiper';
import { SwiperFlatListRefProps } from './Swiper/SwiperProps';
import {
  COLOR_PAGINATION_DEFAULT,
  COLOR_PAGINATION_SELECTED_DEFAULT,
  HORIZONTAL_PADDING_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../constants';
import { FrigadePaginationProps, Pagination } from './Pagination';
import { ContinueButton, FrigadeContinueButtonProps } from './DefaultContinueButton';


interface OnboardFlowProps {
  style?: ViewStyle;
  pageStyle?: ViewStyle;
  titleStyle?: ViewStyle;
  subtitleStyle?: ViewStyle;
  id?: string;
  onBack?: () => void;
  onNext?: () => void;
  onDone?: () => void;
  pages?: PageData[];
  fullscreenModal?: boolean;
  backgroundImage?: string;
  paginationSelectedColor?: string;
  paginationColor?: string;
  ContinueButtonComponent?: FC<FrigadeContinueButtonProps>;
  PageComponent?: FC<FrigadePageProps>;
  PaginationComponent?: FC<FrigadePaginationProps>;
}

type OnboardFlowPropsFC = FC<OnboardFlowProps> & {
  Page: FC<FrigadePageProps>;
};

export const OnboardFlow: OnboardFlowPropsFC = ({
                                                  style,
                                                  pageStyle,
                                                  id,
                                                  onBack,
                                                  onNext,
                                                  onDone,
                                                  pages,
                                                  fullscreenModal,
                                                  backgroundImage,
                                                  paginationSelectedColor = COLOR_PAGINATION_SELECTED_DEFAULT,
                                                  paginationColor = COLOR_PAGINATION_DEFAULT,
                                                  ContinueButtonComponent = ContinueButton,
                                                  PageComponent = Page,
                                                  PaginationComponent = Pagination,
                                                  ...props
                                                }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const swiperRef = useRef<SwiperFlatListRefProps>();
  const isLastPage = currentPage == pages.length - 1;

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

  function goToNextPage() {
    if (currentPage >= pages?.length - 1) {
      setModalVisible(false);
      onDone && onDone();
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

  return (
    <Modal visible={modalVisible}>
      <ImageBackground source={{ uri: backgroundImage }} resizeMode='cover' style={styles.backgroundImage}>
        <SafeAreaView style={[styles.container, style]}>
          <View style={styles.content}>
            <SwiperFlatList onChangeIndex={handleIndexChange} ref={swiperRef} index={currentPage}>
              {pages?.map((page, index) => (
                <PageComponent goToPreviousPage={goToPreviousPage} style={pageStyle} key={index} totalPages={pages.length} goToNextPage={goToNextPage}
                                  currentPage={currentPage} data={page} />
              ))}
            </SwiperFlatList>
          </View>
          <View style={styles.footer}>
            <PaginationComponent
              paginationColor={paginationColor}
              paginationSelectedColor={paginationSelectedColor}
              currentPage={currentPage}
              totalPages={pages?.length} />
            <ContinueButtonComponent currentPage={currentPage} totalPages={pages?.length ?? 0} goToNextPage={goToNextPage} />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </Modal>);
};

const styles = StyleSheet.create({
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
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignContent: 'space-between',
  },
  footer: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexGrow: 6,
  },
  backgroundImage: {
    flex: 1,
  },
  buttonBackgroundImage: {
    borderRadius: 32,
    marginHorizontal: 32,
  },

});

OnboardFlow.Page = Page;
