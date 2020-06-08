import React, { Component } from 'react'
import { IonPage, IonContent, IonItem, IonList, IonLabel, IonInput, IonButton, IonToolbar, IonTitle, IonIcon, IonCheckbox, IonSelect, IonSelectOption } from '@ionic/react';
import tools from '../components/FunctonTools'
import axios from 'axios'
import {  ellipsisVertical, arrowBack, lockClosed, calendar, mail, card  } from 'ionicons/icons';



class Payments extends Component{
    constructor(props){
        super(props)

        this.errorMsg = "none";
        this.errorMsgColor = "white";

        this.email = "";
        this.cardNumber = "";
        this.date = "";
        this.Cvc = "";
        this.rememberMe = false;

        this.totalCost = 0.0;

        this.cardType = "";
        this.cardList = [
            "Visa",
            "Master Card",
            "American Express",
            "Diner's club",
            "Carte Blanche",
            "Discover",
            "en Route",
            "Jcb",
        ]
    }

    serverHandler(){
        axios.post()
        .then(response =>{

        })
        .catch(error =>{
            
        })
    }

    componentDidMount(){
        //this will first run when page is open to calculate the total cose the the items in cart
        //then display in the the payment button
        for (var i in tools.cartItem){
            this.totalCost = this.totalCost + parseFloat(tools.cartItem[i][2].replace("$",""));
        }
    }

    checkCards = (cardType) =>{
        var cardPass = false;
        if (cardType === "Visa" && this.cardNumber.length === 16){
            cardPass = true;
        }else if (cardType === "Master Card" && this.cardNumber.length === 16){
            cardPass = true;
        }else if (cardType === "American Express" && this.cardNumber.length === 15){
            cardPass = true;
        }else if (cardType === "Diner's club" && this.cardNumber.length === 14){
            cardPass = true;
        }else if (cardType === "Carte Blanche" && this.cardNumber.length === 14){
            cardPass = true;
        }else if (cardType === "Discover" && this.cardNumber.length === 16){
            cardPass = true;
        }else if (cardType === "en Route" && this.cardNumber.length === 15){
            console.log("hello world");
        }else if (cardType === "Jcb" && this.cardNumber.length === 16){
            cardPass = true;
        }else{
            cardPass = false;
        }
        if (cardPass){
            this.errorMsgColor = "darkgreen";
            this.errorMsg = "pass card test";
            this.setState({errorMsg:this.errorMsg,errorMsgColor:this.errorMsgColor})
        }else{
            this.errorMsgColor = "red";
            if (cardType){
                this.errorMsg = cardType+" is invalid.";
            }else{
                this.errorMsg = "Please choose a card type";
            }
            this.setState({errorMsg:this.errorMsg,errorMsgColor:this.errorMsgColor})
        }
    }

    render(){

        return(
            <IonPage>
                <IonToolbar color="primary">
                    <IonItem color="primary">
                        <IonIcon onClick={()=>{window.history.back()}} icon={arrowBack}/>
                        <IonTitle>{tools.appName}</IonTitle>
                        <IonIcon onClick={()=>{}} icon={ellipsisVertical}/>
                    </IonItem>
                </IonToolbar>
                <IonContent>
                
                <IonList>
                    <IonList>
                        <IonList style={{textAlign:"center"}}>
                            <div style={{fontSize:"15px",color:this.errorMsgColor}}>
                                <IonLabel>{this.errorMsg}</IonLabel>
                            </div>
                            <div style={{fontSize:"40px"}}>
                                <IonLabel>Payment</IonLabel>
                            </div>
                        </IonList>
                    </IonList>
                    <IonItem style={{border: "1px solid #000",marginLeft:"25px",marginRight:"25px"}}>
                        <IonLabel>Card Type</IonLabel>
                        <IonSelect onIonChange={e=>{this.cardType = e.target.value;this.setState({cardType:this.cardType})}} interface="popover" placeholder="Choose Card">
                            {
                                this.cardList ?
                                this.cardList.map((cards,index)=>
                                    <IonSelectOption key={index} value={cards}>{cards}</IonSelectOption>
                                ):
                                null
                            }
                        </IonSelect>
                    </IonItem>
                    <IonItem style={{margin:"25px",border: "1px solid #000"}}>
                        <IonIcon icon={mail}/>
                        <IonInput onIonChange={e=>{this.email = e.target.value}} value={this.email} type="email"/>
                    </IonItem>
                    <IonItem style={{margin:"25px",border: "1px solid #000"}}>
                        <IonIcon icon={card}/>
                        <IonInput onIonChange={e=>{this.cardNumber = e.target.value}} value={this.cardNumber} type="number"/>
                    </IonItem>
                    <IonItem>
                        <IonItem style={{marginLeft:"10px",border: "1px solid #000"}}>
                            <IonIcon icon={calendar}/>
                            <IonInput onIonChange={e=>{this.date = e.target.value}} value={this.date} type="month" min="2020-06"/>
                        </IonItem>
                        <IonItem style={{marginRight:"10px",border: "1px solid #000"}}>
                            <IonIcon icon={lockClosed}/>
                            <IonInput onIonChange={e=>{this.Cvc = e.target.value}} value={this.Cvc} type="number"/>
                        </IonItem>
                    </IonItem>
                    <IonItem style={{margin:"25px",border: "1px solid #000"}}>
                        <IonCheckbox onIonChange={e=>{this.rememberMe = e.detail.checked;this.setState({rememberMe:this.rememberMe})}} checked={this.rememberMe}/>
                        <IonLabel>Remember me</IonLabel>
                    </IonItem>
                    <div style={{margin:"25px"}}>
                        <IonButton onClick={()=>{this.checkCards(this.cardType)}} style={{width:"100%"}}>Pay ${this.totalCost.toFixed(2)}</IonButton>
                    </div>
                </IonList>

                </IonContent>
            </IonPage>
        )
    }
}

export default Payments