import { IonContent, IonPage, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonTitle, IonIcon, IonToast } from '@ionic/react';
import React, { Component } from 'react';
import axios from 'axios'
import tools from '../components/FunctonTools'
import { grid } from 'ionicons/icons';


class SingUp extends Component{
    constructor(){
        super()

        this.toaststate = false;
        this.toastMsg = "";

        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.phoneNumber = "";
        this.city = "";
        this.homeAddress = "";
        this.shippingAddress = "";
        this.password = "";
        this.confirmPassword = "";

        this.userInfo = {
            serverUserName:"",
            serverPassword:"",
            firstname:"",
            lastname:"",
            username:"",
            phonenumber:"",
            city:"",
            homeaddress:"",
            shippingaddress:"",
            password:"",
        }
    }

    registerServer = () =>{
        //trhis will post user information to the server
        axios.post(tools.url.register,this.userInfo)
        .then(response =>{
            if (response.data === true){
                //remove data from variables once server submits its data successfully
                this.firstName = "";
                this.lastName = "";
                this.userName = "";
                this.phoneNumber = "";
                this.city = "";
                this.homeAddress = "";
                this.shippingAddress = "";
                this.password = "";
                this.confirmPassword = "";
                this.setState({
                    firstName:"",
                    lastName:"",
                    userName:"",
                    phoneNumber:"",
                    city:"",
                    homeAddress:"",
                    shippingAddress:"",
                    password:"",
                    confirmPassword:"",
                })
            }else if (response.data === false){
                this.toaststate = true;
                this.toastMsg = "This email already registered. Please go to login, where you can also recover your password.";
                this.setState({toastMsg:this.toastMsg,toaststate:true});
            }else{
                console.log("there was an error");
            }
        })
        .catch(error =>{

        })
    }

    credsCeck= () =>{
        var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        var msg = "feild must not be empty"
        if (this.firstName === ""){
            this.toaststate = true;
            this.toastMsg = "First Name "+msg;
        }else if (this.lastName === ""){
            this.toaststate = true;
            this.toastMsg = "Last Name "+msg;
        }else if (this.userName === ""){
            this.toaststate = true;
            this.toastMsg = "Email Address "+msg;
        }else if (this.phoneNumber === ""){
            this.toaststate = true;
            this.toastMsg = "Phone Number "+msg;
        }else if (this.city === ""){
            this.toaststate = true;
            this.toastMsg = "City "+msg;
        }else if (this.homeAddress === ""){
            this.toaststate = true;
            this.toastMsg = "Home Address "+msg;
        }else if (this.shippingAddress === ""){
            this.toaststate = true;
            this.toastMsg = "Shipping Address "+msg;
        }else if (this.password === "" || this.confirmPassword === ""){
            this.toaststate = true;
            this.toastMsg = "Password ";
        }else if (!this.password === this.confirmPassword){
            this.toaststate = true;
            this.toastMsg = "Password mismatch ";
        }else if (!reg.test(this.userName)){
            this.toaststate = true;
            this.toastMsg = "Please check email address";
        }else{
            this.userInfo.serverUserName = tools.serverUserName;
            this.userInfo.serverPassword = tools.serverPassword;
            this.userInfo.firstname = this.firstName;
            this.userInfo.lastname = this.lastName;
            this.userInfo.username = this.userName;
            this.userInfo.phonenumber = this.phoneNumber;
            this.userInfo.city = this.city;
            this.userInfo.homeaddress = this.homeAddress;
            this.userInfo.shippingaddress = this.shippingAddress;
            this.userInfo.password = this.password;
            this.registerServer();
        }
        this.setState({toastMsg:this.toastMsg,toaststate:this.toaststate});
    }
    render(){
        return (
            <IonPage>
            <IonToolbar color="success">
                <IonItem color="success">
                    <IonButton id="home" routerLink="/dashboard" hidden/>
                    <IonTitle>{tools.appName}</IonTitle>
                    <IonIcon onClick={()=>{document.getElementById("home").click()}} icon={grid}/>
                </IonItem>
            </IonToolbar>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">First Name</IonLabel>
                    <IonInput placeholder="John" onIonChange={e=>{this.firstName=e.target.value;this.setState({firstName:this.firstName})}} value={this.firstName}> </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Last Name</IonLabel>
                    <IonInput placeholder="Micheal" onIonChange={e=>{this.lastName=e.target.value;this.setState({lastName:this.lastName})}} value={this.lastName}> </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Email Address</IonLabel>
                    <IonInput placeholder="example@gmail.com" onIonChange={e=>{this.userName=e.target.value;this.setState({userName:this.userName})}} type="email" value={this.userName}> </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Phone Number</IonLabel>
                    <IonInput placeholder="1(473) 999-9999" onIonChange={e=>{this.phoneNumber=e.target.value;this.setState({phoneNumber:this.phoneNumber})}} type="number" value={this.phoneNumber}> </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">City</IonLabel>
                    <IonInput placeholder="St. George" onIonChange={e=>{this.city=e.target.value;this.setState({city:this.city})}} value={this.city}> </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Home Adress</IonLabel>
                    <IonInput placeholder="Tempe" onIonChange={e=>{this.homeAddress=e.target.value;this.setState({homeAddress:this.homeAddress})}} value={this.homeAddress}> </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Shipping Adress</IonLabel>
                    <IonInput placeholder="Tempe" onIonChange={e=>{this.shippingAddress=e.target.value;this.setState({shippingAddress:this.shippingAddress})}} value={this.shippingAddress}> </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput placeholder="Password#1" onIonChange={e=>{this.password=e.target.value;this.setState({password:this.password})}} value={this.password}> </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Confirm Password</IonLabel>
                    <IonInput placeholder="Password#1" onIonChange={e=>{this.confirmPassword=e.target.value;this.setState({confirmPassword:this.confirmPassword})}} value={this.confirmPassword}> </IonInput>
                </IonItem>
                    <div style={{textAlign:"center",marginTop:"15px"}}>
                        <IonButton onClick={this.credsCeck} style={{width:"150px"}} size="default" shape="round">Register</IonButton>
                        <IonButton routerLink="/login" style={{width:"150px"}} color="success" size="default" shape="round">Log in</IonButton>
                    </div>

                <IonToast isOpen={this.toaststate} position="top" onDidDismiss={()=>{this.toaststate=false;this.setState({toaststate:false})}}
                message={this.toastMsg} duration={3000}/>

            </IonContent>
            </IonPage>
        );
    }
};

export default SingUp;
