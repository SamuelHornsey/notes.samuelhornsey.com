import React from 'react';

import { signOut } from 'firebase/auth';
import { auth } from "../../services/firebase";

function Home() {
  const logout = () => {
    signOut(auth)
  }
  return (
    <div>
      Home

      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home;