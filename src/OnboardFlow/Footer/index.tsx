import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { OnboardComponents } from '../index';

export interface FooterProps {
  style?: ViewStyle;
  Components: OnboardComponents;
  paginationSelectedColor?: string;
  paginationColor?: string;
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  props?: any;
}

export const Footer: FC<FooterProps> = ({
                                          style,
                                          Components,
                                          paginationSelectedColor,
                                          paginationColor,
                                          currentPage,
                                          totalPages,
                                          goToNextPage,
                                          ...props
                                        }) => {
  return (
    <View style={[style]} {...props}>
      <Components.PaginationComponent
        paginationColor={paginationColor}
        paginationSelectedColor={paginationSelectedColor}
        currentPage={currentPage}
        totalPages={totalPages} />
      <Components.PrimaryButtonComponent currentPage={currentPage} totalPages={totalPages}
                                          goToNextPage={goToNextPage} />
    </View>
  );
};


const styles = StyleSheet.create({
});