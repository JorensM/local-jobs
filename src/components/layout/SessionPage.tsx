//Core
import { PropsWithChildren } from 'react'

//Types
import { PageProps } from './Page'

//Components
import Page from './Page'

//Functions
import useCheckLogin from '../../functions/useCheckLogin'

type Props = PageProps & {}

export default function SessionPage({ children, ...props }: PropsWithChildren<PageProps>) {

    useCheckLogin('Login')

    return (
        <Page
            { ...props }
        >
            { children }
        </Page>
    )
}