# Frigade react-native-onboard documentation

Frigade's onboarding library for React Native provides a series of delightful standardized components to easily build
your onboarding experiences. Examples of use cases the library solves:

 - 👋 First time onboarding education
 - 📋 User registration flows
 - ✨ New user guided product tours
 - 🆕 Feature announcements
 - 💟 NPS and User Surveys


![onboard gif](swiper-examples.png)

## Installation

Install the package with either npm or yarn:

```bash
npm install react-native-onboard
```
or
```bash
yarn add react-native-onboard
```

## Quick start
Place the `OnboardFlow` component anywhere in your app. It will automatically take up the entire screen.

```jsx
import { OnboardFlow } from 'react-native-onboard';

<OnboardFlow fullscreenModal={true} pages={[
  {
    title: 'Welcome to my app',
    subtitle: 'Cool description of my app',
    imageUri: 'https://illlustrations.co/static/f8a168f23ea5623d0c8987b551729183/day78-wallet.png',
  },
  {
    title: 'Page 2 header',
    subtitle: 'Welcome to page 2',
    imageComponent: <MyCustomComponent/>
  }]} />
```

To see the SDK in action, we've a [live demo](https://snack.expo.dev/@christian-frigade/react-native-onboard-simple-demo) on Expo Snack.

## Updating your onboarding flow without app builds and releases
While the above examples contain hard-coded strings and images for illustrative purposes, we highly recommend loading your strings and presentation
layer logic from your API rather than as plain strings in your app.

