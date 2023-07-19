import React, { useState } from 'react'
import { createContext } from 'react'

export const DataContext=createContext();

export const DataProvider = (props) => {

  const [providerRoomId,setProviderRoomId]=useState("");

  return (
    <DataContext.Provider value={{providerRoomId,setProviderRoomId}}>
        {props.children}
    </DataContext.Provider>
  )
}