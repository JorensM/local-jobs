jest.mock('#hooks/useAuth', () => {
    
    const { getUser, setUser, getSession: _getSession } = jest.requireActual('../hook_utils');

    return {
        __esModule: true,
        default: () => ({
            login: async (email: string, password: String) => {
                setUser({
                    id: email,
                    name: email,
                    role: 'performer'
                })
                return true;
            },
            getSession: async () => {
                return _getSession()
            },
            user: getUser()
        })
    }
})

