import React, {useState} from 'react';
import { home, notifications, grid, arrowBackCircle, ellipsisVertical, logOut, addCircle, lockClosed, shareSocial, mail, people, newspaper, key, logIn, car, cloudUpload, calculator, cart } from 'ionicons/icons';
import {  IonToolbar, IonIcon, IonFooter, IonModal, IonContent, IonTitle, IonMenuButton, IonButtons, IonList, IonMenu, IonHeader, IonCard, IonItem, IonRouterOutlet, IonPopover, IonButton, IonToast } from '@ionic/react';
import tools from './FunctonTools'



class Widgets{
    reaload = (e:any) =>{
        
    }
    
    HeaderAndMenus(){
        const [showPopover, setShowPopover] = useState(false);
        const [logOutDisabed, setLogOutDisabed] = useState(true);
        const [showToast, setShowToast] = useState(false);
        return (
            <>
                <IonToolbar color="success">
                    <IonTitle>{tools.appName}</IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton autoHide={false} />
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
                
                <IonMenu side="start" contentId="menu" menuId="">
                    <IonHeader>
                        <IonToolbar color="success">
                        <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                        <IonItem>
                            <IonButton hidden routerLink="/login" id="login"/>
                            <IonButton hidden routerLink="/register" id="register"/>
                            <IonCard style={{width:"100%"}}>
                                <IonItem onClick={()=>{document.getElementById("login")?.click()}}><IonIcon icon={logIn} />Login</IonItem>
                            </IonCard>
                            <IonCard style={{width:"100%"}}>
                                <IonItem onClick={()=>{document.getElementById("register")?.click();}}><IonIcon icon={key} />Register</IonItem>
                            </IonCard>
                        </IonItem>
                        <IonItem><IonIcon icon={home} /><IonIcon/>Main</IonItem>
                        <IonItem><IonIcon icon={addCircle} /><IonIcon/>Add Products</IonItem>
                        <IonItem><IonIcon icon={people} /><IonIcon/>About us</IonItem>
                        <IonItem><IonIcon icon={mail} /><IonIcon/>Contact us</IonItem>
                        <IonItem><IonIcon icon={lockClosed} /><IonIcon/>Policy Privacy</IonItem>
                        <IonItem><IonIcon icon={newspaper} /><IonIcon/>Terms and conditions</IonItem>
                        <IonItem><IonIcon icon={shareSocial} /><IonIcon/>Share this App</IonItem>
                        <IonItem><IonIcon icon={logOut} /><IonIcon/>LogOut</IonItem>
                        </IonList>
                    </IonContent>
                </IonMenu>
                <IonRouterOutlet id="menu"></IonRouterOutlet>  
    
                
                <IonPopover cssClass="text-right" isOpen={showPopover} onDidDismiss={e => setShowPopover(false)}>
                    <IonList>
                        <IonItem>
                            <IonIcon icon={calculator}/>
                            <IonButton onClick={e => {setShowPopover(false);this.reaload(e)}} routerLink="/education" style={{width:"100%"}}>Educational</IonButton>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={cart}/>
                            <IonButton onClick={e => {setShowPopover(false);this.reaload(e)}} routerLink="/products" style={{width:"100%"}}>Products</IonButton>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={cloudUpload}/>
                            <IonButton onClick={e => {setShowPopover(false);this.reaload(e)}} routerLink="/upload" style={{width:"100%"}}>Upload Products</IonButton>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={car}/>
                            <IonButton onClick={e => {setShowPopover(false);this.reaload(e)}} routerLink="/transportation" style={{width:"100%"}}>Delivery</IonButton>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={logOut}/>
                            <IonButton disabled={logOutDisabed} onClick={e => {setShowPopover(false);tools.logOut();setShowToast(true)}} style={{width:"100%"}}>Logout</IonButton>
                        </IonItem>
                    </IonList>
                </IonPopover>

                <IonToast isOpen={showToast} position="top" onDidDismiss={()=>{setShowToast(false)}}
                    message={"You've logged out"} duration={4000}/>
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