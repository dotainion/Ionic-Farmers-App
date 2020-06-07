import React, { Component } from 'react'
import { IonPage, IonContent, IonItem, IonList, IonLabel, IonItemDivider, IonInput, IonButton, IonToolbar, IonTitle, IonToast, IonIcon } from '@ionic/react';
import tools from '../components/FunctonTools'
import axios from 'axios'
import { grid  } from 'ionicons/icons';

class Login extends Component{
    constructor(props){
        super(props)

        this.toaststate = false;
        this.toastMsg = "";

        this.userName = "";
        this.password = "";

        this.credentials = {
            serverusername:tools.serverUserName,
            serverpassword:tools.serverPassword,
            username:"",
            password:""
        }
    }

    loginServer = () =>{
        axios.post(tools.url.login,this.credentials)
        .then(response =>{
            if (response.data === true){
                //for opening 
            }else if (response.data === false){
                this.toaststate = true;
                this.toastMsg = "Incorrect username or password";
            }else{
                this.toaststate = true;
                this.toastMsg = "The email you entered is not registered under this app";
            }
            this.setState({toastMsg:this.toastMsg,toaststate:this.toaststate})
        })
        .catch(error =>{
            
        })
    }

    loginCheck = () =>{
        var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        if (this.userName === "" && this.password === ""){
            this.toaststate = true;
            this.toastMsg = "Please try valid Credentials";
        }else if (this.userName === ""){
            this.toaststate = true;
            this.toastMsg = "Email feild is empty";
        }else if (this.password === ""){
            this.toaststate = true;
            this.toastMsg = "Password feild is empty";
        }else if (!reg.test(this.userName)){
            this.toaststate = true;
            this.toastMsg = "Please check email address";
        }else{
            this.credentials.username = this.userName;
            this.credentials.password = this.password;
            this.loginServer();
        }
        this.setState({toastMsg:this.toastMsg,toaststate:this.toaststate})
    }

    render(){

        return(
            <IonPage>
                <IonToolbar color="primary">
                    <IonItem color="primary">
                        <IonButton id="home" hidden routerLink="/dashboard"/>
                        <IonTitle>{tools.appName}</IonTitle>
                        <IonIcon onClick={()=>{document.getElementById("home").click()}} icon={grid}/>
                    </IonItem>
                </IonToolbar>
                <IonContent>
                    <IonList>
                        <div style={{marginTop:"30px",textAlign:"center",fontSize:"40px"}}>
                            <IonLabel color="primary">Login</IonLabel>
                        </div>
                        <div style={{marginTop:"30px"}}>
                        <IonItem>
                            <IonLabel style={{fontSize:"25px"}} position="floating">Email</IonLabel>
                            <IonInput placeholder="example@gmail.com" type="text"name="userName" value={this.userName} onIonChange={e=>{this.userName = e.target.value;this.setState({userName:this.userName})}}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel style={{fontSize:"25px"}} position="floating">Password</IonLabel>
                            <IonInput placeholder="************" type="password"name="password" value={this.password} onIonChange={e=>{this.password = e.target.value;this.setState({password:this.password})}}></IonInput>
                        </IonItem>
                        <IonItemDivider></IonItemDivider>
                        <IonItem>
                            <IonLabel color="danger" onClick={()=>{}}>Forget Password</IonLabel>
                        </IonItem>
                        
                        <IonItemDivider></IonItemDivider>
                    </div>    
                    </IonList>
                    <div style={{textAlign:"center"}}>
                        <IonButton onClick={this.loginCheck} style={{width:"130px"}} shape="round">Login</IonButton>
                        <IonButton routerLink="/register" style={{width:"130px"}} shape="round">Register</IonButton>
                    </div>

                    <IonToast isOpen={this.toaststate} position="top" onDidDismiss={()=>{this.toaststate=false;this.setState({toaststate:false})}}
                    message={this.toastMsg} duration={2000}/>
                    

                </IonContent>
            </IonPage>
        )
    }
}

export default Login