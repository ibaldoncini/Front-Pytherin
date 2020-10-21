/* Here are declared the type of actions for the app */

export const LOGIN_SUC = 'LOGIN_SUC';

/* Here we create the action itself */

export function loginSuc(token){
    return { type: LOGIN_SUC, token: token}
}