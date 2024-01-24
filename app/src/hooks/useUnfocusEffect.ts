import { usePathname } from 'expo-router';
import { useEffect } from 'react';

export default function useUnfocusEffect(callback: () => void) {
    const pathname = usePathname();

    return useEffect(callback, [pathname])
}