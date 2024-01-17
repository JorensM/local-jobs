// Core
import React, { PropsWithChildren, useMemo } from 'react'

// Components
import Page, { PageProps } from '#/components/layout/Page'

// Hooks
import useAuth from '#hooks/useAuth'

// Types
import { PageState } from '#types/PageState';


type Props = PageProps & {}

/**
 * Page component used for pages that are only for users.
 */
export default function SessionPage({ children, pageState, ...props }: PropsWithChildren<Props>) {

    const auth = useAuth();

    // Intercept pageState and set it to loading if user is not logged in
    const _pageState: PageState = useMemo(() => {
        if (auth.user) {
            return pageState
        } else {
            return {
                error: pageState.error,
                loading: true
            }
        }
    }, [auth.user, pageState])

    return (
        <Page
            { ...props }
            pageState={_pageState}
        >
            { children }
        </Page>
    )
}