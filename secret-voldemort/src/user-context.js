import { createContext } from 'react';

export const userContext = createContext({
    token: '',
    username: '',
    email: '',
    icon: {},

    setToken: () => {},
    setUsername: () => {},
    setEmail: () => {},
    setIcon: () => {}
});



 
