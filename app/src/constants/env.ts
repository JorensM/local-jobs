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

validateEnvVariables();

export const API_URL = process.env.EXPO_PUBLIC_API_URL!;
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
export const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY!;
export const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!;