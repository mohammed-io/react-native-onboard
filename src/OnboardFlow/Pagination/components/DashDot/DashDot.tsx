import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

const minWidth = 8;
const maxWidth = 24;
const height = 8;

export function DashDot({ selected, paginationSelectedColor, paginationColor }: {
                      selected: boolean;
                      paginationSelectedColor: string;
                      paginationColor: string;
                    },
) {
  const sizeAnim = useRef(new Animated.Value(8)).current;
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    if (selected) {
      Animated.timing(sizeAnim, {
        toValue: maxWidth,
        duration: 400,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(sizeAnim, {
        toValue: minWidth,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    }
    setIsSelected(selected);
  }, [selected]);

  return (
    <Animated.View style={[styles.dot, {
      width: sizeAnim,
      height: height,
      backgroundColor: selected ? paginationSelectedColor : paginationColor,
    }]} />
  );
}

const styles = StyleSheet.create({
  dot: {
    width: minWidth,
    height: height,
    borderRadius: 32,
    marginHorizontal: 2,
  },
});