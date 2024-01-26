import { usePathname } from 'expo-router';
import { useEffect } from 'react';

/**
 * Wrapper for an effect with pathname dep. Callback will be called when page gets
 * unfocused
 * @param callback Callback
 * @param route_name The route on which the effect is called
 * @returns a useEffect that runs the provided callback when page gets unfocused
 */
export default function useUnfocusEffect(callback: () => void, route_name: string) {
    const pathname = usePathname();

    return useEffect(() => {
        if(pathname !== route_name) {
            callback();
        }
    }, [pathname])
}