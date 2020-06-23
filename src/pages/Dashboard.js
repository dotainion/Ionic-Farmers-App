import React, { Component } from 'react';
import '../components/StyleSheet.css'
import { IonPage, IonContent, IonLabel, IonFooter, IonToolbar, IonButton } from '@ionic/react';
import AllWidgets from '../components/Widgets'


var Widget = new AllWidgets();
class Dashboard extends Component{
    constructor(){
        super()
        

        this.showPromptLogin = false;
    };

    render(){
        return (
            <IonPage>
            <Widget.HeaderAndMenus/>
                <IonContent>
                    <div style={{textAlign:"center",marginTop:"50%"}}>
                        <IonButton hidden id="home" routerLink="/home"/>
                        <div>
                            <IonLabel>Dashboard</IonLabel>
                        </div>
                        <div>
                            <IonLabel>comming soon</IonLabel>
                        </div>
                        <div onClick={()=>{
                            document.getElementById("home").click();
                        }} style={{marginTop:"10px",color:"blue",textDecoration:"underline"}}>
                            <IonLabel>Take me home</IonLabel>
                        </div>
                    </div>
                    
                </IonContent>
                <IonFooter>
                    <IonToolbar color="primary">

                    </IonToolbar>
                </IonFooter>
            </IonPage>
        );
    }
};


export default Dashboard;
