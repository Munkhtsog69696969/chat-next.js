import Image from 'next/image'
import { Inter } from 'next/font/google'

import {
    UserButton
  } from "@clerk/nextjs";

export default function Navbar() {

    return (
        <div className='bg-blue-500 flex items-center p-10 h-20 justify-between'>
            <div className="text-white font-bold text-3xl">Chat App</div>
            <div>
                <UserButton/>
            </div>
        </div>
    );
}
