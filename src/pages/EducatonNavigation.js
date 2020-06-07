import React, { Component } from 'react';
import '../components/StyleSheet.css'
import { IonPage, IonContent, IonImg, IonThumbnail, IonList, IonLabel, IonItemDivider, IonCard } from '@ionic/react';
import AllWidgets from '../components/Widgets'


//var Widget = new AllWidgets();
class Education extends Component{
    constructor(){
        super()
        
        this.Url = "https://www.ilfbpartners.com/wp-content/uploads/2017/09/1490417JSO2920-660x440.jpg";
        this.slideIndex = 0
        this.slideShow();
    };

    slideShow(){
        var url = "https://www.ilfbpartners.com/wp-content/uploads/2017/09/1490417JSO2920-660x440.jpg";
        var url2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsOnu23UPnZucDLuPWmQj-n80fbxoYAoBbDVrSH0Srxe7DZkkR&usqp=CAU";
        var url3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe3cuE6aT3am7TBko5shECQmRg4c_erINd8hNttRm-Qx2WH46z&usqp=CAU";
        var urls = [url,url2,url3]
        setTimeout(() => {
            this.Url = urls[this.slideIndex]
            this.setState({Url:urls[this.slideIndex]})
            if (this.slideIndex < 3){
                this.slideIndex += 1;
            }else{
                this.slideIndex = 0
            }
            this.slideShow()
        }, 3000);
    }

    render(){
        var Widget = new AllWidgets();
        return (
            <IonPage>
            <Widget.HeaderAndMenus/>
                <IonContent>
                    <IonList style={{backgroundColor:"dodgerBlue"}}>
                        <IonThumbnail style={{height:"250px",width:"360px"}}>
                            <IonImg src={this.Url}/>
                        </IonThumbnail>
                    <IonItemDivider color="success"/>
                    <IonCard style={{marginTop:"25px",backgroundColor:"dodgerBlue"}}>
                        <IonLabel style={{fontSize:"30px",color:"white"}}>Consession requirements</IonLabel>
                    </IonCard>
                    <IonCard style={{marginTop:"25px",backgroundColor:"dodgerBlue"}}>
                        <IonLabel style={{fontSize:"30px",color:"white"}}>Education blog from farmers</IonLabel>
                    </IonCard>
                    <IonCard style={{marginTop:"25px",backgroundColor:"dodgerBlue"}}>
                        <IonLabel style={{fontSize:"30px",color:"white"}}>Industry best practices for farming</IonLabel>
                    </IonCard>
                    </IonList>
                </IonContent>
            </IonPage>
        );
    }
};


export default Education;
