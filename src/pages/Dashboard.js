import React, { Component } from 'react';
import '../components/StyleSheet.css'
import { IonPage, IonContent, IonButton, IonItem, IonImg, IonThumbnail, IonLabel, IonFooter, IonToolbar } from '@ionic/react';
import AllWidgets from '../components/Widgets'


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
                        <IonButton onClick={()=>{Widget.reaload()}} routerLink="/upload" size="large" style={{width:"100%"}}>Products Uploads</IonButton>
                    </IonItem>
                    <IonItem color="secondary" style={{margin:"12px"}}>
                        <IonButton onClick={()=>{Widget.reaload()}} routerLink="/transportation" size="large" style={{width:"100%"}}>Transportation</IonButton>
                    </IonItem>
                </IonContent>
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
