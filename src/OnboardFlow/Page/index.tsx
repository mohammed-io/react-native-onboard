import React, { FC, useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View, ViewStyle } from 'react-native';
import {
  COLOR_MUTED_TEXT_DEFAULT,
  COLOR_TEXT_DEFAULT,
  HORIZONTAL_PADDING_DEFAULT,
  TEXT_ALIGN_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../../constants';
import { PageData } from '../index';

export interface PageProps {
  style?: ViewStyle;
  titleStyle?: ViewStyle;
  subtitleStyle?: ViewStyle;
  textStyle?: ViewStyle;
  currentPage: number;
  totalPages: number;
  pageData: PageData;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  textAlign?: 'left' | 'center' | 'right';
  width: number;
}

export const Page: FC<PageProps> = ({
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
        style={[styles.image, { maxHeight: Platform.OS == 'web' ? 300 : 400, height: imageHeight }]}
      />}
      <ImageComponent />
      <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerText}>
          <Text style={[styles.title, textStyle, titleStyle]}>{pageData?.title}</Text>
          <Text style={[styles.subtitle, textStyle, subtitleStyle]}>{pageData?.subtitle}</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLOR_TEXT_DEFAULT,
    lineHeight: 42,
    marginBottom: VERTICAL_PADDING_DEFAULT / 2,
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: COLOR_MUTED_TEXT_DEFAULT,
    textAlign: TEXT_ALIGN_DEFAULT,
    width: '100%',
  },
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