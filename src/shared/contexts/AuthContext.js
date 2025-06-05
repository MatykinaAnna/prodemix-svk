import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext({});

//@ts-ignore
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null });

  //@ts-ignore
  const setAuthData = (data) => {
    //@ts-ignore
    setAuth({data: data});
  };

  useEffect(() => {
    setAuth({ loading: false, data: JSON.parse(window.localStorage.getItem('authData'))});
    
  }, []);

  useEffect(() => {
    window.localStorage.setItem('authData', JSON.stringify(auth.data));
  }, [auth.data]);

  return (
    //@ts-ignore
    <authContext.Provider value={{ auth, setAuthData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;