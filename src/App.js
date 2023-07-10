import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

import BookDetails from "./components/BookDetails";

import Navbar from "./components/Navbar";
import CartMenu from "./components/CartMenu";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import PrivateRoutes from "./components/PrivateRoutes";
import BookList from "./components/BookList";
import LandingPage from "./components/LandingPage";

// starts each page you navigate to at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login user
    fetch("/me", {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        res
          .json()
          .then((user) => {
            sessionStorage.setItem("user", user);
            setUser(user);
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleRegister = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <div className="app">
     
  
      {/* <ScrollToTop /> */}
      <Routes>
        
        {/* <Route element={<PrivateRoutes user={user} />}></Route> */}
        <Route exact path="/" element={ <LandingPage   />} />
        <Route exact path="/login" element={ <Login onLogin={handleLogin} />}/>
        {/* <Route exact path="/home" element={     <Navbar user={user} onLogout={handleLogout} />  } /> */}
        <Route exact path="/home" element={  <Home   />} />
        <Route exact path="/home" element={  <BookDetails   />} />

        <Route exact path="/register"element={!user ? (<Register onRegister={handleRegister} />) : (<Navigate to="/" />)}/>
       
        {/* <Route exact path="/book/:bookId" element={<BookDetails />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <CartMenu user={user} /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;