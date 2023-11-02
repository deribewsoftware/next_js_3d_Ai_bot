"use client"

import React, { useState,createContext, ReactNode  } from "react";
interface AppContextType{
  isPlaying:boolean;
  setPlaying:React.Dispatch<React.SetStateAction<boolean>>
}

export const appContex=createContext<AppContextType>({
  isPlaying:false,
  setPlaying:()=>{}
})

 const AppProvider=({children}:{children:ReactNode})=>{
  const [isPlaying,setPlaying]=useState(false)

  return <appContex.Provider value={{isPlaying,setPlaying}}>
   {children}
  </appContex.Provider>
}
export default AppProvider;