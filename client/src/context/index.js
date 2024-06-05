import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const AccountContext = createContext(null);

const AccountProvider = () => {
  const [user, setUser] = useState(null);

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Outlet />
    </AccountContext.Provider>
  );
};

export default AccountProvider;
