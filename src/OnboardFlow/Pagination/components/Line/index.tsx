import React, { FC, useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { PaginationProps } from '../../../types';
import { HORIZONTAL_PADDING_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../../../../constants';

export const LinePagination: FC<PaginationProps> = ({
                                                     currentPage,
                                                     totalPages,
                                                     paginationSelectedColor,
                                                     paginationColor,
                                                   }) => {

  // const sizeAnim = useRef(new Animated.Value(getToValue())).current;
  const [selectedPage, setSelectedPage] = useState(-1);
  const [sizeAnim, setSizeAnim] = useState(getToValue()); // TODO: make this animated

  function getToValue() {
    return (currentPage + 1) / (totalPages ?? 1) * 100;
  }

  useEffect(() => {
    const toValue = getToValue();
    if (currentPage !== selectedPage) {
      // Animated.timing(sizeAnim, {
      //   toValue: toValue,
      //   duration: 50,
      //   useNativeDriver: false,
      //   easing: Easing.ease,
      // }).start();
      setSelectedPage(currentPage);
      setSizeAnim(toValue);
    }
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <View style={[styles.lineContainer]}>
        <Animated.View style={[styles.line, {
          width: sizeAnim + '%'
        }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: VERTICAL_PADDING_DEFAULT,
    marginHorizontal: HORIZONTAL_PADDING_DEFAULT,
    height: 8,
  },
  lineContainer: {
    flex: 1,
    alignItems: 'flex-start',
    borderRadius: 15,
    height: 8,
    margin: 'auto',
    backgroundColor: '#E6E6E6',
    width: '50%'
  },
  line: {
    backgroundColor: '#000000',
    borderRadius: 32,
    height: 8,
  }
});