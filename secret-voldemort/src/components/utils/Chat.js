import React, { useState, useRef, useEffect, Component }  from "react";
import { sendRequest } from "../../services/request";

// props: messages, room_name, token
export const Chat = props => {
  const [text, setText] = useState('')

  
  const sendMessage = e => {
    e.preventDefault()
    const method = 'PUT'
    const path = `http://localhost:8000/${props.room_name}`
    const body = {msg: text}
    const header = {
      Accept: "application/json",
      Authorize: 'Bearer ' + props.token,
      "Content-Type": "application/json"
    }
    sendRequest(method, header, body, path).then(async response => {
      const data = await response.json()
      if (response.ok) {
        console.log('Message was delivered succesfully')
      } else {
        console.log(data.detail)
      }
    }).catch(error => {
      console.log(error.detail);
    }) 
  }

  return(
    <div class='column is-4 is-offset-8 '>
      <div class='chat py-0 my-0'>
        <ul>
          {props.messages.map(m => 
            <li>
              <p>{m}</p>  
            </li>
          )}
        </ul>
      </div>
      <input class='chat-input' type='text' value={text} onChange={e => setText(e.target.value)} onKeyDown={e => {
        if(e.key == "Enter") {
          sendMessage()
          setText('')
        }
      }}/>
    </div>
  )
}