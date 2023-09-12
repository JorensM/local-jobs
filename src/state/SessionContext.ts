import { createContext } from 'react';

import { Session } from '../types/Session';



const SessionContext = createContext<{
    session: Session | null
    setSession: (new_session: Session | null) => void
}>({
    session: null,
    setSession: (a) => {}
})

export default SessionContext