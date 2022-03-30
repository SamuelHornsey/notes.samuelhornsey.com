import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import UserContext from '../../services/user';
import { signInWithGoogle } from '../../services/firebase';

function Login() {
  const user = useContext(UserContext);

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <h1>Login</h1>

      <button onClick={signInWithGoogle}>Login</button>
    </div>
  )
}

export default Login;