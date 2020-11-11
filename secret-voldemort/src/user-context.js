import { createContext } from 'react';

export const userContext = createContext({
    token: '',
    nickname: '',
    email: '',
    icon: {},

    setToken: () => {},
    setNickname: () => {},
    setEmail: () => {},
    setIcon: () => {}
});



 
