import React, { Component } from 'react'
import { IonPage, IonContent, IonItem, IonList, IonLabel, IonItemDivider, IonInput, IonButton, IonToolbar, IonTitle, IonToast, IonIcon } from '@ionic/react';
import tools from '../components/FunctonTools'
import axios from 'axios'
import {  ellipsisVertical  } from 'ionicons/icons';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

class Payments extends Component{
    constructor(props){
        super(props)

       this.x = ""
    }


    render(){

        return(
            <IonPage>
                <IonToolbar color="primary">
                    <IonItem color="primary">
                        <IonTitle>{tools.appName}</IonTitle>
                        <IonIcon onClick={()=>{}} icon={ellipsisVertical}/>
                    </IonItem>
                </IonToolbar>
                <IonContent>
                <Elements stripe={stripePromise}>
                    <IonInput></IonInput>
                </Elements>
                </IonContent>
            </IonPage>
        )
    }
}

export default Payments