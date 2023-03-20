import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import UseAuth from '../Hooks/UseAuth'
import { useState } from 'react'

function Requests() {
    const [requests, setRequests] = useState([])
    const [boolean, setBoolean] = useState(1)
    const { auth } = UseAuth();
    useEffect(() => {
        axios.get(`http://localhost:8800/api/users/friendrequests/${auth?._id}`).then((data) => {
            console.log(data);
            setRequests(data.data);
        })
    }, [boolean]);

    const handleAccept = (id) => {
        axios.put(`http://localhost:8800/api/users/accept/${auth?._id}/${id}`).then(() => {
            setBoolean(boolean + 1);
        })
    }

    const handleReject = (id) => {
        axios.put(`http://localhost:8800/api/users/reject/${auth?._id}/${id}`).then(() => {
            setBoolean(boolean + 1);
        })
    }

    return (
        <div className="flex flex-col items-center mt-12">
            <h2 className="text-3xl font-semibold text-gray-800">Friend Requests</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    requests?.map((elem) => (
                        <div
                            class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
                            <div class="rounded-t-lg h-32 overflow-hidden">
                                <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                            </div>
                            <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                                <img class="object-cover object-center h-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front' />
                            </div>
                            <div class="text-center mt-2">
                                <h2 class="font-semibold">{elem.name}</h2>
                                <p class="text-gray-500">{elem.email}</p>
                            </div>
                            <div class="flex justify-center pb-3 text-white mt-5">
                                <div class="text-center mr-3 border-r pr-3">
                                    <button className="bg-white hover:bg-gray-800 hover:text-white text-black font-bold py-2 px-4 rounded-full"
                                    onClick={() => handleAccept(elem._id)}
                                    >Confirm</button>
                                </div>
                                <div class="text-center">
                                    <button className="bg-white hover:bg-red-800 hover:text-white text-black font-bold py-2 px-4 rounded-full"
                                    onClick={() => handleReject(elem._id)}
                                    >Reject</button>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
            {
                requests?.length < 1 &&
                <div
                    class="mt-10 mb-4 rounded-lg font-bold bg-neutral-800 py-5 px-6 text-base text-neutral-50 dark:bg-neutral-900"
                    role="alert">
                     Sorry, you don't have any friend requests!
                  </div>
            }
        </div>
    )
}

export default Requests