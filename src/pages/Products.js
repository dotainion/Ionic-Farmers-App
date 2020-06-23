import React, { Component } from 'react';
import '../components/StyleSheet.css'
import { IonPage, IonContent, IonItem, IonList, IonImg, IonThumbnail, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonIcon, IonInput, IonSelect, IonSelectOption, IonInfiniteScroll, IonInfiniteScrollContent, IonButton, IonSpinner, IonToast, IonToolbar, IonFooter, IonLabel, IonModal, IonTitle, IonAlert, IonPopover } from '@ionic/react';
import AllWidgets from '../components/Widgets';
import Tools from '../components/FunctonTools'
import axios from 'axios';
import { search, close, home, grid, ellipsisVertical, arrowBackCircle, arrowBack, eye, cart } from 'ionicons/icons';

var Widgets = new AllWidgets()

class Products extends Component{
  constructor(){
    super()

    this.showPromptLogin = false;//this will display prompt to alert user to log in or register
    this.popUpQtyDisplay = "none";//this will display the quantity amount in pop up if its a empty string, it will only display when a item is selected
    this.temQtyData = "";//this will store the item and other data temparary when user select on a item then choose quantity
    this.qty = 1;//this will store the quantity of a product then will reset back to 1
    this.showQtyPopOver = false;//this will open quantity popover to inssert quantity amount
    this.popOverImg = null;//this will hold the image instide the pop over information
    this.showPopOver = false;//this will display pop up with information if its true and close if its false
    this.popOverMsg = "";//this will display the message on popover pop up information
    this.popOverMsg2 = "";//this will display the message on popover pop up information
    this.popOverMsg3 = "";//this will display the message on popover pop up information
    this.cartDeleteItem = "";//this variable is use to store the cart item temparary for deleting aftewr confirmation popup is yes or no
    this.showAlertIonModel = false;//this is to open alert in ionModel as confirmation popup
    this.showModel = false;//this variable will open model tag if its true or remove if its false
    this.infinitRef = React.createRef()
    this.noMoreitems = "none";//this variable will make labele visible and place text on the screen for no more items available
    this.moreBtnDisplay = "none";//this is a variable to place button on teh screen to call for more items from the server
    this.moreIconWidth = "";//will place spinner icon width to a empty string to remove it from the screen or 100% to place it on the screen
    this.moreIconShow = "none";//this is for the bottom loading spinner
    this.topSpinnerShow = "";//this is for the top loading spinner
    this.dataVar = 100;//this will set the amount of data to receive from teh server at a time
    this.getmoreData = 0;//this will be added with this.dataVar every time data is call to pull more data from server
    this.startGetMoreData = true;
    this.networkError = "none"//tis will show network error label to the screen
    this.categoryFruits = Tools.cagegory//this will display search category 
    this.categoryValue = "";//this will store the category value the user select
    this.searchValue = "";//this will stare the search value when type in by the user
    this.toastMsg = "";//this will hold pop up string messages for error or information
    this.showToast = false;//this will show the pop up messages for error or information
    this.myRef = React.createRef()
    this.base64Code = Tools.base64;//this will be added to image file with will be a base format so it will be display at image on screen
    this.cartItem = Tools.cartItem;//this will store the items in the cart when user select 
    this.referencs = [];
    this.noAccess = "none";//this will display message if server password is incorrect
    this.state = {//this will hold all date received by the server
    posts: []
    };

    this.serverCreds = {//this will hold the server credentials to access the server
    serverusername:Tools.serverUserName,
    serverpassword:Tools.serverPassword
    }
  }

