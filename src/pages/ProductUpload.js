import React, { Component } from 'react';
import '../components/StyleSheet.css'
import { IonPage, IonContent, IonButton, IonItem, IonImg, IonThumbnail, IonList, IonLabel, IonInput, IonSelect, IonSelectOption, IonToast, IonAlert } from '@ionic/react';
import Widgets from '../components/Widgets'
import tools from '../components/FunctonTools'
import axios from 'axios'


//var Widget = new Widgets()
class Transportation extends Component{
    constructor(){
        super()

        this.showPromptLogin = false;//this will display prompt to alert user to log in or register

        this.productsList = [];//this will hold a list of products when user select on a product category
        this.productsCategory = tools.productCategory;//store produce category from tools into this.productsCategory
        this.catValue = ""//this will store the selected value from the category list when user select
        this.productCat = "";//this will store the value of the products when user select
        this.other = "";//this will store the value the user type in as other product category if product category not in list
        this.address = "";//this will store the address value
        this.costValue = "$";//this will store the input value of cost input and help keep $ in box
        this.descritpion = "";//this vill store the description value when user types it
        this.productValue = "";//this will store teh value of the product when user select

        this.toaststate = false;//this this is try then toast will show
        this.toastMsg = "";//this will hold the text message that will appear on toast

        this.photo = "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/powerhouse_vegetables_slideshow/650x350_powerhouse_vegetables_slideshow.jpg"


        this.productUpload = {
            serverusername:tools.serverUserName,
            serverpassword:tools.serverPassword,
            email:"",
            image:"none",
            other:"",
            catValue:"",
            productValue:"",
            address:"",
            costValue:"",
            descritpion:""
        }
    };

    componentDidMount(){
        //this will run first when the page is open
        //if user is not login then will be promted to login or register
        if (tools.retreiveCreds("email") === "none" && tools.retreiveCreds("password") === "none"){
            //if user email and password is none then this will be executed
            //to prompt user to login or register first
            this.showPromptLogin = true;
            this.setState({showPromptLogin:true});
            console.log("testing this ")
            console.log(this.showPromptLogin)
        }
    }

    postToServer = () =>{
        //tis will send information to server
        axios.post(tools.url.productupload,this.productUpload)
        .then(response =>{
            if (response.data === true){
                this.other = "";
                this.catValue = "";
                this.productValue = "";
                this.address = "";
                this.costValue = "";
                this.descritpion = "";
                this.setState({other:"",catValue:"",productValue:"",address:"",costValue:"",descritpion:""})
                this.toaststate = true;
                this.toastMsg = "Seccessful please free to submit another";
            }else if (response.data === false){
                this.toaststate = true;
                this.toastMsg = "There was an error";
            }else{
                this.toaststate = true;
                this.toastMsg = "something when wrong";
            }
            this.setState({toastMsg:this.toastMsg,toaststate:this.toaststate})
        })
        .catch(error =>{
            console.log("there is an error");
        })
    }

    submitHandler = () =>{
        //this function will check the input value and raise an error if needed
        if (this.catValue === ""){
            this.toaststate = true;
            this.toastMsg = "Please choose a category";
        }else if (this.productValue === "" && this.other === ""){
            this.toaststate = true;
            this.toastMsg = "Please select a product value or type your produce in other feild";
        }else if (this.address === ""){
            this.toaststate = true;
            this.toastMsg = "Please provide a address";
        }else if (this.costValue === "$"){
            this.toaststate = true;
            this.toastMsg = "Please provide a cost value";
        }else if (this.descritpion === ""){
            this.toaststate = true;
            this.toastMsg = "Please provide a small description";
        }else{
            this.productUpload.email = tools.retreiveCreds("email")
            this.productUpload.other = this.other;
            this.productUpload.catValue = this.catValue;
            this.productUpload.productValue = this.productValue;
            this.productUpload.address = this.address;
            this.productUpload.costValue = this.costValue;
            this.productUpload.descritpion = this.descritpion;
            this.postToServer();
        }
        this.setState({toastMsg:this.toastMsg,toaststate:this.toaststate})
    }

    setPhotoAfter = (getImage) =>{
        //this function will receive the image and set it to its variable with setState function
        //so that it will be display in the image tag
        this.photo = tools.base64 + getImage;
        this.productUpload.image = getImage;
        this.setState({photo:this.photo,image:getImage});
    }

