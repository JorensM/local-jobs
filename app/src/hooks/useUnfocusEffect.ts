import { usePathname } from 'expo-router';
import { useEffect } from 'react';

export default function useUnfocusEffect(callback: () => void, route_name: string) {
    const pathname = usePathname();

    return useEffect(() => {
        if(pathname !== route_name) {
            callback();
        }
    }, [pathname])
}