  componentDidMount(){
    //this function will be call the first time the app is open and pull data from the server
    //if there is a responce then this.moreiconWidth will be place to 100% 
    //this.moreIconShow will be none, this.topSpinnerjShow will be none and this.moreBtnDisplay will be 
    //a empty string to remove spinner icon and place button on the screen
    //
    //if the responce value lenght is less then or equal to 10 then moreBtnDisplay will be equal to a string of none
    //this will remove the button from the screen to show that there is no more data
    //if its more than then this.noMoreitems label will be equal to string none to remove text from screen 
    //this.networkError will be eual to string none so remove error label from screen but if there is a error
    //it will be catch and this.networkError will be equal to an empty string to place error label on screen
    axios.post(Tools.url.products,this.serverCreds)//,{responseType: 'arraybuffer'})
    .then(response => {
      //if response not equal to false then run code
      //if response is equal to false then it meanse server username and password is incorrect
      //and you dont have access
      if (response.data !== false){
        //const res = new Buffer(response.data, 'binary');
        //console.log(res);
        this.networkError = "none"
        this.getmoreData = this.dataVar
        this.moreBtnDisplay = "";
        this.moreIconWidth = "100%";
        this.moreIconShow = "none";
        this.topSpinnerShow = "none";
        this.setState({posts:response.data,moreBtnDisplay:"",moreIconWidth:"100%",moreIconShow:"none",topSpinnerShow:"none",networkError:"none"});
        if (response.data.length <= 10){
          this.moreBtnDisplay = "none";
          this.noMoreitems = "";
          this.setState({moreBtnDisplay:"none",noMoreitems:""});
        }else{
          this.noMoreitems = "none";
        }
      }else{
        this.topSpinnerShow = "none";
        this.noAccess = "";//this will display message if server password is incorrect
        this.setState({topSpinnerShow:"none",noAccess:""});
        console.log("you do not have access to the server, please conntact administrater");
      }
  })
    .catch(error =>{
      //console.log(error)
      this.networkError = "";
      this.topSpinnerShow = "none"
      console.log("error with network")
      this.setState({networkError:"",topSpinnerShow:"none"})
  })
}

  itemChoiceHandler = (e,post,index) => {
    //this function will be call when user select on a item
    //e will represent the element target the was press
    //post will be the data in the element that was press like title image and detail
    //indext is the index value of the element that was selected and will be use to remove item from the cart when user deselect a item
    if (post.title !== "No Records"){
      //if the image icon this display is to indicate no records then this will not run
      //Note... if there is no records in database or there is no data fro a particular search then a no item image will be sent
      //and if that send then was click then this state will not be executed
      if (e.color !== "danger"){
        //if the target widget that was press color is equal to red "danger" when its value will be store in this.cartItem
        Tools.cartItem.push([post.img,post.title,post.price,post.detail,post.email,this.qty,e])
        e.color = "danger"
        this.showToast = true;
        var toastAddMsg = post.title+" at "+post.price+" is being added to your cart"
        this.toastMsg = toastAddMsg
        this.setState({showToast:true,toastMsg:toastAddMsg})
      }else{
        //if the target item that was press is not red "danger" when color will be set to white and will be remove 
        //from this.cartItem with its indext value 
        e.color = "white"
        Tools.cartItem.pop(index)
        this.showToast = true;
        var toastRemoveMsg = post.title+" at "+post.price+" has been removed from your cart"
        this.toastMsg = toastRemoveMsg
        this.setState({showToast:true,toastMsg:toastRemoveMsg})
      }
      this.cartItem = Tools.cartItem;
      this.qty = 1;
    }
  }

