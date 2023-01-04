import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { PaginationProps } from '../../../types';

export const LinePagination: FC<PaginationProps> = ({
                                                     currentPage,
                                                     totalPages,
                                                     paginationSelectedColor,
                                                     paginationColor,
                                                   }) => {

  const sizeAnim = useRef(new Animated.Value(0)).current;
  const [selectedPage, setSelectedPage] = useState(currentPage);

  useEffect(() => {
    if (currentPage !== selectedPage) {
      Animated.timing(sizeAnim, {
        toValue: currentPage / (totalPages ?? 1) * 100,
        duration: 50,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();

      setSelectedPage(currentPage);
    }
  }, [currentPage]);

  return (
    <View style={[styles.container, {backgroundColor: paginationColor}]}>
      <Animated.View style={[styles.line, {
        width: sizeAnim + '%',
        backgroundColor: paginationSelectedColor,
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    backgroundColor: '#E6E6E6',
    borderRadius: 15,
    width: '100%',
    height: 16
  },
  line: {
    backgroundColor: '#000000',
    borderRadius: 15,
    height: 16,
  }
});