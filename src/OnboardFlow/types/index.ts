import { StyleProp, TextStyle } from 'react-native';
import { ReactElement } from 'react';
import { PageType } from '../index';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginationSelectedColor?: string;
  paginationColor?: string;
}

export interface PageData {
  imageComponent?: ReactElement;
  imageUri?: string;
  primaryButtonTitle?: string;
  subtitle?: string;
  title?: string;
  type?: PageType;
  props?: any;
}

export interface TextStyles {
  subtitleStyle?: StyleProp<TextStyle> | undefined;
  textAlign?: 'left' | 'center' | 'right';
  textStyle?: StyleProp<TextStyle> | undefined;
  titleStyle?: StyleProp<TextStyle> | undefined;
}