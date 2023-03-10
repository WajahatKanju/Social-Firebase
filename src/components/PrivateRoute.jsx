import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({component: Component}) {
  
  const {currentUser} = useAuth()

  // return (
  //   // <Route>
  //     return currentUser ? <Component /> : <Navigate to='/login' /> ;
 
  //   // </Route>
  // )

  return currentUser ? <Outlet /> : <Navigate to='/login' />;
}
