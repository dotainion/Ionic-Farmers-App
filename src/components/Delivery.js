import React, { Component } from 'react';
import './StyleSheet.css';
import { IonPage, IonContent, IonButton, IonItem, IonIcon, IonLabel, IonToolbar, IonImg, IonThumbnail } from '@ionic/react';
import Widgets from '../pages/Widgets';
import { notifications, home, grid } from 'ionicons/icons';
import axios from 'axios'
import tools from './FunctonTools';

var Widget = new Widgets()
class Transportation extends Component{
    constructor(){
        super()
        this.costValue = "$";//this will store the input value of cost input and help keep $ in box

        //this will hold the information and credentials for posting to the server
        this.deleveries = {
            serverusername:tools.serverUserName,
            serverpassword:tools.serverPassword,
            farmeremail:"mb.repairss@gmail.com",
        }

        //this is to hold the dilivery data to display to screen
        this.state = {
            DELEVERIES:[],
        }
    };

    componentDidMount = () =>{
        //this will call serverHandler on first call or when open to get data from server
        this.serverHandler();
    }

    serverHandler = ()=>{
        //this will get delevery data from server
        axios.post(tools.url.transportation,this.deleveries)
        .then(response =>{
            console.log(response);
            if (response.data === false){
                console.log("you dont have access");
            }else if (response.data === "none"){
                console.log("no data available")
            }else{
                this.setState({DELEVERIES:response.data})
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }

    render(){
        const { DELEVERIES } = this.state;
        return (
            <IonPage>
            <Widget.HeaderAndMenus/>
                <IonItem color="secondary">
                <IonLabel style={{textAlign:"center",margin:"10px"}}>Deliveries Available</IonLabel>
                </IonItem>
                <IonContent style={{border:"inset"}}>
                    {
                        DELEVERIES.length ?
                        DELEVERIES.map((delevery,i)=>
                            <IonItem key={i}>
                                <IonThumbnail>
                                    <IonImg src={tools.base64+delevery.img}/>
                                </IonThumbnail>
                                <IonLabel>{delevery[1]}</IonLabel>
                                <IonLabel>{delevery[2]}</IonLabel>
                            </IonItem>
                        ):
                        <IonItem>
                            <IonLabel>No Deliveries Pending</IonLabel>
                        </IonItem>
                    }
                </IonContent>
                <IonItem color="secondary">
                    <IonButton shape="round" style={{margin:"5px",width:"100%"}}>Contact Customer</IonButton>
                    <IonButton shape="round" style={{margin:"5px",width:"100%"}}>Google Map</IonButton>
                </IonItem>
                <IonToolbar color="success">
                    <IonButton hidden id="product" routerLink="/products"/>
                    <IonButton hidden id="dashboard" routerLink="/dashboard"/>
                    <IonIcon onClick={()=>{document.getElementById("product").click()}} slot="start" icon={home} style={{width:"100%"}}/>
                    <IonIcon onClick={()=>{document.getElementById("dashboard").click()}} slot="end" icon={grid} style={{width:"100%"}}/>
                    <IonIcon onClick={()=>{}} slot="end" color="medium" icon={notifications} style={{width:"100%"}}/>
                </IonToolbar>
            </IonPage>
        );
    }
};


export default Transportation;
