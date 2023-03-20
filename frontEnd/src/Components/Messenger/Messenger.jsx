import React, { useEffect, useRef, useState } from 'react'
import ChatOnline from '../ChatOnline/ChatOnline'
import Conversation from '../Conversations/Conversation'
import Message from '../Message/Message'
import './messenger.css'
import useAuth from '../../Hooks/UseAuth'
import axios from 'axios'
import {io} from 'socket.io-client'

function Messenger() {

    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage,  setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUser, setOnlineUsers] = useState([])
    const socket = useRef();
    const {auth} = useAuth();
    const scrollRef = useRef();

    useEffect(() => {
      socket.current = io("ws://localhost:8900")
      socket.current.on("getMessage", data => {
        setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
        })
      })
    }, []);

    useEffect(() => {
       arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
       setMessages((prev) =>[...prev, arrivalMessage]);
    },[arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", auth?._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                auth?.friends.filter((f) => users.some((u) => u.userId == f))
                )
        })
    }, [auth]);

    useEffect(() => {
        const getconversations = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/conversation/${auth?._id}`);
                console.log(res)
                setConversation(res.data);
            } catch(err) {
                console.log(err)
            }
        }
        getconversations();
    },[auth?._id])

    useEffect(() => {
        const getMessages = async(req, res) => {
            try {
                const res = await axios.get('http://localhost:8800/api/messages/'+currentChat?._id);
                setMessages(res.data)
            } catch(err) {
                console.log(err);
            }
        }
        getMessages()
    }, [currentChat]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const message = {
            sender: auth?._id,
            text: newMessage,
            conversationId: currentChat._id,
        }

        const receiverId = currentChat.members?.find(member => member !== auth?._id);

        socket.current.emit("sendMessage", {
            senderId: auth?._id,
            receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post('http://localhost:8800/api/messages/', message);
            setMessages([...messages, res.data])
            setNewMessage("");
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])
 
  return (
    <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder='Search for friends' className='chatMenuInput' />
                {
                    conversation?.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={auth}/>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                {
                    currentChat ?
                    <>
                     <div className="chatBoxTop">
                     {
                        messages?.map((m) => (
                            <div ref={scrollRef}>
                                <Message messages={m} own={m.sender === auth?._id}/>
                            </div>
                        ))
                     }
                </div>
                <div className="chatBoxBottom">
                    <textarea className='chatMessageInput' placeholder='write something..'
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    ></textarea>
                    <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                </div>
                </> : <span className='noConversation'>Open a conversation.</span>
               }
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <ChatOnline onlineUsers={onlineUser} currentId={auth?._id} setCurrentChat={setCurrentChat}/>
            </div>
        </div>
    </div>
  )
}

export default Messenger