import React, { useState } from 'react';
import { 
  // useSelector, 
  useDispatch } from 'react-redux';
import {
  login, 
  // selectToken, 
  // selectUser
} from './loginSlice';

export function Login() {
  // const user = useSelector(selectUser);
  // const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        <input
          aria-label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => dispatch(login({username, password}))}
        >
          Log In
        </button>
      </div>
    </div>
  );
}
