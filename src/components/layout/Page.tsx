import { PropsWithChildren } from 'react'
import { View, StyleSheet } from 'react-native'

export default function Page( { children }: PropsWithChildren<{}> ) {
    return (
        <View
            style={ styles.container }
        >
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      width: '100%',
      height: '100%'
    }
  });