  searchHandler(){
    //this function will be call each time the user click the search button
    //it will send to the server the state as true to indicate its being search, search will be set the value user typed in the search box
    //category will be set to the selected category the user selected, more date will be set to this.getmoreDate which
    //will be to get the amount of data from server - tis will iterate each time the function is called 
    var searchState = {state: "true",search:this.searchValue,cagegory:this.categoryValue,moreData:this.getmoreData,
    serverusername:this.serverCreds.serverusername,serverpassword:this.serverCreds.serverpassword,};
    axios.post(Tools.url.products,searchState)
    .then(response => {
      this.moreBtnDisplay = "";
      this.moreIconWidth = "100%";
      this.moreIconShow = "none";
      this.topSpinnerShow = "none";
      if (this.getmoreData === 0){
        //if this.getmoreData is equal to  then it will only get the first set of item as reference of this.dataVar
        //which will be added to this.getmoreData each time
        //the more BtnDisplay will be set to a empty string to remove it from the screen
        //moreIconWidth will be set to % to place it on the screen as loading icon
        //moreIconShow will be set to string none to remove its text from screen and
        //topSpinnterShow will be set to non to remove it from the screen
        this.setState({posts:response.data,moreBtnDisplay:"",moreIconWidth:"100%",moreIconShow:"none",topSpinnerShow:"none"});
      }else{
        this.startGetMoreData = true;
        console.log(this.state.posts.length)
        for (var i=0;i<response.data.length;i++){
          this.state.posts.push(response.data[i])
        }
        this.setState({posts:this.state.posts,moreBtnDisplay:"",moreIconWidth:"100%",moreIconShow:"none",topSpinnerShow:"none"});
      }
      if (response.data.length <= this.dataVar-1){
        //if response lenght is less then or equal to this.dataVar minus 
        //then this indicate that there will not be more data for that user search 
        if (response.data.length === 1){
          this.noMoreitems = "none"
        }else{
          this.noMoreitems = ""
        }
        this.moreBtnDisplay = "none";
        this.setState({moreBtnDisplay:"none",noMoreitems:this.noMoreitems});
      }else{
        this.noMoreitems = "none";
        this.setState({noMoreitems:"none"});
      }
    })
    .catch(error =>{
      //console.log(error)
      this.networkError = "";
      this.topSpinnerShow = "none"
      this.moreBtnDisplay = 'none'
      console.log("error with network")
      this.setState({networkError:"",topSpinnerShow:"none",moreBtnDisplay:'none'})
    })
  }

  moreData(){
    //this function will add this.dataVar to this.getmoreData each time its call
    //then call searchHandler function to call server
    //Note... this.getmoreData will only be set to  when the button in search input is press
    if (this.startGetMoreData === true){
      this.startGetMoreData = false;
      this.getmoreData += this.dataVar;
      this.searchHandler()
      
    }else{
      //this.moreIconShow = "none";
      //this.setState({moreIconShow:"none"})
    }
  }

  itemCartHandler(element,i){
    //this will remove item from the card
    this.cartItem.splice(i,1);//remove the seleced item from the cart
    element.color = "white";//removed selected color from that item in the product listing page
    this.setState({cartItem:this.cartItem});
  }

