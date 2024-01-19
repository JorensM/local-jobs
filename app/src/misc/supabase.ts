import 'react-native-url-polyfill/auto'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBrowserClient } from '@supabase/ssr/dist/index'; //Need to explicitly import the file because metro bundler doens't support implicit .mjs imports

const supabase = createBrowserClient(
    'https://yoiekjsjcdmjddgdurnj.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaWVranNqY2RtamRkZ2R1cm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwNTAzMTYsImV4cCI6MjAyMDYyNjMxNn0.i08XsWmZkIeU2nvTXriR7iI1UYuyuReVPmYXelS6Dxw',
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