import { createContext, useEffect, useState, useContext } from "react";
// import { onAuthStateChanged } from 'firebase/auth';
// import { Auth } from "../../firebase";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [dbUser, setDbUser] = useState();
  const [tokenKey, setTokenKey] = useState("token"); 
  const [userKey, setUserKey] = useState("user");
  const [userIdKey, setUserIdKey] = useState("userid");
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [appLoad, setAppLoad] = useState();
  const [userId, setUserId] = useState("");
  const [reload, setReload] = useState();
  const [cartReload, setCartReload] = useState();
  const [userReload, setUserReload] = useState();
  const [wishListLoad, setwishListLoad] = useState();
  const [ordersLoad, setOrdersLoad] = useState();
  const [selectedDeliveryAddress, setSelectedDeleveryAddress] = useState("");

  useEffect(() => {
    getValueForToken(tokenKey);
    getValueForUser(userKey);
    getValueForUserId(userIdKey);
  }, [appLoad]);

  async function getValueForToken(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setToken(result);
    } else {
    }
  }
  async function getValueForUser(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setUser(result);
    } else {
    }
  }
  async function getValueForUserId(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setUserId(result);
    } else {
    }
  }
  console.log("TOKEN : ", token);
  console.log("USER : ", user);
  console.log("USER id: ", userId);
  return (
    <AuthContext.Provider
      value={{
        dbUser,
        setDbUser,
        user,
        token,
        userId,
        reload,
        setReload,
        selectedDeliveryAddress,
        setSelectedDeleveryAddress,
        cartReload,
        setCartReload,
        userReload,
        setUserReload,
        setwishListLoad,
        wishListLoad,
        setAppLoad,
        appLoad,
        setToken,
        ordersLoad,
        setOrdersLoad
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);