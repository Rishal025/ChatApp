import React from 'react'
import UseAuth from '../Hooks/UseAuth'

function Dashboard() {
    const { auth } = UseAuth();
    console.log(auth);
    return (
        <>
            <h1 class="mt-10 text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Make networks with <span class="text-blue-600 dark:text-blue-500">the world's #1</span> Social Media App.</h1>
            <div className='flex justify-center items-center mt-20'>
            <div class="w-auto rounded overflow-hidden shadow-lg bg-gray-200">
                {/* <img class="w-full" src="https://www.itl.cat/pngfile/big/46-466252_travel-hiking-hd.jpg" alt="Sunset in the mountains" /> */}
                <div class="px-6 py-4">
                <h1 class="mb-4 text-xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Hello {auth?.name? auth.name : 'User'}</h1>
                <h3 class="text-xl text-center font-normal text-gray-500 lg:text-xl dark:text-gray-400">Welcome to your Dashboard</h3>
                </div>
            </div>
            </div>
        </>
    )
}

export default Dashboard