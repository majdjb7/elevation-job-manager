import React from 'react';

export default function Home(props) {
  return (
    <div>
        {props.name ? 'Hi ' + props.name : 'You are not logged in'}
    </div>
  );
}