import React from "react";
//import Email from "./components/email.js"
//import ButtonsRegister from "./components/bRegister"
//  va abajo  <Email /> <ButtonsRegister />
export default class Register extends React.Component{
    constructor(props){
        super(props);

        this.state = {name:'',
                      psw: '',
                      email: '',
                      img: null};

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangeImg = this.handleChangeImg.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeName(e){
        this.setState({name: e.target.value});
    }

    handleChangePass(e){
        this.setState({psw: e.target.value});
    }

    handleChangeMail(e){
        this.setState({email: e.target.value});
    }

    handleChangeImg(e){
        this.setState({
            img: e.target.files[0]
          })
    }
    handleSubmit(e){
        if(this.state.name === ""){ // define what to do, this is just for some testing.
            alert("Deberá seleccionar un nombre.");
            e.preventDefault();
        }else if(this.state.psw === ""){ // find regex
            alert("Deberá seleccionar una contraseña.");
            e.preventDefault();
        }else if(this.state.email === ""){ // find regex
            alert("Deberá seleccionar un e-mail.");
            e.preventDefault();
        }else if(this.state.img === null){
            alert("Deberá seleccionar una imagen de perfil.");
            e.preventDefault();
        }else{
            alert("Form submited!");
        }
    }
    render(){
           return <div className="registerUser">
                <form onSubmit={this.handleSubmit}>
                    <h1>Registrar nuevo usuario</h1>
                    <label>Nombre: </label><input type="text" name="nameUser" id="nameUser" value={this.state.name} onChange={this.handleChangeName}></input> <br/>
                    <label>Contraseña: </label><input type="password" name="passUser" id="passUser" value={this.state.psw} onChange={this.handleChangePass}></input><br/>
                    <label>E-mail: </label><input type="text" name="mailUser" id="mailUser" value={this.state.email} onChange={this.handleChangeMail}></input><br/>
                    <label>Imagen: </label><input type="file" name="logoUser" id="logoUser" value={this.state.img} onChange={this.handleChangeImg}></input><br/>
                    <input type="submit" id="regBtn" name="regBtn"/>
                </form>
            </div>;
        }
}