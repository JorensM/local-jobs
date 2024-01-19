import Toast from 'react-native-toast-message'

export function toastSuccess(text: string, text2?: string) {
    Toast.show({
        type: 'success',
        text1: text,
        text2: text2,
        text2Style: {
            fontSize: 16,
        },
        position: 'bottom'
    })
}

export function toastError(text: string, text2?: string) {
    Toast.show({
        type: 'error',
        text1: text,
        text2: text2,
        text2Style: {
            fontSize: 14
        },
        position: 'bottom'
    })
}

export function toastInfo(text: string, text2?: string) {
    Toast.show({
        type: 'info',
        text1: text,
        text2: text2,
        text2Style: {
            fontSize: 14
        },
        position: 'bottom'
    })
}