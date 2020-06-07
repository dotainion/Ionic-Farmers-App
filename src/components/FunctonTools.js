import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

/*
if there is an error in android stuiod for the import androidx.core.content.FileProvider...
use this ... import androidx.core.content.FileProvider;
and if error for public class FileProvider extends android.support.v4.content.FileProvider {}...
user this ... public class FileProvider extends androidx.core.content.FileProvider {}
*/ 

class Tools{
    constructor(){
        defineCustomElements(window);

        this.base64 = "data:image;base64,";

        this.appName = "Farmer App";

        //this is the server username and password, if this password is incorerct then 
        //this app will not get access to server
        this.serverUserName = "user";
        this.serverPassword = "users";

        //this is the server URL and its routes
        //use url.XXX to get url and spesific route combine
        this.mainUrl = "http://127.0.0.1:80";
        this.productRoute = "/see/products";
        this.loginRoute = "/login";
        this.registerRoute = "/sign/up";
        this.productUploadRoute = "/farmers/product/upload";
        this.transportationRoute = "/transportations";
        this.url = {
            products:this.mainUrl+this.productRoute,
            login:this.mainUrl+this.loginRoute,
            register:this.mainUrl+this.registerRoute,
            productupload:this.mainUrl+this.productUploadRoute,
            transportation:this.mainUrl+this.transportationRoute,
        }

        //this is the list of products category
        //product can be retreive by using the product category as referece to get data from product list
        //example... this.productsList[this.productCategory[0]]
        //this will return a list spesifically for element 0 wich is vegetables
        //and its products will be Carrot, Carbage, Lettuce
        this.productCategory = ["Vegetables","Fruites","Grains","Flowers","Medicinal Plants","Animals","Farmers Inventions"]
        this.productsList = {
            "Vegetables":["Carrot","Carbage","Lettuce"],
            "Fruites":["mango","bannana"],
            "Grains":["string beens","corn"],
            "Flowers":[],
            "Medicinal Plants":["bay leaf"],
            "Animals":["goat","Cow","sheep"],
            "Farmers Inventions":["spesify"]
        }
    };

    async takePicture(funcCall) {
        //this function will be call when using the device camera
        //it will take a photo and pass it into the function that was passed in as a parameter
        //so the image can be use.
        
        const { Camera } = Plugins;
        /*const image = await */Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Base64,
          source:CameraSource.Camera,
          saveToGallery:true,
          correctOrientation:true,
        }).then(results=>{
            funcCall(results.base64String)
        }).catch(()=>{});
    
        /*var imageUrl = image.webPath;
        // Can be set to the src of an image now
        funcCall(imageUrl);
        console.log("testing");
        console.log(imageUrl.Base64);*/
    }

    storeCreds(email,password){
        //this will store username and password
        window.localStorage.setItem("email",email);
        window.localStorage.setItem("password",password);
    }

    retreiveCreds(creds){
        //this will retreive username and password
        if (creds === "email"){
            return window.localStorage.getItem("email");
        }else if (creds === "password"){
            return window.localStorage.setItem("password");
        } 
    }
};

var Tool = new Tools()
export default Tool;
