import Image from 'next/image'
import { Inter } from 'next/font/google'

//clerk
import { UserButton } from "@clerk/nextjs";
import { SignUp , SignInButton } from "@clerk/nextjs";

//components
import Navbar from '@/components/Navbar';
import JoinChannels from '@/components/JoinChannels';
import Chat from '@/components/Chat';

//react
import { useContext, useEffect, useState } from 'react';
const inter = Inter({ subsets: ['latin'] })

import { DataContext } from '@/context/DataProvider';

export default function Home() {
  const [roomExists,setRoomExists]=useState<boolean>(false);
  const {providerRoomId}=useContext(DataContext);

  useEffect(()=>{
    if(providerRoomId){
      setRoomExists(true);
    }
  },[providerRoomId])


  return (
    <div>
			<Navbar></Navbar>
        {
          roomExists ? 

          <Chat></Chat>

          :

          <JoinChannels></JoinChannels>
        }
    </div>
  );
}
