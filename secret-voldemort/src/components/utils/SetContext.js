import { useContext } from 'react';
import Cookies from 'js-cookie';
import { userContext } from '../../user-context';

/* This function is responsible for setting the context with the data stored in the cookie. */

export function SetContext(cookiename) {
    const context = useContext(userContext);
    const cookie = Cookies.getJSON(cookiename);
    if (cookie !== undefined) {
      context.setUsername(cookie.username);
      context.setEmail(cookie.email);
      context.setToken(cookie.token);
      context.setIcon(cookie.icon);
    }
}