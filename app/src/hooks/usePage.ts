// Core
import { usePathname } from 'expo-router/src/hooks';
import { useEffect, useMemo, useState } from 'react';

/**
 * Hook to handle page state.
 *  
 * @returns object with following properties:
 * 
 * * **setError** - Use this to set the error message to display on the page. Set to null
 * to hide error message
 * * **setLoading** - Use this to set the loading state of the page as a boolean
 * * **pageState** - Pass this to the Page/SessionPage component's `pageState` prop so it can display the state
 */
export default function usePage(initialLoading: boolean = false) {
    const pathname = usePathname()

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(initialLoading);

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