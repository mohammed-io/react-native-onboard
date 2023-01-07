import React, { FC, useEffect, useState } from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { HORIZONTAL_PADDING_DEFAULT, TEXT_ALIGN_DEFAULT } from '../constants';
import { PageData, TextStyles } from '../types';
import { TextStack } from '../components/TextStack';

export interface PageProps {
  style?: StyleProp<ViewStyle> | undefined;
  currentPage: number;
  totalPages: number;
  pageData: PageData;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  textAlign?: 'left' | 'center' | 'right';
  width: number;
}

export const Page: FC<PageProps & TextStyles> = ({
                                                   style,
                                                   titleStyle,
                                                   subtitleStyle,
                                                   textStyle,
                                                   pageData,
                                                   currentPage,
                                                   totalPages,
                                                   goToNextPage,
                                                   goToPreviousPage,
                                                   textAlign = TEXT_ALIGN_DEFAULT,
                                                   width,
                                                 }) => {

  const [imageHeight, setImageHeight] = useState(0);

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

  return (
    <View style={[styles.container, style, { width: width }]}>
      {pageData.imageUri && <Image
        source={{ uri: pageData.imageUri }}
        resizeMode='contain'
        style={[styles.image, {  height: 400 }]}
      />}
      <ImageComponent />
      <View style={styles.bottomContainer}>
          <TextStack title={pageData?.title} subtitle={pageData?.subtitle} textStyle={textStyle} textAlign={textAlign}
                     titleStyle={titleStyle} subtitleStyle={subtitleStyle} />
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
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});