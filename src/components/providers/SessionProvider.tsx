import { PropsWithChildren, useEffect } from 'react';
import useAppwrite from '../../functions/useAppwrite';

export default function SessionProvider( { children }: PropsWithChildren) {

    const { fetchCurrentUser } = useAppwrite()

    useEffect(() => {

        fetchCurrentUser()
    
        /*
          Time in ms of how often session information should be retrieved
        */
        const fetch_user_interval = 4000
    
        setInterval(() => {
          fetchCurrentUser()
        }, fetch_user_interval)
    
      }, [])

    return (
        <>
            {children}
        </>
    )
}