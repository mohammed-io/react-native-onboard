import React from 'react';
import { Image, Platform, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { FC, ReactElement, useEffect, useState } from 'react';
import {
  COLOR_MUTED_TEXT_DEFAULT,
  COLOR_TEXT_DEFAULT,
  HORIZONTAL_PADDING_DEFAULT,
  TEXT_ALIGN_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../../constants';

export interface PageProps {
  style?: ViewStyle;
  titleStyle?: ViewStyle;
  subtitleStyle?: ViewStyle;
  currentPage: number;
  totalPages: number;
  data: PageData;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  textAlign?: 'left' | 'center' | 'right';
  width: number;
}

export interface PageData {
  title?: string;
  subtitle?: string;
  imageUri?: string;
  imageComponent?: ReactElement;
  metadata?: any;
}

export const Page: FC<PageProps> = ({
                                             style,
                                             titleStyle,
                                             subtitleStyle,
                                             data,
                                             currentPage,
                                             totalPages,
                                             goToNextPage,
                                             goToPreviousPage,
                                             textAlign = TEXT_ALIGN_DEFAULT,
                                             width,
                                             ...props
                                           }) => {

  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (data.imageUri) {
      Image.getSize(data.imageUri, (width, height) => {
        setImageHeight(height);
      });
    }
  }, [data.imageUri]);

  function ImageComponent() {
    if (data.imageComponent) {
      return data.imageComponent;
    }
    return null;
  }

  return (
    <View style={[styles.container, style, { width: width }]}>
      {data.imageUri && <Image
        source={{ uri: data.imageUri }}
        resizeMode='contain' style={[styles.image, { maxHeight: Platform.OS == 'web' ? 300 : 400, height: imageHeight }]}
      />}
      <ImageComponent />
      <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerText}>
          <Text style={[styles.title, {textAlign: textAlign}, titleStyle]}>{data?.title}</Text>
          <Text style={[styles.subtitle, {textAlign: textAlign}, subtitleStyle]}>{data?.subtitle}</Text>
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
    height: 200,
    width: '100%',
  },
});