// Constants from environment variables

const ENV_VARIABLE_NAMES = [
    'API_URL',
    'STRIPE_PUBLISHABLE_KEY',
    'SUPABASE_URL',
    'SUPABASE_KEY'
]

const validateEnvVariables = () => {
    const missing_vars = []
    for(const var_name of ENV_VARIABLE_NAMES) {
        const full_var_name = 'EXPO_PUBLIC_' + var_name
        if(!process.env[full_var_name]) {
            missing_vars.push(full_var_name)
        }
    }

    if (missing_vars) {
        throw new Error('Missing the following environment variables: ' + missing_vars)
    }
}

validateEnvVariables();

export const API_URL = process.env.EXPO_PUBLIC_API_URL!;
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
export const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY!;
export const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!;