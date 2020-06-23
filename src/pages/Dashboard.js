import React, { Component } from 'react';
import '../components/StyleSheet.css'
import { IonPage, IonContent, IonLabel, IonFooter, IonToolbar } from '@ionic/react';
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
                   <IonLabel style={{marginLeft:"38%"}}>Dashboard</IonLabel>
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
