import { User } from '@/types/User';
import { createContext } from 'react';

const UserContext = createContext<[
    currentUser: User | undefined,
    setCurrentUser: (user: User) => void
]>([
    undefined,
    () => {}
])

export default UserContext;