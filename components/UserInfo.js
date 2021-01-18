import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState("Oliva");
  const [id, setId] = useState("6004ca42bc46d94bc0bfe35a");
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA0YzY3YWJjNDZkOTRiYzBiZmUzNTkiLCJpYXQiOjE2MTA5MjYxMDd9.pUrhHHV7LrT_2W-T_aUKL21Uv3nnjEt5Tnhs6Q22g2s");
  const [disheT, setD] = useState(0);
  const [roomsT, setR] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [room, setRoom] = useState([]);

  return (
    <AppContext.Provider value={{user, setUser, id, token, disheT, setD, roomsT, setR, dishes, setDishes, room, setRoom}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}