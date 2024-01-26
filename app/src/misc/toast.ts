// Core
import Toast from 'react-native-toast-message'

// Styles
import text from '#styles/text'

// Style that is common across all secondary texts in toasts
const text2Style = text.small

/**
 * Displays a success toast. Use to affirm that some successful action has completed
 * @param text 
 * @param text2 
 */
export function toastSuccess(text: string, text2?: string) {
    Toast.show({
        type: 'success',
        text1: text,
        text2: text2,
        text2Style,
        position: 'bottom'
    })
}

/**
 * Displays an error toast. Use to display when an error has occured
 * @param text 
 * @param text2 
 */
export function toastError(text: string, text2?: string) {
    Toast.show({
        type: 'error',
        text1: text,
        text2: text2,
        text2Style,
        position: 'bottom'
    })
}

/**
 * Displays an info toast. Use to display a general informative event
 * @param text 
 * @param text2 
 */
export function toastInfo(text: string, text2?: string) {
    Toast.show({
        type: 'info',
        text1: text,
        text2: text2,
        text2Style,
        position: 'bottom'
    })
}