/**
 * The role of a user
 */
type UserRole = "recruiter" | "performer"

type User = {
    /**
     * ID of user. Should not be changed
     */
    id: string,
    /**
     * Display name of user
     */
    name: string,
    /**
     * Role of user
     */
    role: UserRole
    /**
     * Contact information
     */
    phone_number?: string
    phone_country_code?: string
}

/**
 * Used in 'update' functions
 */
export type UserUpdate = Omit<Partial<User>, 'id'>

export { User, UserRole }