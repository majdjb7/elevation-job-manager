import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

export default function Home(props) {
  const [name, setName] = useState('');

  useEffect(() => {
      (
          async () => {
              const response = await fetch('http://localhost:8888/auth/user', {
                  headers: {'Content-Type': 'application/json'},
                  credentials: 'include',
              });

              const content = await response.json();

              setName(content.name);
          }
      )();
  });
  return (
    <div>
        {name ? 'Hi ' + name : 'You are not logged in'}
    </div>
  );
}