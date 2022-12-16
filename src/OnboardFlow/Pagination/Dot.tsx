import { Animated, Easing, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';

export function Dot({ selected, paginationSelectedColor, paginationColor }: {
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
        toValue: 11,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(sizeAnim, {
        toValue: 8,
        duration: 250,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    }
    setIsSelected(selected);
  }, [selected]);

  return (
    <Animated.View style={[styles.dot, {
      width: sizeAnim,
      height: sizeAnim,
      backgroundColor: selected ? paginationSelectedColor : paginationColor,
    }]} />
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 16,
    marginHorizontal: 4,
  },
});