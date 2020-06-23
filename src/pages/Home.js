import React, { Component } from 'react';
import '../components/StyleSheet.css'
import { IonPage, IonContent, IonButton, IonItem, IonLabel, IonFooter, IonToolbar, IonAlert, IonIcon, IonList } from '@ionic/react';
import AllWidgets from '../components/Widgets'
import tools from '../components/FunctonTools'
import { schoolOutline, carOutline, cartOutline, keyOutline, logInOutline, cloudUploadOutline } from 'ionicons/icons';


var Widget = new AllWidgets();
class Home extends Component{
    constructor(){
        super()
        

        this.showPromptLogin = false;
        this.iconBgColor = "OldLace";
        this.iconFgColor = "black";
    };

    render(){
        return (
            <IonPage>
            <Widget.HeaderAndMenus/>
                <IonContent>
                    <div style={{marginTop:"40px"}}>
                        <IonItem lines="none">
                            <IonList  style={{margin:"15px",width:"42%",backgroundColor:this.iconBgColor,color:this.iconFgColor}} onClick={()=>{document.getElementById("education").click()}}>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonButton id="education" hidden onClick={()=>{Widget.reaload()}} routerLink="/education"/>
                                    <IonIcon icon={schoolOutline} size="large"/>
                                </div>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonLabel>Education</IonLabel>
                                </div>
                            </IonList>
                            <IonList style={{margin:"15px",width:"42%",backgroundColor:this.iconBgColor,color:this.iconFgColor}} onClick={()=>{document.getElementById("products").click()}}>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonButton id="products" hidden onClick={()=>{Widget.reaload()}} routerLink="/products"/>
                                    <IonIcon icon={cartOutline} size="large"/>
                                </div>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonLabel>Products</IonLabel>
                                </div>
                            </IonList>
                        </IonItem>
                        <IonItem lines="none">
                            <IonList style={{margin:"15px",width:"42%",backgroundColor:this.iconBgColor,color:this.iconFgColor}} onClick={()=>{
                                        if (tools.retreiveCreds("email") === "none" && tools.retreiveCreds("password") === "none"){
                                            this.showPromptLogin = true;
                                            this.setState({showPromptLogin:true});
                                        }else{
                                            Widget.reaload()
                                            document.getElementById("upload").click();
                                        }
                                        }}>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonIcon icon={cloudUploadOutline}  size="large"/>
                                </div>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonLabel>Upload/Sell</IonLabel>
                                </div>
                            </IonList>
                            <IonList style={{margin:"15px",width:"42%",backgroundColor:this.iconBgColor,color:this.iconFgColor}} onClick={()=>{document.getElementById("trans").click()}}>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonButton id="trans" hidden onClick={()=>{Widget.reaload()}} routerLink="/transportation"/>
                                    <IonIcon icon={carOutline} size="large"/>
                                </div>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonLabel>Transportation</IonLabel>
                                </div>
                            </IonList>
                        </IonItem>
                        <IonItem lines="none">
                            <IonButton hidden id="login" routerLink="/login"/>
                            <IonButton hidden id="register" routerLink="/register"/>
                            <IonList style={{margin:"15px",width:"42%",backgroundColor:this.iconBgColor,color:this.iconFgColor}} onClick={()=>{document.getElementById("login").click()}}>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonIcon icon={logInOutline}  size="large"/>
                                </div>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonLabel>Login</IonLabel>
                                </div>
                            </IonList>
                            <IonList style={{margin:"15px",width:"42%",backgroundColor:this.iconBgColor,color:this.iconFgColor}} onClick={()=>{document.getElementById("register").click()}}>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonButton id="trans" hidden onClick={()=>{Widget.reaload()}} routerLink="/transportation"/>
                                    <IonIcon icon={keyOutline} size="large"/>
                                </div>
                                <div lines="none" style={{margin:"15px",textAlign:"center"}}>
                                    <IonLabel>Register</IonLabel>
                                </div>
                            </IonList>
                        </IonItem>
                    </div>
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
                    <IonToolbar color="success">
                        <div style={{textAlign:"center"}}><IonLabel>Making life great again</IonLabel></div>
                    </IonToolbar>
                </IonFooter>
            </IonPage>
        );
    }
};


export default Home;
