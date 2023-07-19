import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useContext, useState } from 'react';
import { DataContext } from '@/context/DataProvider';

export default function JoinChannels() {
    const [roomId,setRoomId]=useState<string>("");
    const {setProviderRoomId}=useContext(DataContext)

    const Join=()=>{
        if(roomId){
            sessionStorage.setItem("roomid",roomId);
            setProviderRoomId(roomId)
        }
    }

    return (
        <div className='border-solid border-black border-4 flex flex-1 p-72 flex-row justify-center'>
            <input
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder='Type channel id...'
             onChange={(e)=>{setRoomId(e.target.value)}}
             value={roomId}
            />
            <button
             className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 p-10 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
             onClick={Join}
            >
                Join
            </button>
        </div>
    );
}
