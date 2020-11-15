import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../../user-context';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { Button } from '../utils/Button';
import { sendRequest } from '../../services/request';
import { SetCookies } from '../utils/SetCookies';

export function UpdateProfile(props) {

  const context = useContext(userContext);
  const [nickname, setNickname] = useState('');
  const [nameValidation, setNameValidation] = useState('')
  const [badResponseDetail, setBadResponseDetail] = useState('')
  const [goodResponseDetail, setGoodResponseDetail] = useState('')
  const [fieldValidation, setFieldValidations] = useState('')
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if(context.username === '') {
        const cookie = Cookies.getJSON("user");
        if(cookie !== undefined) {
            context.setUsername(cookie.username);
            context.setEmail(cookie.email);
            context.setToken(cookie.token);
            context.setIcon(cookie.icon);
        }
    }
  }, [context])

  // Dialog   

  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setRedirect(true)
    setOpen(false);
  };


  const validateOne = (e) => {
    const field_name = e.target.name
    const field_value = e.target.value
    
    if (field_value.length === 0) {
      return setNameValidation(`${field_name} is required`)
      
    }
    
    if (field_value && (field_value.length < 3 || field_value.length > 15)) {
      return setNameValidation('Nickname must contain between 3 and 15 characters')
    }

    //If everything is correct I don't show a message.

    return setNameValidation('')
    
  }
  
  const handleNickname = (e) => {
    setBadResponseDetail('')
    setFieldValidations('')
    setNameValidation('')
    setGoodResponseDetail('')
    setNickname(e.target.value)
  }
  
  const handleSubmit = (e) => {

    e.preventDefault()
  
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + context.token,
      "Content-Type": "application/json"
    }

    const keys = {username: nickname}

    /* If there is no error in the name validation and there is indeed a name ... */

    if(nameValidation === '' && nickname.length !== 0) {
      sendRequest("PUT", headers, keys, "http://127.0.0.1:8000/users/change_username")
        .then(async response => {
          const data = await response.json();

          if(!response.ok) {
            return setBadResponseDetail(data.detail)
          } else {
            /* If the name was changed correctly I must refresh the token */
            const headers2 = {
              Accept: "application/json",
              Authorization: "Bearer " + context.token
            }
            sendRequest("PUT", headers2, {}, "http://127.0.0.1:8000/users/refresh")
              .then(async response2 => {
                const data2 = await response2.json();

                if(!response2.ok) {
                  return setBadResponseDetail(data2.detail)
                } else {
                  
                  context.setUsername(nickname)
                  context.setToken(data2.access_token)
                  console.log(context.token)
                  Cookies.remove("user")
                  SetCookies("user", nickname, data2.access_token, context.email, context.icon)
                  setOpen(true)
                  return setGoodResponseDetail(data.message)
                }
              })
          }
        })
    } else {
      if (nickname.length === 0) {
        setFieldValidations('Please enter a nickname to update it.')
      }
    }

  }

  return(
    <div>
      { (redirect === false) ?  
          ((Cookies.get("user") !== undefined) ?
          <section class='room-bg'>
          <div class='container has-text-centered mt-6'>
            <form onSubmit={handleSubmit}>
              <div class="field">
                  <label class='room-label'>New nickname</label>
                  <div>
                    <input type="text" name="Nickname" id="nameUser" 
                      value={nickname} onChange={handleNickname} onBlur={validateOne}/> 
                  </div>
                  <div class="help is-danger">{nameValidation}</div>
              </div>
              <input class='room-button mx-2 my-2' name='Update' type='submit' value='Update'/>
              <Button style='room-button mx-2 my-2' path='/home' text='Home' type='btncn'/>
            </form>
            
            <br/>
            {(badResponseDetail !== '') ? 
              <p class="help is-danger">{badResponseDetail}</p>
            :
            <p class="help is-success">{goodResponseDetail}</p>
            }
            <p class="help is-danger">{fieldValidation}</p>
          </div>
          </section>
          :
          <Redirect to='/'/> )
        :
        <Redirect to='/'/>
      }
    </div>
  )

}