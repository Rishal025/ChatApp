import React from 'react'
import './Message.css'
import {format} from 'timeago.js'

function Message({messages, own}) {

  return (
    <div className={own? "message own" : "message"}>
        <div className="messageTop">
            <img className='messageImg' src="https://img.freepik.com/premium-vector/social-avatar-stories-gradient-frame_41737-3.jpg" alt="" />
            <p className='messageText'>{messages?.text}</p>
        </div>
        <div className="messageBottom">{format(messages?.createdAt)}</div>
    </div>
  )
}

export default Message