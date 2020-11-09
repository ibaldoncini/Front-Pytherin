import React from "react";
import { Redirect } from "react-router-dom"
import { sendRequest } from '../services/request'

export class Register extends React.Component{
    constructor(props){
        super(props);

        
        this.state = {
                    nameUser:'',
                    passUser: '',
                    passUser2: '',
                    mailUser: '',
                    redir: false,
                    toPage: '',
                    img: React.createRef()
                    };
        // Event handlers
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeImg = this.handleChangeImg.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.cleanFile = this.cleanFile.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
        this.sendData = this.sendData.bind(this)
    }
    // methods
    handleChange(e) {
       this.setState({[e.target.name]: e.target.value})
      }

    handleChangeImg(e){
        this.setState({img: e.target.files[0]})
    }

    cleanFile(){ // take care with null and object or file object
        document.getElementById("logoUser").value = null
        this.setState({img: null})
    }


    // validation
    handleSubmit(e){
        e.preventDefault()
        var regExpMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        var regExpPsw = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
        if(this.state.nameUser === ""){
            alert("Deberá seleccionar un nombre.")
        }else if(this.state.nameUser.length < 8){
            alert("El nombre de usuario deberá ser de al menos 8 caracteres.")
        }else if(this.state.passUser === ""){
            alert("Deberá seleccionar una contraseña.")
        }else if(this.state.passUser.length < 8 || this.state.passUser.length > 54){
            alert("La contraseña deberá comprender entre 8 y 54 caracteres.")
        }else if(!regExpPsw.test(this.state.passUser)){
            alert("La contraseña deberá tener carácteres al menos una letra mayúscula y un número.")
        }else if(this.state.passUser !== this.state.passUser2){
            alert("Las contraseñas no coinciden.")
        } else if(this.state.mailUser === "" || !regExpMail.test(this.state.mailUser)){
            alert("Deberá seleccionar un e-mail válido.")
        }else {
            this.sendData()
        }
    }

    
    sendData(){
        const path = 'http://127.0.0.1:8000/users/register'
        const nam = this.state.nameUser
        const mail = this.state.mailUser
        const pass = this.state.passUser
        const img = this.state.img
        const head = {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        var opts = `{
            "username": "${nam}",
            "password": "${pass}",
            "email": "${mail}",
            "icon" : "${img}"
        }`
        sendRequest('POST',head,opts, path)
        .then(async response => {
            const data  = await response.json()
            if(response.ok){
                alert("Usuario creado, se envió un mail de verificación a " + mail.toString())
            }else {
                alert(data.detail.toString())
            }
        })
    }
    handleRedirect(){
        this.setState({redir: true})
        this.setState({toPage : '/home'})
    }
    render(){
            if(this.state.redir){
                return <Redirect to={this.state.toPage} />    
            }
            return(
                <section>
                    <div className="container reg-bg py-6 px-6">
                        <h1 class='reg-title has-text-centered'>User registration</h1>
                        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                            <div class='field'>
                                <div class='container'>
                                    <label class='login-label is-large'>Username: </label>
                                    <div class='column is-3'>
                                        <input class='login-input' type="text" name="nameUser" id="nameUser" 
                                            value={this.state.nameUser} onChange={this.handleChange}/>  
                                    </div>
                                </div>
                            </div>
                            <div class='field'>
                                <div class='container is-horizontal'>
                                    <div class='field-body'>
                                        <label class='login-label is-large'>Password: </label>
                                        <div class='column is-3'>
                                            <input class='login-input' type="password" name="passUser" id="passUser" 
                                                value={this.state.passUser} onChange={this.handleChange}/>
                                        </div>
                                        <label class='login-label is-large'>Repeat password: </label>
                                        <div class='column is-3'>
                                            <input type="password" name="passUser2"
                                                id="passUser2" 
                                                value={this.state.passUser2} 
                                                onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='field'>
                                <div class='container'>
                                    <label class='login-label is-large'>E-mail: </label>
                                    <div class='column is-3'>
                                        <input class='login-input' type="text" name="mailUser" 
                                            id="mailUser" 
                                            value={this.state.mailUser} 
                                            onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                            
                            <div class='container has-text-centered'>
                                <input class='login-button is-large mx-2 is-rounded' type="submit" 
                                    id="regBtn" name="regBtn" value="Crear cuenta"/>
                                <input class='login-button is-large mx-2 is-rounded' type="button" 
                                    id="cancelBtn" name="cancelBtn" 
                                    onClick={this.handleRedirect} value="Cancel"/>
                            </div>
                        </form>
                    </div>
                </section>
            )
        }
}