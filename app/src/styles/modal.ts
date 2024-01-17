import { StyleSheet } from 'react-native';

const modal = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000080',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        width: '80%',
        height: 'auto',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        gap: 16
    },
    header: {
        width: '100%',
    },
    content: {
        flexGrow: 1,
        width: '100%'
    },
})

export default modal;