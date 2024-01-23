// Core
import { usePathname } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

// Types
import { PageState } from '#types/PageState';

type PageHook = {
    /**
     * Use this to set the error message to display on the page. Set to null
     * to hide error message. If error message is present, it will be displayed
     * even if page is in loading state
     * 
     * @param message message to display or null to hide message
     */
    setError: (message: string | null) => void
    /**
     * Use this to set the loading state of the page as a boolean
     * 
     * @param is_loading whether page should be in loading state or not
     */
    setLoading: (is_loading: boolean) => void
    /**
     * Pass this to the Page/SessionPage component's `pageState` prop so it can display the state
     */
    pageState: PageState
}

/**
 * Hook to handle page state.
 */
export default function usePage(initialLoading: boolean = false): PageHook {

    // Hooks
    const pathname = usePathname()

    // State
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(initialLoading);

    /* 
        Reset loading state to initial loading state upon route change to prevent
        flickering when switching pages.
    */
    useEffect(() => {
        setLoading(initialLoading)
    }, [pathname])

    const pageState = useMemo(() => ({
        error,
        loading
    }), [error, loading])

    return {
        setError,
        setLoading,
        pageState
    }
}