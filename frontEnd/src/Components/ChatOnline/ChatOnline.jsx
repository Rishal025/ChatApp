import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UseAuth from '../../Hooks/UseAuth'
import './ChatOnline.css'

function ChatOnline({onlineUsers, currentId, setCurrentChat}) {

  const {auth} = UseAuth();
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [updatedFriendsList, setUpdatedFriendsList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8800/api/users/friends/${currentId}`).then((res) => {
       setFriends(res.data);
    });
  },[currentId]);
  
  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
    const updatedFriends = friends.map(friend => {
      const onlineUser = onlineUsers?.find(user => user === friend._id);
      if (onlineUser) {
        return { ...friend, isOnline: true }; // add new key value to matched friend
      }
      return friend;
    });
    setUpdatedFriendsList(updatedFriends);
  },[friends, onlineUsers]);

  const handleClick = async(user) => {
    try {
      console.log(user._id);
      const res = await axios.get(`http://localhost:8800/api/conversation/find/${currentId}/${user._id}`);
       setCurrentChat(res.data)
    } catch(err) {
      console.log(err);
    }
  }


  return (
    <div className="ChatOnline">
        {
          updatedFriendsList.map((x) => (
            <div className="chatOnlineFriend" onClick={() => handleClick(x)}>
            <div className="chatOnlineImgContainer">
            <img className='chatOnlineImg' src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" />
            <div className={ x.isOnline ? "chatOnlineBadge" : "chatOfflineBadge"}></div>
            </div>
            <span className="chatOnlineName">{x.name}</span>
        </div>
          ))
        }
    </div>
  )
}

export default ChatOnline