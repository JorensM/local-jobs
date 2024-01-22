// Constants from environment variables

const ENV_VARIABLE_NAMES = [
    'API_URL',
    'STRIPE_PUBLISHABLE_KEY',
    'SUPABASE_URL',
    'SUPABASE_KEY'
]

const validateEnvVariables = () => {
    const missing_vars = []
    // Turns out you can only us dot notation to access ENV variables so the 
    // Commented code below won't work. Have to check each var manually instead.
    // for(const var_name of ENV_VARIABLE_NAMES) {
    //     const full_var_name = 'EXPO_PUBLIC_' + var_name
    //     if(!process.env[full_var_name]) {
    //         missing_vars.push(full_var_name)
    //     }
    // }

    const fullVarName = (name: string) => 'EXPO_PUBLIC' + name

    if(!process.env.API_URL) {
        missing_vars.push(fullVarName('API_URL'))
    }
    if(!process.env.STRIPE_PUBLISHABLE_KEYL) {
        missing_vars.push(fullVarName('STRIPE_PUBLISHABLE_KEY'))
    }
    if(!process.env.SUPABASE_URL) {
        missing_vars.push(fullVarName('SUPABASE_URL'))
    }
    if(!process.env.SUPABASE_KEY) {
        missing_vars.push(fullVarName('SUPABASE_KEY'))
    }

    if (missing_vars.length > 0) {
        throw new Error('Missing the following environment variables: ' + missing_vars.join(', '))
    }
}

//validateEnvVariables(); Disable this for now because the app isn't detecting
//env variables in EAS Build.

export const API_URL = "https://local-jobs.deno.dev/";//process.env.EXPO_PUBLIC_API_URL!;
export const SUPABASE_URL = "https://yoiekjsjcdmjddgdurnj.supabase.co";//process.env.EXPO_PUBLIC_SUPABASE_URL!;
export const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvaWVranNqY2RtamRkZ2R1cm5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwNTAzMTYsImV4cCI6MjAyMDYyNjMxNn0.i08XsWmZkIeU2nvTXriR7iI1UYuyuReVPmYXelS6Dxw";//process.env.EXPO_PUBLIC_SUPABASE_KEY!;
export const STRIPE_PUBLISHABLE_KEY = "pk_test_51IsVKBGzVxrDUiCoswQCpPVrP81REBPngmYwbhWVyx89fBFDupveqPXGLWQiyZZbzqeBXphcps4VhPzwxCBk5mtc00zJo3d9kh";//process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!;