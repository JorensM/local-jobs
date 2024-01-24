import { Session, User } from '@supabase/supabase-js';

const createSupabaseUser = (email: string): User => ({
    id: 'test-id',
    email: email,
    app_metadata: {},
    user_metadata: {},
    aud: "123",
    created_at: "123"
})

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