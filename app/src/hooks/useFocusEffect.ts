import { useFocusEffect as ExpoUseFocusEffect } from 'expo-router'
import { useCallback } from 'react'

export default function useFocusEffect(callback: () => void, deps?: any[]) {
    return ExpoUseFocusEffect(useCallback(callback, deps || []))
}