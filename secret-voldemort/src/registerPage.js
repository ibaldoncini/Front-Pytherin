import React from "react";
import { Redirect } from "react-router-dom"
export default class Register extends React.Component{
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
        var regExpMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        var regExpPsw = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
        if(this.state.nameUser === ""){
            alert("Deberá seleccionar un nombre.")
            e.preventDefault();
        }else if(this.state.nameUser.length < 8){
            alert("El nombre de usuario deberá ser de al menos 8 caracteres.")
            e.preventDefault();
        }else if(this.state.passUser === ""){
            alert("Deberá seleccionar una contraseña.")
            e.preventDefault();
        }else if(this.state.passUser.length < 8 || this.state.passUser.length > 54){
            alert("La contraseña deberá comprender entre 8 y 54 caracteres.")
            e.preventDefault();
        }else if(!regExpPsw.test(this.state.passUser)){
            alert("La contraseña deberá tener carácteres al menos una letra mayúscula y un número.")
            e.preventDefault();
        }else if(this.state.passUser !== this.state.passUser2){
            alert("Las contraseñas no coinciden.")
            e.preventDefault();
        } else if(this.state.mailUser === "" || !regExpMail.test(this.state.mailUser)){
            alert("Deberá seleccionar un e-mail válido.")
            e.preventDefault();
        }
    }
    handleRedirect(){
        this.setState({redir: true})
        this.setState({toPage : '/index'})
    }
    render(){
            if(this.state.redir){
                return <Redirect to={this.state.toPage} />    
            }
            return <div className="registerUser">
                <form action='users/register' method='POST' id='fRegister' name='fRegister' onSubmit={this.handleSubmit}>
                    <h1>Registrar nuevo usuario</h1>
                    <label>Nombre: </label><input type="text" name="nameUser" id="nameUser" value={this.state.nameUser} onChange={this.handleChange}></input> <br/>
                    <label>Contraseña: </label><input type="password" name="passUser" id="passUser" value={this.state.passUser} onChange={this.handleChange}></input><br/>
                    <label>Repita contraseña: </label><input type="password" name="passUser2" id="passUser2" value={this.state.passUser2} onChange={this.handleChange}></input><br/>
                    <label>E-mail: </label><input type="text" name="mailUser" id="mailUser" value={this.state.mailUser} onChange={this.handleChange}></input><br/>
                    <label>Imagen: </label><input type="file" ref={this.img} name="logoUser" id="logoUser" onChange={this.handleChangeImg}></input>
                    <input type="button" id="cleanBtn" name="cleanBtn" value="Limpiar" onClick={this.cleanFile}/><br/>
                    <input type="submit" id="regBtn" name="regBtn" value="Crear cuenta"/>
                    <input type="button" id="cancelBtn" name="cancelBtn" onClick={this.handleRedirect} value="Cancelar"/>
                </form>
            </div>;
        }
}