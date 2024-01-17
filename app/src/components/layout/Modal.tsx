// Core
import modal from '#styles/modal'
import { PropsWithChildren } from 'react'
import { Modal as NativeModal, View } from 'react-native'

type ModalProps = {
    visible: boolean
}

/**
 * Custom modal component to simplify some recurring stuff from the native `Modal`
 * 
 * ## Props
 * 
 * * `visible` - Whether the modal should be shown
 * 
 * ## Subcomponents
 * * `Modal.Header` - Header of the modal. If used, should be first component in the modal
 * * `Modal.Content` - Contents of modal
 * 
 */
function Modal( { visible, children }: PropsWithChildren<ModalProps>) {
    return (
        <NativeModal
            transparent={true}
            visible={visible}
        >
            <View
                style={modal.background}
            >
                <View
                    style={modal.box}
                >
                    { children }
                </View>
            </View>
        </NativeModal>
    )
}

Modal.Header = ( { children }: PropsWithChildren) => {
    return (
        <View
            style={modal.header}
        >
            { children }
        </View>
    )
}

Modal.Content = ( { children }: PropsWithChildren) => {
    return (
        <View
            style={modal.content}
        >
            { children }
        </View>
    )
}


export default Modal;