// Core
import { useFocusEffect as ExpoUseFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import useAuth from './useAuth';

/**
 * useFocusEffect wrapper
 * @param callback Callback to call on focus
 * @param deps Dependencies
 * @param use_auth Whether to call this effect only after user has been fetched. If true, also adds auth.user to deps 
 * @returns modified useFocusEffect
 */
export default function useFocusEffect(callback: () => void, deps?: any[], use_auth: boolean = false) {

    // Hooks
    const auth = useAuth();

    const auth_dep = use_auth ? [auth.user] : [] // If use_auth is true, add auth.user to dependencies
    const _deps = deps ? [...deps, ...auth_dep] : auth_dep
    
    return ExpoUseFocusEffect(
        useCallback(() => {
            if(use_auth && auth.user) {
                callback()
            } else if (!use_auth) {
                callback()
            }
        }, _deps || []) 
    )
}