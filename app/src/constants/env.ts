export const API_URL = process.env.EXPO_PUBLIC_API_URL
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

