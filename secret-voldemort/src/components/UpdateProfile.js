import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../user-context';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import Button from './Button';
import { sendRequest } from '../services/request';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export function UpdateProfile(props) {

  const context = useContext(userContext);
  const [nickname, setNickname] = useState('');
  const [nameValidation, setNameValidation] = useState('')
  const [responseDetail, setResponseDetail] = useState('')
  const [fieldValidation, setFieldValidations] = useState('')
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if(context.nickname === '') {
        const cookie = Cookies.getJSON("user");
        if(cookie !== undefined) {
            context.setNickname(cookie.nickname);
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
    
    if (field_value && (field_value.length < 8 || field_value.length > 15)) {
      return setNameValidation('Nickname must contain between 8 and 15 characters')
    }

    //If everything is correct I don't show a message.

    return setNameValidation('')
    
  }
  
  const handleNickname = (e) => {
    setResponseDetail('')
    setFieldValidations('')
    setNameValidation('')
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

    if(nameValidation === '' && nickname.length !== 0) {
      sendRequest("PUT", headers, keys, "http://127.0.0.1:8000/users/change_username")
        .then(async response => {
          const data = await response.json();

          if(!response.ok) {
            return setResponseDetail(data.detail["msg"])
          } else {
            context.setNickname(nickname)
            Cookies.remove("user")
            Cookies.set("user", {
              nickname: nickname,
              token: context.token,             // It should be recodified.
              email: context.email,
              icon: context.icon
            })
            setOpen(true)
            return setResponseDetail(data.message)
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
              <Button style='room-button mx-2 my-2' path='/home' text='Cancel' type='btncn'/>
            </form>
            <div>
              <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
                
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {responseDetail}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <button onClick={handleClose}>
                    Ok
                  </button>
                </DialogActions>
              </Dialog>
            </div>
            <br/>
            <p class="help is-danger">{responseDetail}</p>
            <p class="help is-danger">{fieldValidation}</p>
          </div>
          :
          <Redirect to='/'/> )
        :
        <Redirect to='/'/>
      }
    </div>
  )

}