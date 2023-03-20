import React, { useEffect, useState } from 'react'
import './Conversation.css'
import axios from 'axios'

function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState('');

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/users?userId='+friendId);
        console.log(res);
        setUser(res.data); 
      } catch(err) {
        console.log(err);
      }
    }
    getUser();
  },[currentUser, conversation])

  return (
    <div className='conversation'>
      <img src="https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png" alt="" className="conversationImg" />
      <span className="conversationName">{user?.name}</span>
    </div>
  )
}

export default Conversation