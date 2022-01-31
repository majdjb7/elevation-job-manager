import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import Login from './Login'

export default function Home(props) {
  
  return (
    <div>
        {props.name ? props.setLoggedIn(true) : <Login />}
        
    </div>
  );
}