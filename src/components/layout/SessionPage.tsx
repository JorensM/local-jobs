import { PropsWithChildren } from 'react'

import Page from './Page'
import useCheckLogin from '../../functions/useCheckLogin'

type Props = {}

export default function SessionPage({ children }: PropsWithChildren<Props>) {

    useCheckLogin('Login')

    return (
        <Page>
            {children}
        </Page>
    )
}