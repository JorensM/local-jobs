import { PropsWithChildren, useState, createElement, createContext, useRef } from 'react';
import { View } from 'react-native'
import { Snackbar } from 'react-native-paper';

let snackbar_max_id: number = 0;

type SnackbarData = {
    id: number, 
    visible: boolean, 
    message: string,
    timeout: number
}

const SnackbarContext = createContext<{
    createSnackbar: (message: string, timeout?: number) => void,
    hideSnackbar: (snackbar_id: number) => void
}>({
    createSnackbar: () => {},
    hideSnackbar: () => {}
})

export default SnackbarContext

export function SnackbarProvider( { children }: PropsWithChildren) {

    // const [activeSnackbars, setActiveSnackbars] = useState<typeof Snackbar[]>([])

    const [snackbarsData, setSnackbarsData] = useState<SnackbarData[]>([])

    const snackbarsDataRef = useRef(snackbarsData)
    // snackbarsDataRef.current = snackbarsData

    const createSnackbar = (message: string, timeout: number = 7000) => {

        const id = snackbar_max_id++

        setSnackbarsData(snackbars => [
            ...snackbars,
            {
                id: id,
                message: message,
                visible: true,
                timeout: timeout
            }
        ])

        setTimeout(() => {
            //const new_snackbars = [...snackbarsDataRef.current]
            
            setSnackbarsData(snackbars => { 
                const index = snackbars.findIndex(snackbar => snackbar.id === id)
                const new_snackbars = [...snackbars]
                new_snackbars.splice(index, 1)
                console.log('new snackbars:', new_snackbars)
                return new_snackbars
            })
        }, timeout + 4000)
    }

    const setSnackbarProperty = (
        snackbar_id: number, 
        property_name: string, 
        new_value: any
    ) => {
        

        setSnackbarsData(snackbars => {
            const new_snackbars: any = [ ...snackbars ]
            const index = new_snackbars.findIndex((snackbar: SnackbarData) => snackbar.id === snackbar_id);

            if (index > -1) {
                new_snackbars[index][property_name as keyof SnackbarData] = new_value
            }

            return new_snackbars
        })
    }

    const hideSnackbar = (snackbar_id: number) => {
        setSnackbarProperty(snackbar_id, 'visible', false)
    }

    return (
        <SnackbarContext.Provider value={{createSnackbar, hideSnackbar}}>
            {children}
            <View>
                {snackbarsData.map((snackbar, index) => (
                    <Snackbar
                        visible={snackbarsData[index].visible}
                        onDismiss={() => {
                            console.log('dismissing')
                            hideSnackbar(snackbar.id)
                        }}
                        action={{
                            label: 'CLOSE',
                            onPress: () => setSnackbarProperty(snackbar.id, 'visible', false)
                        }}
                        duration={snackbar.timeout}
                    >
                        {snackbar.message}
                    </Snackbar>
                ))}
            </View>
        </SnackbarContext.Provider>
    )
}