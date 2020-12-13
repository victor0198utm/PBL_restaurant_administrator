import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState("MY RESTAURANT");
  const [id, setId] = useState("5fcebe22a5e758375843c76c");
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNkNzBmNjk5NWMxZjM3OThjNmViNjIiLCJpYXQiOjE2MDc0NDA2MTJ9.ycPmdRVStLV0uI0TJqkVv9Fgy4eeWtkKjqVHV9g17Lc");


  return (
    <AppContext.Provider value={{user, setUser, id, token}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}