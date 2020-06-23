import React, { Component } from 'react';
import '../components/StyleSheet.css'
import { IonPage, IonContent, IonButton, IonItem, IonImg, IonThumbnail, IonLabel, IonFooter, IonToolbar, IonAlert, IonIcon, IonList } from '@ionic/react';
import AllWidgets from '../components/Widgets'
import tools from '../components/FunctonTools'
import { schoolOutline, cloudUpload, carOutline, cartOutline } from 'ionicons/icons';


var Widget = new AllWidgets();
class Home extends Component{
    constructor(){
        super()
        

        this.showPromptLogin = false;
    };

    render(){
        return (
            <IonPage>
            <Widget.HeaderAndMenus/>
                <IonContent color="secondary">
                    <IonThumbnail style={{width:"100%",height:"200px"}}>
                        <IonImg src="https://image.shutterstock.com/image-vector/dashboard-theme-creative-infographic-city-260nw-752239603.jpg"/>
                    </IonThumbnail>
                    <IonItem lines="none" color="secondary">
                        <IonList style={{width:"42%",margin:"15px"}} onClick={()=>{document.getElementById("education").click()}}>
                            <IonItem lines="none">
                                <IonButton id="education" hidden onClick={()=>{Widget.reaload()}} routerLink="/education"/>
                                <IonIcon icon={schoolOutline} size="large"/>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Education</IonLabel>
                            </IonItem>
                        </IonList>
                        <IonList style={{width:"42%",margin:"15px"}} onClick={()=>{document.getElementById("products").click()}}>
                            <IonItem lines="none">
                                <IonButton id="products" hidden onClick={()=>{Widget.reaload()}} routerLink="/products"/>
                                <IonIcon icon={cartOutline} size="large"/>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Products</IonLabel>
                            </IonItem>
                        </IonList>
                    </IonItem>
                    <IonItem lines="none" color="secondary">
                        <IonList style={{width:"42%",margin:"15px"}}onClick={()=>{
                                    if (tools.retreiveCreds("email") === "none" && tools.retreiveCreds("password") === "none"){
                                        this.showPromptLogin = true;
                                        this.setState({showPromptLogin:true});
                                    }else{
                                        Widget.reaload()
                                        document.getElementById("upload").click();
                                    }
                                    }}>
                            <IonItem lines="none">
                                <IonIcon icon={cloudUpload}  size="large"/>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Upload/Sell</IonLabel>
                            </IonItem>
                        </IonList>
                        <IonList style={{width:"42%",margin:"15px"}} onClick={()=>{document.getElementById("trans").click()}}>
                            <IonItem lines="none">
                                <IonButton id="trans" hidden onClick={()=>{Widget.reaload()}} routerLink="/transportation"/>
                                <IonIcon icon={carOutline} size="large"/>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Transportation</IonLabel>
                            </IonItem>
                        </IonList>
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


export default Home;
