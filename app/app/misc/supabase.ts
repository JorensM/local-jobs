import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://yoiekjsjcdmjddgdurnj.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaWVranNqY2RtamRkZ2R1cm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwNTAzMTYsImV4cCI6MjAyMDYyNjMxNn0.i08XsWmZkIeU2nvTXriR7iI1UYuyuReVPmYXelS6Dxw',
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false
        }
    }
)

export default supabase