import React, { Component } from 'react';
import '../components/StyleSheet.css'
import { IonPage, IonContent, IonButton, IonItem, IonImg, IonThumbnail, IonLabel, IonFooter, IonToolbar, IonAlert } from '@ionic/react';
import AllWidgets from '../components/Widgets'
import tools from '../components/FunctonTools'


var Widget = new AllWidgets();
class Dashboard extends Component{
    constructor(){
        super()
        

        this.x = "";
    };

    render(){
        return (
            <IonPage>
            <Widget.HeaderAndMenus/>
                <IonContent color="secondary">
                    <IonThumbnail style={{width:"100%",height:"200px"}}>
                        <IonImg src="https://image.shutterstock.com/image-vector/dashboard-theme-creative-infographic-city-260nw-752239603.jpg"/>
                    </IonThumbnail>
                    <IonItem color="secondary" style={{margin:"12px"}}>
                        <IonButton onClick={()=>{Widget.reaload()}} routerLink="/education" size="large" style={{width:"100%"}}>Education</IonButton>
                    </IonItem>
                    <IonItem color="secondary" style={{margin:"12px"}}>
                        <IonButton onClick={()=>{Widget.reaload()}} routerLink="/products" size="large" style={{width:"100%"}}>Products</IonButton>
                    </IonItem>
                    <IonItem color="secondary" style={{margin:"12px"}}>
                        <IonButton onClick={()=>{
                            if (tools.retreiveCreds("email") === "none" && tools.retreiveCreds("password") === "none"){
                                this.showPromptLogin = true;
                                this.setState({showPromptLogin:true});
                            }else{
                                Widget.reaload()
                                document.getElementById("upload").click();
                            }
                            }} size="large" style={{width:"100%"}}>Products Uploads</IonButton>
                    </IonItem>
                    <IonItem color="secondary" style={{margin:"12px"}}>
                        <IonButton onClick={()=>{Widget.reaload()}} routerLink="/transportation" size="large" style={{width:"100%"}}>Transportation</IonButton>
                    </IonItem>
                </IonContent>

                <IonButton hidden id="login" routerLink="/login"/>
                <IonButton hidden id="upload" routerLink="/upload"/>
                <IonButton hidden id="register" routerLink="/register"/>
                <IonAlert isOpen={this.showPromptLogin} onDidDismiss={() =>{this.showPromptLogin = false;this.setState({showPromptLogin:false})}} cssClass='my-custom-class'
                  header={'Alert!'} message={'<b>You must first login or register for an account</b>'} buttons={[ {
                  text: 'Login',
                  cssClass: 'secondary',
                  handler: () => {
                    //this will click the button that will open up login page
                    tools.previousPage("upload");
                    document.getElementById("login").click();
                  }}, {
                  text: 'Register',
                  handler: () => {
                    //this will click the button that will open up register page
                    tools.previousPage("upload");
                    document.getElementById("register").click();
                  }}]}/>

                <IonFooter>
                    <IonToolbar color="primary">
                        <div style={{textAlign:"center"}}><IonLabel>Making life great again</IonLabel></div>
                    </IonToolbar>
                </IonFooter>
            </IonPage>
        );
    }
};


export default Dashboard;
