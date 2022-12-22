import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLOR_PAGINATION_DEFAULT, COLOR_PAGINATION_SELECTED_DEFAULT, VERTICAL_PADDING_DEFAULT } from '../../constants';
import { Dot } from './Dot';
import { FC } from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginationSelectedColor?: string;
  paginationColor?: string;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, paginationSelectedColor, paginationColor }) => {

  const dots = [];
  for (let i = 0; i < totalPages; i++) {
    dots.push(<Dot paginationColor={paginationColor ?? COLOR_PAGINATION_DEFAULT}
                   paginationSelectedColor={paginationSelectedColor ?? COLOR_PAGINATION_SELECTED_DEFAULT}
                   key={i}
                   selected={i === currentPage} />);
  }

  return (
    <View style={styles.container}>
      {dots}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: VERTICAL_PADDING_DEFAULT,
    marginBottom: VERTICAL_PADDING_DEFAULT/2,
  },
});