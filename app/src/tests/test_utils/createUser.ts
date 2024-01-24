import { Session, User } from '@supabase/supabase-js';

/**
 * Creates and returns a Supabase User object
 * @param email email to use in the object
 * @returns supabase User object
 */
const createSupabaseUser = (email: string): User => ({
    id: 'test-id',
    email: email,
    app_metadata: {},
    user_metadata: {},
    aud: "123",
    created_at: "123"
})

/**
 * Creates and returns a Supabase Session object
 * @param user User object to pass to Session object
 * @param access_token Access token to pass to Session object
 * @param refresh_token Refresh token to pass to Session object
 * @returns a Supabase Session object
 */
const createSupabaseSession = (
    user: User,
    access_token: string = 'test-access-token', 
    refresh_token: string = 'test-refresh-token'
): Session => ({
    access_token,
    refresh_token,
    expires_in: 123,
    token_type: '123',
    user
})

export { createSupabaseUser, createSupabaseSession };