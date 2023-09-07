//Core
import {
    PropsWithChildren, 
    useEffect, 
    useState } from 'react'
import { 
    View, 
    StyleSheet, 
    Text, 
    ViewProps, 
    StyleSheetProperties, 
    ViewStyle, 
    StyleProp, 
    Modal 
} from 'react-native'

//Components
import Info from '../typography/Info'
import Caption from '../typography/Caption'

export type PageProps = ViewProps & {
    loading?: boolean | null,
    error?: string | null,
    style?: any
}

const loading_debounce_ms = 50

let loading_timeout: NodeJS.Timeout | null = null

export default function Page( { 
    children,
    loading = false,
    error = null,
    style = {},
}: PropsWithChildren<PageProps> ) {

    const [showLoading, setShowLoading] = useState<boolean>(false)

    useEffect(() => {
        if (loading) {
            if (!loading_timeout) {
                loading_timeout = setTimeout(() => {
                    setShowLoading(true)
                }, loading_debounce_ms)
            } else {
                clearTimeout(loading_timeout)
                loading_timeout = setTimeout(() => {
                    setShowLoading(true)
                }, loading_debounce_ms)
            }
            
        } else {
            setShowLoading(false)
            if (loading_timeout) {
                console.log('clearing timeout')
                clearTimeout(loading_timeout)
            }
        }

        console.log('loading changed to', loading)
    }, [ loading ])

    return (
        <View
            style={{
                ...styles.container,
                ...(style ? style : {})
            }}
        >
            {
                error ? 
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
                ) : showLoading ?
                    <Modal
                        visible={true}
                        transparent={true}
                    >
                        <View
                            style={{
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                // opacity: 0.2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Info
                                variant='dark'
                            >
                                Loading
                            </Info>
                        </View>
                    </Modal>
                : null
            }

            { !error ? children : null }
            
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