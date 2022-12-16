import { Dimensions, Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { FC, useEffect, useState } from 'react';
import {
  COLOR_MUTED_TEXT_DEFAULT,
  COLOR_TEXT_DEFAULT,
  HORIZONTAL_PADDING_DEFAULT,
  TEXT_ALIGN_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../../constants';

export interface FrigadePageProps {
  id?: string;
  style?: ViewStyle;
  currentPage: number;
  totalPages: number;
  data: PageData;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export interface PageData {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  metadata?: any;
}


export const Page: FC<FrigadePageProps> = ({
                                      style,
                                      data,
                                      currentPage,
                                      totalPages,
                                      goToNextPage,
                                      goToPreviousPage,
                                      ...props
                                    }) => {

  const width = style?.width ?? Dimensions.get('window').width;
  const height = style?.height ?? Dimensions.get('window').height;

  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (data.imageUrl) {
      Image.getSize(data.imageUrl, (width, height) => {
        setImageHeight(height);
      });
    }
  }, [data.imageUrl]);

  return (
    <View style={[styles.container, style, { width: width }]}>
      {data?.imageUrl && <Image resizeMode="contain" style={[styles.image, {maxHeight: 500, height: imageHeight/2.5}]} source={{ uri: data?.imageUrl }} />}
      <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerText}>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={styles.subtitle}>{data?.subtitle}</Text>
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
    marginBottom: VERTICAL_PADDING_DEFAULT/2,
    textAlign: TEXT_ALIGN_DEFAULT,
    width: '100%'
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
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  bottomContainerText: {
    position: 'absolute',
    bottom: 0,
    height: 200,
    width: '100%',
  },
});