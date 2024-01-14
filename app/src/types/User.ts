type UserRole = "recruiter" | "performer"

type User = {
    id: string,
    role: UserRole
}

export { User, UserRole }