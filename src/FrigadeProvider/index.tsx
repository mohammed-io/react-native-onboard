import { StyleSheet } from 'react-native';


export interface FrigadeProviderProps {
  children: React.ReactNode;
  publicApiKey?: string;
}

export const FrigadeProvider = ({
                                  publicApiKey,
                                  ...props
                                  }: FrigadeProviderProps) => {
  const {children} = props;

  return (
    <>
      {children}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
})