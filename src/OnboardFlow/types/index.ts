import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { FC, ReactElement } from 'react';
import { OnboardPageTypesConfig, PageType } from '../index';
import { HeaderProps } from '../Header';
import { FooterProps } from '../Footer';
import { PrimaryButtonProps } from '../components/PrimaryButton';
import { SecondaryButtonProps } from '../components/SecondaryButton';

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
  showFooter?: boolean;
  showHeader?: boolean;
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

export interface OnboardFlowProps {
  backgroundImageUri?: string;
  dismissButtonStyle?: StyleProp<ViewStyle> | undefined;
  /**
   * @deprecated Use `type='fullscreen'` instead
   */
  fullscreenModal?: boolean;
  onBack?: () => void;
  onDone?: () => void;
  onNext?: () => void;
  pageStyle?: StyleProp<ViewStyle> | undefined;
  pageTypes?: OnboardPageTypesConfig;
  pages?: PageData[];
  paginationColor?: string;
  paginationSelectedColor?: string;
  showDismissButton?: boolean;
  enableScroll?: boolean;
  style?: StyleProp<ViewStyle> | undefined;
  type?: 'inline' | 'fullscreen' | 'bottom-sheet';
  customVariables?: object;
  HeaderComponent?: FC<HeaderProps>;
  FooterComponent?: FC<FooterProps>;
  PaginationComponent?: FC<PaginationProps>;
  PrimaryButtonComponent?: FC<PrimaryButtonProps>;
  SecondaryButtonComponent?: FC<SecondaryButtonProps>;
}
