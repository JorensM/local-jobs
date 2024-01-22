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
}

export { User, UserRole }