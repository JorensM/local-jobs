type UserRole = "recruiter" | "performer"

type User = {
    id: string,
    name: string,
    role: UserRole
}

export { User, UserRole }