  render(){
    const { posts } = this.state;

    return (
      <IonPage>
        <Widgets.HeaderAndMenus/>

        <IonToast color="light" isOpen={this.showToast} onDidDismiss={() => {this.showToast=false;this.setState({showToast:false})}} message={this.toastMsg} duration={1000} position="top"/>

        <IonPopover isOpen={this.showPopOver} cssClass='my-custom-class' onDidDismiss={e => {this.showPopOver = false;this.setState({showPopOver:false})}}>
          <IonThumbnail style={{width:"250px",height:"220px"}}>
            <IonImg src={this.popOverImg}/>
          </IonThumbnail>
          <div style={{height:"200px"}}>
            <div style={{textAlign:"center",marginTop:"-150px",overflow:"auto",color:"red"}}>
              <h1>{this.popOverMsg}</h1>
              <h1>{this.popOverMsg2}</h1>
              <h1 style={{display:this.popUpQtyDisplay}}>{"Qty: "+this.popOverMsg4}</h1>
              <p><b>{this.popOverMsg3}</b></p>
            </div>
          </div>
        </IonPopover>

        <IonPopover isOpen={this.showQtyPopOver} cssClass='my-custom-class' onDidDismiss={e => {this.showQtyPopOver = false;this.setState({showQtyPopOver:false})}}>
          <IonItem>
            <IonLabel style={{float:"left",width:"100px",fontSize:"15px",marginLeft:"30px"}}>Item quantity</IonLabel>
            <IonInput style={{float:"right",border:"1px solid #000",height:"20px",marginRight:"30px",borderRadius:"25px"}} type="number" value={this.qty} onIonChange={e=>{this.qty = e.target.value;console.log(this.cartItem)}}/>
          </IonItem>
          <IonItem>
            <IonButton style={{marginLeft:"45px",width:"65px"}} onClick={()=>{this.showQtyPopOver=false;this.setState({showQtyPopOver:false})}}>Cancel</IonButton>
            <IonButton style={{width:"65px"}} onClick={()=>{this.itemChoiceHandler(document.getElementById(this.temQtyData[0]),this.temQtyData[1],this.temQtyData[2]);this.showQtyPopOver=false;this.setState({showQtyPopOver:false})}}>Okay</IonButton>
          </IonItem>
        </IonPopover>

        <IonCard>
          <IonItem>
            <IonInput onIonChange={e => {this.searchValue = e.detail.value}} placeholder="Search" value={this.searchValue} />
            <IonIcon onClick={()=>{this.searchValue = "";this.setState({searchValue:""})}} icon={close} />
            <IonSelect placeholder="Category" value={this.categoryValue} onIonChange={e =>{this.categoryValue = e.detail.value;this.setState({categoryValue:e.detail.value});if(e.detail.value === "Clear Category"){this.categoryValue = "";this.setState({categoryValue:""})}}}>
              <IonSelectOption>Fruits</IonSelectOption>
              <IonSelectOption>provision</IonSelectOption>
              <IonSelectOption>Vegetables</IonSelectOption>
              <IonSelectOption>Grains</IonSelectOption>
              <IonSelectOption>Farm Tools</IonSelectOption>
              <IonSelectOption>Animals</IonSelectOption>
              <IonSelectOption>Pets</IonSelectOption>
              <IonSelectOption>All Category</IonSelectOption>
              <IonSelectOption>Clear Category</IonSelectOption>
            </IonSelect>
            <IonIcon color="primary" onClick={()=> {if (this.moreIconShow === "none"){this.topSpinnerShow="";this.setState({topSpinnerShow:""})};this.getmoreData=0;this.setState({getmoreData:0});this.searchHandler()}} icon={search}/>
          </IonItem>
        </IonCard>

        <IonContent>

        <IonInfiniteScroll onIonInfinite={e => {}} threshold="100px" id="infinite-scroll">
          <IonInfiniteScrollContent loadingSpinner={null} loadingText="">
            <IonGrid>
              <IonSpinner style={{display:this.topSpinnerShow}} name="lines"/>
              <IonRow>
              { 
                posts.length ?
                posts.map((post,i) => 
                  <IonCol key={post.id} style={{textAlign:"left"}}>
                    <IonCard style={{margin:"0px",width:"105px"}} id={post.id}>
                    <IonIcon style={{marginLeft:"80px",marginTop:"10px"}} onClick={e=>{this.popUpQtyDisplay="none";this.setState({popUpQtyDisplay:"none"});for(var i=0;i<this.cartItem.length;i++){if(this.cartItem[i][0]===post.img){this.popOverMsg4 = this.cartItem[i][5];this.popUpQtyDisplay="";
                              this.setState({popUpQtyDisplay:"",popOverMsg4:this.popOverMsg4})}};this.popOverMsg=post.title;this.popOverMsg2=post.price;this.popOverMsg3=post.detail;this.showPopOver=true;this.popOverImg=this.base64Code+post.img;
                              this.setState({popOverMsg:this.popOverMsg,popOverMsg2:this.popOverMsg2,popOverMsg3:this.popOverMsg3,showPopOver:true,popOverImg:this.popOverImg})}} icon={ellipsisVertical}/>
                      <div onClick={() => {this.temQtyData = [post.id,post,i];this.showQtyPopOver=true;this.setState({showQtyPopOver:true})}}>
                        <IonList>
                          <IonThumbnail style={{width:"100px",height:"80px"}} slot="start">
                              <IonImg src={this.base64Code+post.img} />
                          </IonThumbnail>
                        </IonList>
                        <IonCardContent><p style={{whiteSpace:"nowrap",textAlign:"center"}}>{post.title}</p><p style={{whiteSpace:"nowrap",textAlign:"center"}}>{post.price}</p></IonCardContent>
                      </div>
                    </IonCard>
                  </IonCol>
                ): null
              }
              </IonRow>

              <IonCol>
                <IonList>
                  <IonSpinner style={{display:this.moreIconShow,width:this.moreIconWidth,marginleft:"100%",marginright:"100%"}} name="lines" />
                  <IonButton ref={this.infinitRef} color="secondary" size="small" onClick={()=>{this.moreIconShow="";this.setState({moreBtnDisplay:""});this.moreData()}} style={{marginleft:"100%",display:this.moreBtnDisplay}}>More</IonButton>
                  <IonLabel style={{display:this.noMoreitems}}>No more request for this search</IonLabel>
                  <div>
                    <IonLabel style={{display:this.networkError}}>Network is down</IonLabel>
                  </div>
                  <div style={{marginTop:"20px",textDecoration:"underline",color:"blue"}}>
                    <IonLabel onClick={()=>{if (this.moreIconShow === "none"){this.topSpinnerShow="";this.setState({topSpinnerShow:""})};this.componentDidMount()}} style={{display:this.networkError}}>Retry</IonLabel>
                  </div>
                  <IonLabel style={{display:this.noAccess,fontSize:"15px"}}>Contact app administrater or check your internet connection</IonLabel>
                  <IonItem lines="none">
                    <IonLabel onClick={()=>{this.noAccess = "none";this.topSpinnerShow = "";this.setState({topSpinnerShow:"",noAccess:"none"});this.componentDidMount()}} style={{color:"blue",display:this.noAccess,textAlign:"center"}}>Retry</IonLabel>
                  </IonItem>
                </IonList>
              </IonCol>    
            </IonGrid>
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
        </IonContent>


        <IonModal isOpen={this.showModel}>
          <IonPage>
                <IonToolbar color="success">
                  <IonItem color="success">
                    <IonIcon icon={arrowBack} onClick={()=>{this.showModel=false;this.setState({showModel:false})}}/>
                    <IonTitle>{Tools.appName} Notification</IonTitle>
                    <IonIcon style={{margin:"10px"}} slot="end" icon={ellipsisVertical} />
                  </IonItem>
                </IonToolbar>

                <IonAlert isOpen={this.showAlertIonModel} onDidDismiss={() =>{this.showAlertIonModel = false;this.setState({showAlertIonModel:false})}} cssClass='my-custom-class'
                  header={'Confirm!'} message={'<b>Are you sure you want to delete this item?</b>'} buttons={[ {
                  text: 'No',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    this.cartDeleteItem = "";
                  }}, {
                  text: 'Yes',
                  handler: () => {
                    this.itemCartHandler(this.cartDeleteItem[0],this.cartDeleteItem[1])
                  }}]}/>

                <IonButton hidden id="login" routerLink="/login"/>
                <IonButton hidden id="register" routerLink="/register"/>
                <IonAlert isOpen={this.showPromptLogin} onDidDismiss={() =>{this.showPromptLogin = false;this.setState({showPromptLogin:false})}} cssClass='my-custom-class'
                  header={'Alert!'} message={'<b>You must first login or register for an account</b>'} buttons={[ {
                  text: 'Login',
                  cssClass: 'secondary',
                  handler: () => {
                    //this will click the button that will open up login page
                    Tools.previousPage("payment");
                    document.getElementById("login").click();
                  }}, {
                  text: 'Register',
                  handler: () => {
                    //this will click the button that will open up register page
                    Tools.previousPage("payment");
                    document.getElementById("register").click();
                  }}]}/>

                <IonItem color="warning">
                <IonLabel color="primary" style={{margin:"10px"}}>ITEMS IN CART</IonLabel>
                <IonButton hidden routerLink="/payment" id="payment"/>
                <IonButton onClick={()=>{
                  if (this.cartItem.length){
                    if (Tools.retreiveCreds("email") !== "none" && Tools.retreiveCreds("password") !== "none"){
                      //if user email and password is available means they have an accout
                      //and will be directed to the payment screen
                      document.getElementById("payment").click()
                    }else{
                      //if user email and password not available then 
                      // they will be prompt to login or register
                      this.showPromptLogin = true;
                      this.setState({showPromptLogin:true})
                    }
                  }else{
                    this.showToast=true;
                    this.toastMsg="you have no item in cart";
                    this.setState({showToast:true,toastMsg:this.toastMsg})
                    }}} style={{margin:"10px"}}>Cash Out</IonButton>
                </IonItem>
                  <IonContent style={{border:"inset"}}>
                    {
                      this.cartItem.length ?
                      this.cartItem.map((items,i)=>
                        <IonCard key={i}>
                          <IonItem>
                            <IonItem onClick={()=> {this.cartDeleteItem = [items[6],i];this.showAlertIonModel=true;this.setState({showAlertIonModel:true})}}>
                              <IonThumbnail>
                                <IonImg src={this.base64Code+items[0]}/>
                              </IonThumbnail>
                              <IonLabel>{items[1]}</IonLabel>
                              <IonLabel>{items[2]}</IonLabel>
                              <IonLabel>{items[3]}</IonLabel>
                            </IonItem>
                            <IonIcon style={{width:"15px"}} onClick={()=>{this.popOverMsg=items[1];this.popOverMsg2=items[2];this.popOverMsg3=items[3];this.popOverMsg4=items[5];this.showPopOver = true;this.popOverImg = Tools.base64+items[0];this.popUpQtyDisplay=""; this.setState({popOverImg:this.popOverImg,popOverMsg:this.popOverMsg,popOverMsg2:this.popOverMsg2,popOverMsg3:this.popOverMsg3,popOverMsg4:this.popOverMsg4,showPopOver:true,popUpQtyDisplay:""})}} icon={eye}/>
                          </IonItem>
                        </IonCard>
                      ):
                      <IonItem>
                        <IonLabel style={{color:"darkblue"}}>No Items In Cart</IonLabel>
                      </IonItem>
                    }
                  </IonContent>

                <IonToolbar color="success">
                  <IonIcon onClick={()=>{this.showModel=false;this.setState({showModel:false})}} slot="start" icon={arrowBackCircle} style={{width:"100%"}}/>
                  <IonIcon onClick={()=>{}} color="medium" slot="end" icon={grid} style={{width:"100%"}}/>
                  <IonIcon onClick={()=>{}} color="medium" slot="end" icon={cart} style={{width:"100%"}}/>
                </IonToolbar>
              </IonPage>
            </IonModal>
            <IonFooter>
                <IonToolbar color="success">
                  <IonButton hidden id="home" routerLink="/home"/>
                  <IonButton hidden id="dashboard" routerLink="/dashboard"/>
                  <IonIcon onClick={()=>{document.getElementById("home").click()}} slot="start" icon={home} style={{width:"100%"}}/>
                  <IonIcon onClick={()=>{document.getElementById("dashboard").click()}} slot="end" icon={grid} style={{width:"100%"}}/>
                  <IonIcon onClick={()=>{this.showModel=true;this.setState({showModel:true})}} slot="end" icon={cart} style={{width:"100%"}}/>
                </IonToolbar>
            </IonFooter>
      </IonPage>
    );
  }
};

export default Products
;
