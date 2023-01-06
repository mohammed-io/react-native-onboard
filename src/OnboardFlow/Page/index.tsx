import React, { FC, useEffect, useState } from 'react';
import { Image, Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TEXT_ALIGN_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../constants';
import { PageData, TextStyles } from '../types';
import { pageStyles } from './styles';
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
    <View style={[pageStyles.container, style, { width: width }]}>
      {pageData.imageUri && <Image
        source={{ uri: pageData.imageUri }}
        resizeMode='contain'
        style={[styles.image, { maxHeight: Platform.OS == 'web' ? 300 : 400, height: imageHeight }]}
      />}
      <ImageComponent />
      <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerText}>
          <TextStack title={pageData?.title} subtitle={pageData?.subtitle} textStyle={textStyle} textAlign={textAlign}
                     titleStyle={titleStyle} subtitleStyle={subtitleStyle}></TextStack>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: VERTICAL_PADDING_DEFAULT,
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  bottomContainerText: {
    position: Platform.OS == 'web' ? 'relative' : 'absolute',
    bottom: 0,
    height: 270,
    width: '100%',
  },
});