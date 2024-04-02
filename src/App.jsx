import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Register/Register';
import { Auth, useAuth } from "@arcana/auth-react";

const App = () => {
  const auth = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <HomePage />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Register />
        </>
      ),
    }
  ]);

  const onLogin =() => {
    console.log("logged in");
  }


  // return (<div>
  //   {auth.loading ? (
  //     "Loading"
  //   ) : auth.isLoggedIn ? (
  //     <p>Logged In</p>
  //   ) : (
  //     <div>
  //       <Auth externalWallet={true} theme={"light"} onLogin={onLogin}/>
  //     </div>
  //   )}
  // </div>);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
