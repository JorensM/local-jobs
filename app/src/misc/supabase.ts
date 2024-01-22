import 'react-native-url-polyfill/auto' // Need this otherwise Supabase doesn't work

// Core
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBrowserClient } from '@supabase/ssr/dist/index'; //Need to explicitly import the file because metro bundler doens't support implicit .mjs imports

// Constants
import { SUPABASE_KEY, SUPABASE_URL } from '#constants/env';

// Testing
import * as AsyncStorageTest from '@react-native-async-storage/async-storage/jest/async-storage-mock'

const test_storage: any = {}

console.log(process.env.NODE_ENV)

/**
 * Supabase client
 */
const supabase = createBrowserClient(
    SUPABASE_URL, 
    SUPABASE_KEY,
    {
        auth: {
            storage: AsyncStorage, // Use test AsyncStorage if it's a test
            autoRefreshToken: true,
            persistSession: process.env.NODE_ENV != 'test' ? true : false,
            detectSessionInUrl: false
        },
        cookies: { // This is not being used anywhere but is required by TS for some reason
            get: async (key: string) => {
                console.log('getting cookie')
                return test_storage[key]
            },
            set: async(key: string, value: string) => {
                test_storage[key] = value
            },
            remove: async (key: string) => {
                delete test_storage[key]
            }
        }
    }
)

export default supabase