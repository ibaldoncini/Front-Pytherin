import React, { useState, useRef, useEffect }  from "react";
import { Cookies } from "js-cookie";



// PROPS: room_name, token
export const Chat = props => {
  
  // const [msg, setMsg] = useState('')
  // const [Messages, setMessages] = useState([])
 
  const ws = new WebSocket(`ws://localhost:8000/testChat3/player2`)

  // useEffect(() => {    
  //     webSocket.current.onmessage = (message) => {
  //         setMessages(prev => [...prev, message.data]);
  //     }
  //     return () => webSocket.current.close();
  // }, [webSocket.current])

  // // ws.onmessage = (event) => {
  // //   var messages = document.getElementById('messages')
  // //   var message = document.createElement('li')
  // //   var content = document.createTextNode(event.data)
  // //   message.appendChild(content)
  // //   messages.appendChild(message)
  // // }

  // const sendMessage = () => {
  //   webSocket.current.send(msg)
  //   setMsg('');
  // }
  
  
  return(
    <div>
      {/* {console.log(props.token)}
      <h1>WebSocket Chat</h1>
      <form action="" onsubmit="sendMessage()">
        <input name='msg' type="text" id="messageText" value={msg} onChange={e => setMsg(e.target.value)} autocomplete="off"/>
        <button>Send</button>
      </form>
      <ul id='messages'>
        { Messages.map(msg => 
          <li>{msg}</li>
        )}
      </ul> */}
    </div>
  )
}
        