import React, {useState } from 'react';
import { home, notifications, grid, arrowBackCircle, ellipsisVertical, logOut, addCircle, lockClosed, shareSocial, mail, people, newspaper, key, logIn, car, cloudUpload, calculator, cart } from 'ionicons/icons';
import {  IonToolbar, IonIcon, IonFooter, IonModal, IonContent, IonTitle, IonMenuButton, IonButtons, IonList, IonMenu, IonHeader, IonCard, IonItem, IonRouterOutlet, IonPopover, IonButton, IonToast, IonLabel } from '@ionic/react';
import tools from './FunctonTools'



class Widgets{
    HeaderAndMenus(){
        const [showPopover, setShowPopover] = useState(false);
        const [showPopover2, setShowPopover2] = useState(false);
        const [logOutDisabed, setLogOutDisabed] = useState(true);
        const [showToast, setShowToast] = useState(false);
        const [logOutBtnName, setLogOutBtnName] = useState("");
        const [logoutBgColor, setLogoutBgColor] = useState("");
        const [menudisabled, setMenudisabled] = useState(false);
        return (
            <>
                <IonToolbar color="success">
                    <IonTitle>{tools.appName}</IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton onMouseUp={()=>{
                            setMenudisabled(false)
                        }} autoHide={false} />
                    </IonButtons>
                    <IonButtons slot="end" onClick={() => {
                            setShowPopover(true);
                            if (tools.retreiveCreds("email") === "none" && tools.retreiveCreds("password") === "none"){
                                setLogOutDisabed(true);
                            }else{
                                setLogOutDisabed(false);
                            }
                        }}>
                        <IonIcon style={{margin:"10px"}} icon={ellipsisVertical} />
                    </IonButtons>
                </IonToolbar>

                <IonMenu disabled={menudisabled} side="start" contentId="menu" menuId="" onIonWillOpen={()=>{
                    if (tools.retreiveCreds("password") === "none"){
                        setLogoutBgColor("gray");
                    }else{
                        setLogoutBgColor("blue");
                    }
                }}>
                    <IonHeader>
                        <IonToolbar color="success">
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                        <IonItem>
                            <IonCard style={{width:"100%"}}>
                                <IonItem style={{color:"green"}} onClick={()=>{tools.navClick("login")}}><IonIcon icon={logIn} />Login</IonItem>
                            </IonCard>
                            <IonCard style={{width:"100%"}}>
                                <IonItem style={{color:"green"}} onClick={()=>{tools.navClick("register");}}><IonIcon icon={key} />Register</IonItem>
                            </IonCard>
                        </IonItem>

                        <IonItem style={{color:"green"}} onClick={()=>{setMenudisabled(true);tools.navClick("home")}}><IonIcon icon={home} /><IonIcon/>Home</IonItem>
                        <IonItem style={{color:"green"}} onClick={()=>{setMenudisabled(true);tools.navClick("upload")}}><IonIcon icon={addCircle} /><IonIcon/>Add Products</IonItem>
                        <IonItem style={{color:"green"}} onClick={()=>{setMenudisabled(true);tools.navClick("dashboard")}}><IonIcon icon={grid} /><IonIcon/>Dashbored</IonItem>
                        <IonItem style={{color:"green"}}><IonIcon icon={people} /><IonIcon/>About us</IonItem>
                        <IonItem style={{color:"green"}}><IonIcon icon={mail} /><IonIcon/>Contact us</IonItem>
                        <IonItem style={{color:"green"}}><IonIcon icon={lockClosed} /><IonIcon/>Policy Privacy</IonItem>
                        <IonItem style={{color:"green"}}><IonIcon icon={newspaper} /><IonIcon/>Terms and conditions</IonItem>
                        <IonItem style={{color:"green"}}><IonIcon icon={shareSocial} /><IonIcon/>Share this App</IonItem>
                        <IonItem style={{color:logoutBgColor}} onClick={()=>{if(tools.retreiveCreds("password") !== "none"){tools.logOut();setShowToast(true);setLogoutBgColor("gray")}}}><IonIcon icon={logOut} /><IonIcon/>LogOut</IonItem>
                        </IonList>
                    </IonContent>
                </IonMenu>
                <IonRouterOutlet id="menu"></IonRouterOutlet> 

                <IonPopover cssClass="text-right" isOpen={showPopover} onWillPresent={()=>{
                    if (logOutDisabed){
                        setLogOutBtnName("Login/Register");
                    }else{
                        setLogOutBtnName("Logout");
                    }
                }} onDidDismiss={e => setShowPopover(false)}>
                    <IonList>
                        <IonItem>
                            <IonIcon icon={home}/>
                            <IonLabel onClick={e => {setMenudisabled(true);setShowPopover(false);tools.navClick("home")}} style={{marginLeft:"15px"}}>home</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={calculator}/>
                            <IonLabel onClick={e => {setMenudisabled(true);setShowPopover(false);tools.navClick("education")}} style={{marginLeft:"15px"}}>Educational</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={cart}/>
                            <IonLabel onClick={e => {setMenudisabled(true);setShowPopover(false);tools.navClick("products")}} style={{marginLeft:"15px"}}>Products</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={cloudUpload}/>
                            <IonLabel onClick={e => {setMenudisabled(true);setShowPopover(false);tools.navClick("upload")}} style={{marginLeft:"15px"}}>Upload Products</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={grid}/>
                            <IonLabel onClick={e => {setMenudisabled(true);setShowPopover(false);tools.navClick("dashboard")}} style={{marginLeft:"15px"}}>Dashbored</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={car}/>
                            <IonLabel onClick={e => {setMenudisabled(true);setShowPopover(false);tools.navClick("transportation")}} style={{marginLeft:"15px"}}>Delivery</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={logOut}/>                            
                            <IonLabel onClick={e => {
                                setShowPopover(false);
                                if(!logOutDisabed){
                                    tools.logOut();
                                    setShowToast(true)
                                }else{
                                    setShowPopover2(true);
                                }}} style={{marginLeft:"15px"}}>{logOutBtnName}</IonLabel>
                        </IonItem>
                    </IonList>
                </IonPopover>

                <IonPopover cssClass="text-right" isOpen={showPopover2} onDidDismiss={e => setShowPopover2(false)}>
                    <IonItem>
                        <IonItem>
                            <IonIcon icon={key}/>
                            <IonLabel onClick={e => {setShowPopover2(false);tools.navClick("register")}}>Register</IonLabel>  
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={logIn}/>  
                            <IonLabel onClick={e => {setShowPopover2(false);tools.navClick("login")}}>Login</IonLabel>
                        </IonItem>
                    </IonItem>
                </IonPopover>

                <IonToast isOpen={showToast} position="top" onDidDismiss={()=>{setShowToast(false)}}
                    message={"You've logged out"} duration={1000}/>
                
                <IonButton hidden routerLink="/login" id="login"/>
                <IonButton hidden routerLink="/register" id="register"/>
                <IonButton hidden id="home" routerLink="/home"/>
                <IonButton hidden id="upload" routerLink="/upload"/>
                <IonButton hidden routerLink="/education" id="education"/>
                <IonButton hidden routerLink="/dashboard" id="dashboard"/>
                <IonButton hidden routerLink="/products" id="products"/>
                <IonButton hidden id="transportation" routerLink="/transportation"/>
            </>
        
    
        );
    };

