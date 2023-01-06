import { PhoneNumberEntryPage } from './pages/PhoneNumberEntryPage';
import { PhoneNumberVerificationPage } from './pages/PhoneNumberVerificationPage';
import { FormEntryPage } from './pages/FormEntryPage';
import { MultipleChoicePage } from './pages/MultipleChoicePage';

export const PRIMARY_BUTTON_TEXT_DEFAULT = "Continue";
export const PRIMARY_BUTTON_TEXT_LAST_PAGE_DEFAULT = "Get started";

export const HORIZONTAL_PADDING_DEFAULT = 16;
export const HORIZONTAL_PADDING_SMALL_DEFAULT = 8;
export const VERTICAL_PADDING_DEFAULT = 16;
export const VERTICAL_PADDING_SMALL_DEFAULT = 8;


export const COLOR_TEXT_DEFAULT = '#000000';
export const COLOR_MUTED_TEXT_DEFAULT = '#6b6b6b';

export const COLOR_PAGINATION_DEFAULT = '#989898';
export const COLOR_PAGINATION_SELECTED_DEFAULT = '#000000';

export const TEXT_ALIGN_DEFAULT = 'center';

export const DEFAULT_PAGE_TYPES = {
  phoneNumberEntry: PhoneNumberEntryPage,
  phoneNumberVerification: PhoneNumberVerificationPage,
  formEntry: FormEntryPage,
  multipleChoice: MultipleChoicePage,
};