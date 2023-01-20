import React, { FC, useEffect, useState } from 'react';
import { Dimensions, Image, Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { HORIZONTAL_PADDING_DEFAULT, TEXT_ALIGN_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../constants';
import { PageData, PageEntryData, TextStyles } from '../types';
import { TextStack } from '../components/TextStack';

export interface PageProps {
  style?: StyleProp<ViewStyle> | undefined;
  pageIndex: number;
  currentPage: number;
  totalPages: number;
  pageData: PageData;
  customVariables?: object;
  goToNextPage: () => void;
  onSaveData?: (data: PageEntryData) => void;
  goToPreviousPage: () => void;
  textAlign?: 'left' | 'center' | 'right';
  width: number;
  maxTextHeight?: number;
  setMaxTextHeight?: (height: number) => void;
}

export const Page: FC<PageProps & TextStyles> = ({
                                                   style,
                                                   titleStyle,
                                                   subtitleStyle,
                                                   textStyle,
                                                   pageData,
                                                   pageIndex,
                                                   customVariables,
                                                   currentPage,
                                                   totalPages,
                                                   goToNextPage,
                                                   goToPreviousPage,
                                                   textAlign = TEXT_ALIGN_DEFAULT,
                                                   width,
                                                   maxTextHeight,
                                                   setMaxTextHeight,
                                                 }) => {
  const [imageHeight, setImageHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number>(Dimensions.get('window').height ?? 0);

  const onContainerLayout = (event) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  const onTextStackLayout = (event) => {
    setMaxTextHeight && setMaxTextHeight(event.nativeEvent.layout.height);
  };

  useEffect(() => {
    if (pageData.imageUri) {
      Image.getSize(pageData.imageUri, (width, height) => {
        setImageHeight(height);
      });
    }
  }, [pageData.imageUri]);

  function ImageComponent() {
    if (pageData.imageComponent) {
      return pageData.imageComponent;
    }
    return null;
  }

  function calculateImageHeight() {
    if (Platform.OS === 'web') {
      return Math.min(imageHeight, 300);
    }

    const padding = containerHeight < 400 ? 3 : 6;
    return Math.min(imageHeight, containerHeight - maxTextHeight - VERTICAL_PADDING_DEFAULT * padding);
  }

  return (
    <View style={[styles.container, style, { width: width }]} onLayout={onContainerLayout}>
      {pageData.imageUri && <Image
        source={{ uri: pageData.imageUri }}
        resizeMode='contain'
        style={[styles.image, { height: calculateImageHeight() },
          containerHeight < 500 ? { marginVertical: 0, marginBottom: VERTICAL_PADDING_DEFAULT } : null]}
      />}
      <View style={styles.imageComponentWrapper}>
        <ImageComponent />
      </View>
      <View style={styles.bottomContainer}>
        <View onLayout={onTextStackLayout}>
          <TextStack title={pageData?.title} subtitle={pageData?.subtitle} textStyle={textStyle} textAlign={textAlign}
                     titleStyle={titleStyle} subtitleStyle={subtitleStyle} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
  },
  image: {
    width: '100%',
    marginVertical: VERTICAL_PADDING_DEFAULT * 3,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  }, imageComponentWrapper: {
    alignItems: 'center',
  }
});
