import { PropsWithChildren } from 'react'
import { View, StyleSheet, Text, ViewProps, StyleSheetProperties, ViewStyle, StyleProp } from 'react-native'

export type PageProps = ViewProps & {
    /**
     * prop used to render the page in according to the page state, i.e errors, loading state etc.
     * this prop can be acquired by using the [usePage](../../hooks/usePage.ts) hook
     */
    pageState: {
        error: string | null
        loading: boolean
    }
    style?: any
}

/**
 * Page component that should be used on each individual page. 
 * Should be passed a `pageState` prop acquired via the [usePage](../../hooks/usePage.ts) hook
 * 
 */
export default function Page( { 
    children,
    pageState,
    style = {},
}: PropsWithChildren<PageProps> ) {

    // Page state
    const loading = pageState.loading;
    const error = pageState.error;

    return (
        <View
            style={{
                ...styles.container,
                ...(style ? style : {})
            }}
        >
            {
                // If loading, display 'Loading' message, if error, display the
                // error message. Otherwise show page contents
                loading || error ? 
                (
                    <View style={styles.message_container}>
                        <Text
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            {
                                error ?
                                    'An error has occured: ' + error
                                    // <Image 
                                    //     source='spinner.gif'
                                    //     placeholder={null}
                                    // />
                                : 'Loading'
                                    
                            }
                        </Text>
                    </View>
                ) : 
                children
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 8,
      width: '100%',
      height: '100%',
      gap: 8
    },
    message_container: {
        height: '100%',
        widht: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
  });