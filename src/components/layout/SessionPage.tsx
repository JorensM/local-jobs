//Core
import { PropsWithChildren, useCallback } from 'react'

//Types
import { PageProps } from './Page'

//Components
import Page from './Page'

//Functions
import useCheckLogin from '../../functions/useCheckLogin'
import useAppwrite from '../../functions/useAppwrite'
import { useFocusEffect } from '@react-navigation/native'

type Props = PageProps & {}

export default function SessionPage({ children, ...props }: PropsWithChildren<PageProps>) {

    useCheckLogin('Login')

    const { fetchCurrentUser } = useAppwrite()

    // useFocusEffect(
    //     useCallback(() => {
    //         fetchCurrentUser()
    //     }, [])
    // )

    return (
        <Page
            { ...props }
        >
            { children }
        </Page>
    )
}