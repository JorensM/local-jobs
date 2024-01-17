import { PropsWithChildren } from 'react'
import { View, StyleSheet, Text, ViewProps, StyleSheetProperties, ViewStyle, StyleProp } from 'react-native'

export type PageProps = ViewProps & {
    pageState: {
        error: string | null
        loading: boolean
    }
    style?: any
}

export default function Page( { 
    children,
    pageState,
    style = {},
}: PropsWithChildren<PageProps> ) {

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
      height: '100%'
    },
    message_container: {
        height: '100%',
        widht: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
  });