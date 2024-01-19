// Core
import { StyleSheet } from 'react-native'
import { ErrorToast, SuccessToast, ToastConfig } from 'react-native-toast-message'


const styles = StyleSheet.create({
  base: {
    height: 'auto',
    width: '95%',
    padding: 8
  },
  container: {
    padding: 8
  }
  
})

const toast_config: ToastConfig = {
    success: (props) => (
      <SuccessToast
        {...props}
        style={styles.base}
        contentContainerStyle={styles.container}
        text1NumberOfLines={0} 
        text2NumberOfLines={0} // Need this because otherwise the text will end abruptly and show 3 dots
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={styles.base}
        contentContainerStyle={styles.container}
        text1NumberOfLines={0}
        text2NumberOfLines={0}
      />
    )
}

export default toast_config