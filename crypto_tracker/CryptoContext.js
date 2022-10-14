import React, { useContext, useState, 
   createContext, useEffect } 
   from "react";
import { USD, GBP } from "../constants/crypto_names";

const Crypto = createContext();

const CryptoContext = ({ children }) => { 
   const [currency, setCurrency] = useState(USD);
   const [symbol, setSymbol] = useState('$');

   useEffect(() => {
      if (currency === USD) setSymbol('$');
      else if (currency === GBP) setSymbol('£');
    
   }, [currency]);
   
   return <Crypto.Provider value={{currency, symbol, setCurrency}}>{children}</Crypto.Provider>
   
};

export default CryptoContext;

export const CryptoState = () => { 
   return useContext(Crypto);
};