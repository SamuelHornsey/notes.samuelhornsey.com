import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";

// Services
import UserContext from "./services/user";
import { auth } from "./services/firebase";

// Routes
import Guarded from "./routes/guarded";
import Login from "./routes/login";
import Home from "./routes/home";
import Edit from "./routes/edit";
import About from "./routes/about";

// Components
import Footer from "./components/footer";
import Nav from "./components/nav";

import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Guarded component={Home}></Guarded>} />
            <Route
              path="/edit/:folder/:note"
              element={<Guarded component={Edit}></Guarded>}
            />
            <Route path="/what-the-hell-is-this" element={<Guarded component={About}></Guarded>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
