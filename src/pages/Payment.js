import React, { Component } from 'react'
import { IonPage, IonContent, IonItem, IonList, IonLabel, IonInput, IonButton, IonToolbar, IonTitle, IonIcon, IonCheckbox, IonSelect, IonSelectOption, IonPopover } from '@ionic/react';
import tools from '../components/FunctonTools'
import axios from 'axios'
import {  ellipsisVertical, arrowBack, lockClosed, calendar, mail, card, home  } from 'ionicons/icons';



class Payments extends Component{
    constructor(props){
        super(props)

        this.showPopOver = false;//this will open or close popover

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

    dictionarybuilder(){
        //this function will get items in cart and convert it into a dictionary then return it
        //only item name, item price, farmers email, and quantity will be extracted
        var dictionaryHolder = []
        dictionaryHolder.push({
            serverusername:tools.serverUserName,
            serverpassword:tools.serverPassword
        });
        for (var i in tools.cartItem){
            dictionaryHolder.push({
                productName:tools.cartItem[i][1],
                price:tools.cartItem[i][2],
                sellerEmail:tools.cartItem[i][4],
                qty:tools.cartItem[i][5],
                buyerEmail:tools.retreiveCreds("email")})
        }
        return dictionaryHolder;
    }

    serverHandler(){
        axios.post(tools.url.payments,this.dictionarybuilder())
        .then(response =>{
            console.log(response.data);
        })
        .catch(error =>{
            console.log(error)
        })
    }

    componentDidMount(){
        //this will first run when page is open to calculate the total cose the the items in cart
        //then display in the the payment button
        for (var i in tools.cartItem){
            this.totalCost = this.totalCost + parseFloat(tools.cartItem[i][2].replace("$",""));
        }
    }

    checkPayments(){
        //this fucntion will check payemnts, email and more before submiting
        this.serverHandler();
        this.errorMsgColor = "darkgreen";
        this.errorMsg = "sucessful";
        this.setState({errorMsg:this.errorMsg,errorMsgColor:this.errorMsgColor})
    }

    checkCards = (cardType) =>{
        //this will check the credit card and its digits to see if its invalid
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
            this.checkPayments();
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
                        <IonIcon onClick={()=>{this.showPopOver=true;this.setState({showPopOver:true})}} icon={ellipsisVertical}/>
                    </IonItem>
                </IonToolbar>

                <IonPopover isOpen={this.showPopOver} cssClass='my-custom-class' onDidDismiss={e => {this.showPopOver = false;this.setState({showPopOver:false})}}>
                    <IonItem>
                        <IonIcon icon={home}/>
                        <IonIcon/>
                        <IonButton hidden id="home" onClick={()=>{this.showPopOver=false;this.setState({showPopOver:false})}}  routerLink="/products"/>
                        <IonLabel onClick={()=>{document.getElementById("home").click()}}>Home</IonLabel>
                    </IonItem>
                </IonPopover>

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