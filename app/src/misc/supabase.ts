import 'react-native-url-polyfill/auto'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBrowserClient } from '@supabase/ssr/dist/index'; //Need to explicitly import the file because metro bundler doens't support implicit .mjs imports

// Constants
import { SUPABASE_KEY, SUPABASE_URL } from '#constants/env';

const supabase = createBrowserClient(
    SUPABASE_URL, 
    SUPABASE_KEY,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false
        },
        cookies: {
            get: async (key: string) => {
                console.log('getting cookie')
                return null;
            },
            set: async(key: string, value: string) => {
                console.log('setting cookie')
            },
            remove: async (key: string, value: string) => {
                console.log('removing cookie')
            }
        }
    }
)

export default supabase