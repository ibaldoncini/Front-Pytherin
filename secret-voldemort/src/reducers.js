// import { combineReducers } from 'redux';
import { LOGIN_SUC } from './actions';

function loged_user(state = [], action) {
    switch (action.type) {
        case LOGIN_SUC:
            return {...state, action.token} // I need to test if this gonna work
    }
}