[Frigade Cloud](https://frigade.com/get-started) offers a hosted service that allows you to update your onboarding flow without having to push a new app build to the app store while also providing a series of very useful [integrations](https://frigade.com/integrations).

Get started on [Frigade Cloud](https://frigade.com/get-started)



# Frontend API

The core component of the SDK is the `<OnboardFlow />` component. It supports the following options.
The complete set of **options** is described below:

| option                     | description                                                                                                 | type                         | default value |
|----------------------------|-------------------------------------------------------------------------------------------------------------|------------------------------|---------------|
| `backgroundImageUri`       | Uri of a static background image                                                                            | `string`                     |               |
| `dismissButtonStyle`       | Style of the dismiss button placed in upper right corner. Only used in conjunction with `showDismissButton` | `ViewStyle`                  |               |
| `fullscreenModal`          | When `true`, the onboarding flow is shown inside a native `<Modal>`                                         | `boolean`                    | `true`        |
| `onBack`                   | Called when the user goes back one page                                                                     | `() => void`                 |               |
| `onNext`                   | Called when the user goes forward one page                                                                  | `() => void`                 |               |
| `pageStyle`                | Global style of the individual pages in the flow                                                            | `ViewStyle`                  |               |
| `pageTypes`                | Map of page type name to page type. Used only when using custom page types                                  | `OnboardPageTypesConfig`     |               |
| `pages`                    | Array of objects containing the individual page data                                                        | `PageData[]`                 |               |
| `paginationColor`          | Color of the pagination progress bars                                                                       | `string`                     |               |
| `paginationSelectedColor`  | Color of the selected pagination bar                                                                        | `string`                     |               |
| `showDismissButton`        | When `true`, a dismiss button will be shown. Only applicable when running the flow in a modal               | `boolean`                    |               |
| `style`                    | Style of wrapping components that holds the onboarding flow                                                 | `ViewStyle`                  |               |
| `subtitleStyle`            | Style of the secondary header                                                                               | `ViewStyle`                  |               |
| `textAlign`                | Alignment of the text on the individual pages                                                               | `left`, `center`, or `right` |               |
| `titleStyle`               | Style of the primary header                                                                                 | `ViewStyle`                  |               |
| `FooterComponent`          | Optional custom footer component                                                                            | `FC<FooterProps>`            |               |
| `PaginationComponent`      | Optional custom pagination component                                                                        | `FC<PaginationProps>;`       |               |
| `PrimaryButtonComponent`   | Optional primary button component                                                                           | `FC<PrimaryButtonProps>`     |               |
| `SecondaryButtonComponent` | Optional secondary button component                                                                         | `FC<SecondaryButtonProps>`   |               |

## Page data

The `pages` option is an array of objects containing the individual page data. The following options are available:

| option               | description                                                                                      | type        | default value |
|----------------------|--------------------------------------------------------------------------------------------------|-------------|---------------|
| `title`              | Primary header text                                                                              | `string`    |               |
| `subtitle`           | Secondary header text                                                                            | `string`    |               |
| `imageUri`           | Uri of a static image to be displayed on the page                                                | `string`    |               |
| `imageComponent`     | Custom component to be displayed on the page                                                     | `ReactNode` |               |
| `primaryButtonTitle` | Text of of the primary button. Useful when wanting custom copy on e.g. the last page of the flow | `string`    |               |
| `type`               | Type of page to use when rendering. This should match a key in the `PageTypes` map.              | `PageType`  |               |
| `props`              | Any custom properties and data you wish to pass to the given page.                               | `any`       |               |


# Using your own components
`react-native-onboard` is designed to be headless and customizable. You can use the default UI or create your own by
implementing a series of provided interfaces.

# Custom components
The following components can be customized by passing in your own component as a prop:
 - Default page
 - Navigation footer
 - Pagination progress bar
 - Primary button
 - Secondary button

If you wish to further customize your onboarding, see the section on [creating custom page types](#custom-page-types).

For example, to implement your own Primary button component, you can do the following:

```jsx
import { OnboardFlow, PrimaryButtonProps } from 'react-native-onboard';

const MyPrimaryButton = ({ text, goToNextPage }) => {
  return (
    <TouchableOpacity onPress={goToNextPage}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <OnboardFlow
      pages={pages}
      PrimaryButtonComponent={MyPrimaryButton}
    />
  );
};
```

To fully replace the footer component, you can do the following:

```jsx
import { OnboardFlow, FooterProps } from 'react-native-onboard';

const MyFooter = ({ goToNextPage, goToPreviousPage, currentPage, totalPages }) => {
  return (
    <View>
      <TouchableOpacity onPress={goToPreviousPage}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToNextPage}>
        <Text>{currentPage == totalPages - 1 ? 'Finish' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <OnboardFlow
      pages={pages}
      FooterComponent={MyFooter}
    />
  );
};
```


The individual props passed in to the component are described below:

## Primary button and Secondary button component props
| prop           | description                        | type         |
|----------------|------------------------------------|--------------|
| `currentPage`  | The current page index             | `number`     |
| `text`         | Text of the button                 | `string`     |
| `goToNextPage` | Advances the flow to the next page | `() => void` |
| `totalPages`   | Total number of pages in the flow  | `number`     |

## Pagination component props
| prop           | description                        | type         |
|----------------|------------------------------------|--------------|
| `currentPage`  | The current page index             | `number`     |
| `totalPages`   | Total number of pages in the flow  | `number`     |

## Footer component props
| prop               | description                                          | type         |
|--------------------|------------------------------------------------------|--------------|
| `currentPage`      | The current page index                               | `number`     |
| `goToNextPage`     | Advances the flow to the next page                   | `() => void` |
| `goToPreviousPage` | Goes back to the previous page                       | `() => void` |
| `totalPages`       | Total number of pages in the flow                    | `number`     |
| `pages`            | Array of objects containing the individual page data | `PageData[]` |

# Creating custom page types
The SDK comes with a series of useful page types, but also supports custom page types. This allows you to create your own page types and use them in your onboarding flow.
To create a custom page type, you must pass in a map of page types to page components. The key of the map is the page type name (to be referenced in the `PageData` entry), and the value is the component to be rendered.

For example, to create a custom page type called `myCustomPage`, you can do the following:

```jsx
import { OnboardFlow, PageTypes } from 'react-native-onboard';

const MyCustomPage = ({ pageProps }) => {
  return (
    <View>
      <Text>{pageProps.title}</Text>
      <Text>{pageProps.subtitle}</Text>
      <Image source={{ uri: pageProps.imageUri }} />
      <TouchableOpacity onPress={pageProps.goToNextPage}>
        <Text>{pageProps.primaryButtonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <OnboardFlow
      PageTypes={{
        ...PageTypes,
        myCustomPage: MyCustomPage,
      }}
      pages={[
        {
          title: 'My custom page',
          subtitle: 'This is a custom page',
          imageUri: 'https://example.com/image.png',
          primaryButtonTitle: 'Next',
          type: 'myCustomPage',
        },
      ]}
    />
  );
};
```



## Get in touch
Questions? Comments? Suggestions? Feel free to [open an issue](https://github.com/FrigadeHQ/react-native-onboard/issues), [submit a PR](https://github.com/FrigadeHQ/react-native-onboard/pulls), or [contact us](https://frigade.com).