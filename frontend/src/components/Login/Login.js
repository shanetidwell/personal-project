import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';



export default function(props) {
  return (
    <div>
      <h1> What you need, when you need it </h1>
      <a href="http://localhost:4000/auth"><button>Login</button></a>
    </div>
  )
}