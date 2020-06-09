import React, { Component } from 'react';
import '../components/StyleSheet.css'
import { IonPage, IonContent, IonButton, IonItem, IonIcon, IonLabel, IonToolbar, IonPopover, IonList, IonCard } from '@ionic/react';
import Widgets from '../components/Widgets';
import { notifications, home, grid } from 'ionicons/icons';
import axios from 'axios'
import tools from '../components/FunctonTools';

var Widget = new Widgets()
class Transportation extends Component{
    constructor(){
        super()
        
        this.holdDetails = [];//this will store customer details then submit in popover each time a customer is seleced

        this.showDetails = false;//this will show popover to display customer detail information on product

        this.costValue = "$";//this will store the input value of cost input and help keep $ in box

        //this will hold the information and credentials for posting to the server
        this.deleveries = {
            serverusername:tools.serverUserName,
            serverpassword:tools.serverPassword,
            farmeremail:"mb.repairss@gmail.com",
        }

        //this is to hold the dilivery data to display to screen
        this.deliveryData = [];
    };

    componentDidMount = () =>{
        //this will call serverHandler on first call or when open to get data from server
        this.serverHandler();
    }

    serverHandler = ()=>{
        //this will get delevery data from server
        axios.post(tools.url.transportation,this.deleveries)
        .then(response =>{
            if (response.data === false){
                console.log("you dont have access");
            }else if (response.data === "none"){
                console.log("no data available")
            }else{
                this.deliveryData = response.data;
                this.setState({deliveryData:response.data});
                console.log(this.deliveryData);
            }
        })
        .catch(error =>{
            console.log(error)
        });
    }

    render(){
        return (
            <IonPage>
            <Widget.HeaderAndMenus/>

            <IonPopover isOpen={this.showDetails} cssClass='my-custom-class' onDidDismiss={e => {this.showDetails = false;this.setState({showDetails:false})}}>
                <div style={{background:"lightcyan",color:"darkblue"}}>
                    <IonCard style={{fontSize:"15px",marginLeft:"10px",color:"navy"}}>
                        <h1 style={{textDecoration:"underline",textAlign:"center"}}>Customer Delivery</h1>
                        <p style={{marginLeft:"5px"}}>First Name:<IonLabel style={{marginLeft:"5px"}}>{this.holdDetails[0]}</IonLabel></p>
                        <p style={{marginLeft:"5px"}}>Last Name:<IonLabel style={{marginLeft:"5px"}}>{this.holdDetails[1]}</IonLabel></p>
                        <p style={{marginLeft:"5px"}}>Email:<IonLabel style={{marginLeft:"5px"}}>{this.holdDetails[2]}</IonLabel></p>
                        <p style={{marginLeft:"5px"}}>Contact:<IonLabel style={{marginLeft:"5px"}}>{this.holdDetails[3]}</IonLabel></p>
                        <p style={{marginLeft:"5px"}}>Address 1:<IonLabel style={{marginLeft:"5px"}}>{this.holdDetails[4]}</IonLabel></p>
                        <p style={{marginLeft:"5px"}}>Address 2:<IonLabel style={{marginLeft:"5px"}}>{this.holdDetails[5]}</IonLabel></p>
                    </IonCard>
                    <IonList style={{background:"lightcyan"}}>
                        {
                            this.holdDetails[6]?
                            this.holdDetails[6].map((item,i)=>
                                <IonCard key={i}>
                                    <IonItem>
                                        <span style={{color:"navy"}}>Item:</span>
                                        <IonLabel style={{marginLeft:"5px",color:"navy"}}>{item[0]}</IonLabel>
                                        <IonLabel style={{color:"navy"}}>{item[3]}</IonLabel>
                                    </IonItem>    
                                    <IonItem>
                                        <span style={{color:"navy"}}>Qty:</span>
                                        <IonLabel style={{marginLeft:"5px",color:"navy"}}>{item[1]}</IonLabel>
                                        <span style={{color:"navy"}}>price:</span>
                                        <IonLabel style={{marginLeft:"5px",color:"navy"}}>{item[2]}</IonLabel>
                                    </IonItem>
                                </IonCard>
                            ):
                            null
                        }
                    </IonList>
                </div>
            </IonPopover>

                <IonItem color="secondary">
                <IonLabel style={{textAlign:"center",margin:"10px"}}>Customer Deliveries List</IonLabel>
                </IonItem>
                <IonContent style={{border:"inset"}}>
                    {
                        this.deliveryData.length ?
                        this.deliveryData.map((car,i) =>
                            <IonCard key={i} onClick={()=>{this.holdDetails = [car.names[0],car.names[1],car.email,car.names[2],car.names[3],car.names[4],car.records];this.showDetails=true;this.setState({showDetails:true})}}>
                                <IonItem>
                                    <IonLabel>{car.names[0]}</IonLabel>
                                    <IonLabel>{car.names[1]}</IonLabel>
                                    <IonLabel>{car.records[0][3]}</IonLabel>
                                </IonItem>
                            </IonCard>
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
