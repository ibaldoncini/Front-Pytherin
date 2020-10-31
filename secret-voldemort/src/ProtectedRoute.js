import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userContext } from './user-context';

export const ProtectedRoute = (props) => {
  return(
    <Route exact path={props.path}
      render = {() => {
        if (props.token !== '') {
          return props.component;
        }
        else {
          return <Redirect to='/'/>;
        }
      }}  
    />
  )
}

export const ProtectedRouteLogin = (props) => {
  return(
    <Route exact path={props.path}
      render = {() => {
        if (props.token === '') {
          return props.component
        }
        else {
          return <Redirect to='/home'/>;
        }
      }}  
    />
  )
}