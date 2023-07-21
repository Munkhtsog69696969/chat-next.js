import React, { use, useContext, useEffect, useState } from 'react'
import { DataContext } from '@/context/DataProvider';
import { useUser } from '@clerk/nextjs';
import { ably } from '@/config/ably.config';
import axios from 'axios';

export default function Chat() {
    const {user}=useUser();
    const {providerRoomId}=useContext(DataContext);
    // const roomId=sessionStorage.getItem("roomid");
    const [input,setInput]=useState<string>("");

    const [messages,setMessages]=useState<{email:string,name:string,message:string,imageUrl:string,date:string}[]>([])

    useEffect(()=>{
        axios.post(`http://localhost:3000/api`,{id:providerRoomId})
            .then((res)=>{
                setMessages(res.data.messages)
            }).catch((err)=>{
                console.log(err)
            })
    },[]);

    const channel = ably.channels.get(providerRoomId);

    channel.subscribe((message) => {
        setMessages([...messages,{email:message.data.email , message:message.data.message , name:message.data.name , imageUrl:message.data.imageUrl , date:message.data.date}])
    });

    const Send=async()=>{
        if(input){
            await axios.put("http://localhost:3000/api",{id:providerRoomId,message:{email:user?.primaryEmailAddress?.emailAddress,message:input,name:user?.firstName,imageUrl:user?.imageUrl,date:new Date().toString()}})
            channel.publish("user",{email:user?.primaryEmailAddress?.emailAddress,message:input,name:user?.firstName,imageUrl:user?.imageUrl,date:new Date().toString()});
            let element:any = document.getElementById("commentsContainer");
            // element.scrollTop = element.scrollHeight;
            window.scrollTo(0, element.scrollHeight);
            setInput("");
        }
    }

    document.onkeydown = (event) => {
        if (event.key === "Enter") {
            Send();
        }
    }

    return (
        <div className='flex flex-1 h-270 relative'>
            <div id='commentsContainer' className='flex-1 flex h-5/6 overflow-auto scrolling-touch  flex-col'>
                {
                    messages?.map((message,i)=>{
                        return(
                           user?.primaryEmailAddress?.emailAddress!=message.email ?

                           <div key={i} className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                    <img src={message.imageUrl} />
                                    </div>  
                                </div>
                                <div className="chat-header">
                                    {message.name}
                                    <time className="text-xs opacity-50">{message.date.substring(0,10)}</time>
                                </div>
                                <div className="chat-bubble chat-bubble-primary">{message.message}</div>
                                {/* <div className="chat-footer opacity-50">
                                    Delivered
                                </div> */}
                            </div>

                            :

                            <div key={i} className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                    <img src={message.imageUrl} />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {message.name}
                                    <time className="text-xs opacity-50">{message.date.substring(0,10)}</time>
                                </div>
                                <div className="chat-bubble chat-bubble-primary">{message.message}</div>
                                {/* <div className="chat-footer opacity-50">
                                    Seen at 12:46
                                </div> */}
                            </div>
                        )
                    })
                }
            </div>
            <div className='border-grey border-t-2 h-24 flex flex-1 absolute bottom-0 right-0 left-0 justify-center items-center direction-row'>
               <input 
                placeholder='Message...'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e)=>{setInput(e.target.value)}}
                value={input}
               />
               <button
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 p-10 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={Send}
               >
                Send
               </button>
            </div>
        </div>
    )
}