import React from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import UseAuth from '../Hooks/UseAuth';
import { useState } from 'react';


const FindFriends = () => {

    const { auth } = UseAuth();
    const [boolean, setBoolean] = useState(1)
    const [userData, setUserData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8800/api/users/find/${auth?._id}`).then((res) => {
            setUserData(res.data);
        });
    }, [boolean]);

    const handleSubmit = (id) => {
        axios.get(`http://localhost:8800/api/users/request/${auth?._id}/${id}`).then(() => {
            setBoolean(boolean + 1)
            console.log('done');
        })
    }

    const handleCancel = (id) => {
        axios.put(`http://localhost:8800/api/users/request/${auth?._id}/${id}`).then(() => {
            console.log('cancelled');
            setBoolean(boolean - 1);
        })
    }

    return (
        <div className="flex flex-col items-center mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-20">Add Friends</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    userData?.map((elem) => (
                        <div key={elem._id} className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                            <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                            <div className="space-y-4 text-center divide-y divide-gray-700">
                                <div className="my-2 space-y-1">
                                    <h2 className="text-xl font-semibold sm:text-2xl">{elem.name}</h2>
                                    <p className="px-5 text-xs sm:text-base dark:text-gray-400">{elem.email}</p>
                                </div>
                                {
                                    !elem.friendRequests.includes(auth._id) 
                                    ?   <div className="px-4 py-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                            onClick={() => handleSubmit(elem._id)}
                                            >
                                                Sent request
                                            </button>
                                        </div>

                                    :   <div className="px-4 py-2">
                                            <button className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                                            onClick={() => handleCancel(elem._id)}
                                            >
                                                Cancel request
                                            </button>
                                        </div>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FindFriends;
