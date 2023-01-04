import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  COLOR_PAGINATION_DEFAULT,
  COLOR_PAGINATION_SELECTED_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
} from '../../../../constants';
import { Dot } from './Dot';
import { PaginationProps } from '../../../types';

export const DotPagination: FC<PaginationProps> = ({
                                                  currentPage,
                                                  totalPages,
                                                  paginationSelectedColor,
                                                  paginationColor,
                                                }) => {

  const elements = [];
  for (let i = 0; i < totalPages; i++) {
    elements.push(<Dot paginationColor={paginationColor ?? COLOR_PAGINATION_DEFAULT}
                   paginationSelectedColor={paginationSelectedColor ?? COLOR_PAGINATION_SELECTED_DEFAULT}
                   key={i}
                   selected={i === currentPage} />);
  }

  return (
    <View style={styles.container}>
      {elements}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: VERTICAL_PADDING_DEFAULT,
    height: 16,
  },
});