    FooterWidthModal(){
        const [showModel, setShowModel] = useState(false); 
        return(
            <>
            <IonModal isOpen={showModel}>
                <IonToolbar color="success">
                    <IonTitle>Farmers App</IonTitle>
                    <IonIcon style={{margin:"10px"}} slot="end" icon={ellipsisVertical} />
                </IonToolbar>
                <IonContent>
                    <IonList style={{border:"inset",height:"40%",margin:"10px"}}>
                        <IonButtons>{}</IonButtons>
                    </IonList>
                    <IonList style={{border:"inset",height:"40%",margin:"10px"}}>
                        <IonButtons>test</IonButtons>
                    </IonList>
                </IonContent>
                <IonToolbar color="success">
                    <IonIcon onClick={()=>{setShowModel(false)}} slot="start" icon={arrowBackCircle} style={{width:"100%"}}/>
                    <IonIcon onClick={()=>{}} slot="end" icon={grid} style={{width:"100%"}}/>
                    <IonIcon onClick={()=>{}} slot="end" icon={notifications} style={{width:"100%"}}/>
                </IonToolbar>
            </IonModal>
            <IonFooter>
                <IonToolbar color="success">
                    <IonIcon onClick={()=>{}} slot="start" icon={home} style={{width:"100%"}}/>
                    <IonIcon onClick={()=>{}} slot="end" icon={grid} style={{width:"100%"}}/>
                    <IonIcon onClick={()=>{setShowModel(true)}} slot="end" icon={notifications} style={{width:"100%"}}/>
                </IonToolbar>
            </IonFooter>
            </>
        )
    }
}


export default Widgets;