    getNameByCategory(cat){
        //htis function will accept as value the category the user selected
        //it will be reference to tools.productsList disctionary from FunctionTools.js
        //then it will update this.productsList with its value and will display as drop down
        //as a list of items to choose from 
        //reference value will come fome when user choose a category
        var valueFromCategory = tools.productsList[cat.target.value];
        this.productsList = valueFromCategory;
        this.setState({productsList:valueFromCategory})
    }

    render(){
        var Widget = new Widgets()
        return (
            <IonPage>
            <Widget.HeaderAndMenus/>
                <IonContent>
                    <IonList>
                        <IonItem>
                            <IonLabel style={{textAlign:"center"}}>Hello Farmer</IonLabel>
                        </IonItem>  
                    </IonList>

                    <IonItem>
                        <IonButton onClick={()=>{tools.takePicture(this.setPhotoAfter)}} style={{width:"100%"}}>Take a Photo</IonButton>
                        <IonButton onClick={()=>{tools.getGallery()}} style={{width:"100%"}}>Upload a Photo</IonButton>
                    </IonItem>

                    <IonList>
                        <IonThumbnail style={{height:"100px",width:"200px",marginLeft:"23%"}}>
                            <IonImg src={this.photo}/>
                        </IonThumbnail>
                    </IonList>

                    <IonItem>
                        <IonLabel>Produt Category</IonLabel>
                        <IonSelect interfaceOptions={()=>{}} interface="popover" placeholder="Select Category"
                        onIonChange={e => {this.catValue = e.target.value;this.getNameByCategory(e)}} value={this.catValue}>
                        {
                            this.productsCategory ?
                            this.productsCategory.map((category,i)=>
                                <IonSelectOption key={i}>{category}</IonSelectOption>
                            ):
                            null
                        }
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Product Name</IonLabel>
                        <IonSelect interfaceOptions={"customPopoverOptions"} interface="popover" placeholder="Select product"
                        onIonChange={e =>{this.productValue = e.target.value}} value={this.productValue}>
                        {
                            this.productsList ?
                            this.productsList.map((products,i)=>
                                <IonSelectOption key={i}>{products}</IonSelectOption>
                            ):
                            null
                        }
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">My product not in list</IonLabel>
                        <IonInput onIonChange={e=>{this.other = e.target.value}} placeholder="Other" value={this.other}></IonInput>
                    </IonItem> 
                    <IonItem>
                        <IonLabel position="floating">Pick up Address</IonLabel>
                        <IonInput onIonChange={e=>{this.address = e.target.value}} placeholder="Address" value={this.address}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonItem>
                            <IonLabel position="floating">Cost</IonLabel>
                            <IonInput onIonChange={e=>{this.costValue = e.target.value}} type="number" placeholder="$0.00" value={this.costValue} onChange={()=>{if(this.costValue.length < 1){this.costValue="$";this.setState({costValue:"$"})}}}></IonInput>
                        </IonItem> 
                        <IonItem>
                            <IonLabel position="floating">Description</IonLabel>
                            <IonInput onIonChange={e=>{this.descritpion = e.target.value}} placeholder="Brief description" value={this.descritpion}></IonInput>
                        </IonItem>
                    </IonItem>    

                    <div style={{textAlign:"center",marginTop:"20px"}}><IonButton onClick={this.submitHandler} shape="round" style={{width:"90%"}}>Submit</IonButton></div>

                </IonContent>

                <IonToast isOpen={this.toaststate} position="top" onDidDismiss={()=>{this.toaststate=false;this.setState({toaststate:false})}}
                    message={this.toastMsg} duration={2000}/>

                <IonButton hidden id="login" routerLink="/login"/>
                <IonButton hidden id="register" routerLink="/register"/>
                <IonAlert backdropDismiss={false} isOpen={this.showPromptLogin} onDidDismiss={() =>{this.showPromptLogin = false;this.setState({showPromptLogin:false})}} cssClass='my-custom-class'
                  header={'Alert!'} message={'<b>You must first login or register for an account</b>'} buttons={[ {
                  text: 'Login',
                  cssClass: 'secondary',
                  handler: () => {
                    //this will click the button that will open up login page
                    tools.returnToPage = true;
                    tools.previousPage("upload");
                    document.getElementById("login").click();
                  }}, {
                  text: 'Register',
                  handler: () => {
                    //this will click the button that will open up register page
                    tools.returnToPage = true;
                    tools.previousPage("upload");
                    document.getElementById("register").click();
                  }}]}/>

            </IonPage>
        );
    }
};


export default Transportation;
