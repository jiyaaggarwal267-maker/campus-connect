import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

  const [user,setUser] = useState<User | null>(null);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{

    const checkAuth = async()=>{

      try{

        const response = await api.get("/auth/me");

        setUser(response.data);

      }
      catch(error:any){

        // 401 means user is simply not logged in
        if(error.response?.status === 401){
          setUser(null);
        }
        else{
          console.error("Auth error:",error);
        }

      }
      finally{
        setLoading(false);
      }

    };


    checkAuth();

  },[]);



  const login = (userData:User)=>{
    setUser(userData);
  };


  const logout = async()=>{

    try{

      await api.post("/auth/logout");

      setUser(null);

    }
    catch(error){

      console.log("Logout error",error);

    }

  };


  return(
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};



export const useAuth = ()=>{

  const context = useContext(AuthContext);

  if(!context){
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;

};