// Types
import { User } from '#types/User'

export type TestUser = User & {
    email: string,
    password: string
}