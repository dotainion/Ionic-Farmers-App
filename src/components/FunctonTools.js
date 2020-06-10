import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';



/*
if there is an error in android stuiod for the import androidx.core.content.FileProvider...
use this ... import androidx.core.content.FileProvider;
and if error for public class FileProvider extends android.support.v4.content.FileProvider {}...
user this ... public class FileProvider extends androidx.core.content.FileProvider {}
*/ 

/*
steps to conver into apk file using android studio
NOTE: may need to delete android folder so new code can take effect when building
or old save code in android folder will be kept

1: ionic build
2: npx cap add android
3: npx cap open android
*/
class Tools{
    constructor(){
        defineCustomElements(window);//this is to show camera in browser

        this.base64 = "data:image;base64,";//base 64 code to display image in base 64 bit

        this.appName = "Farmer App";//this hold the name of the app

        this.cartItem = [];//this will hold the cart items

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
        this.paymentsRoute = "/buy/payments";
        this.url = {
            products:this.mainUrl+this.productRoute,
            login:this.mainUrl+this.loginRoute,
            register:this.mainUrl+this.registerRoute,
            productupload:this.mainUrl+this.productUploadRoute,
            transportation:this.mainUrl+this.transportationRoute,
            payments:this.mainUrl+this.paymentsRoute,
        }

        //this is the list of products category
        //product can be retreive by using the product category as referece to get data from product list
        //example... this.productsList[this.productCategory[0]]
        //this will return a list spesifically for element 0 wich is vegetables
        //and its products will be Carrot, Carbage, Lettuce
        this.productCategory = [
            "Vegetables",
            "Fruites",
            "Grains",
            "Flowers",
            "Provision",
            "Medicinal Plants",
            "Animals",
            "Farmers Inventions"
        ]
        //this hold all food products
        this.productsList = {
            //list of vegetables
            "Vegetables":[
                "Carrot",
                "Carbage",
                "Lettuce",
                "carrot",
                "broccoli", 
                "asparagus",
                "cauliflower", 
                "corn", 
                "cucumber",
                "eggplant",
                "green pepper", 
                "lettuce", 
                "mushrooms",
                "onion", 
                "potato",
                "pumpkin", 
                "red pepper", 
                "tomato", 
                "beetroot",
                "brussel sprouts",
                "peas",
                "zucchini",
                "radish",
                "sweet potato",
                "artichoke",
                "leek",
                "cabbage",
                "celery",
                "chili",
                "garlic",
                "basil",
                "coriander",
                "parsley",
                "dill",
                "rosemary",
                "oregano",
                "cinnamon",
                "saffron",
                "green bean",
                "bean", 
                "chickpea",
                "lentil",
            ],
            //list of fruits
            "Fruites":[
                "Alfalfa Sprouts",
                "Apple",
                "Apricot",
                "Artichoke",
                "Asian Pear",
                "Asparagus",
                "Atemoya",
                "Avocado",
                "Bamboo Shoots",
                "Banana",
                "Bean Sprouts",
                "Beans",
                "Beets",
                "Belgian Endive",
                "Bell Peppers",
                "Bitter Melon",
                "Blackberries",
                "Blueberries",
                "Bok Choy",
                "Boniato",
                "Boysenberries",
                "Broccoflower",
                "Broccoli",
                "Brussels Sprouts",
                "Cabbage",
                "Cactus Pear",
                "Cantaloupe",
                "Carambola",
                "Carrots",
                "Casaba Melon",
                "Cauliflower",
                "Celery",
                "Chayote",
                "Cherimoya",
                "Cherries",
                "Coconuts",
                "Collard Greens",
                "Corn",
                "Cranberries",
                "Cucumber",
                "Dates",
                "Dried Plums",
                "Eggplant",
                "Endive",
                "Escarole",
                "Feijoa",
                "Fennel",
                "Figs",
                "Garlic",
                "Gooseberries",
                "Grapefruit",
                "Grapes",
                "Green Beans",
                "Green Onions",
                "Greens",
                "Guava",
                "Hominy",
                "Honeydew Melon",
                "Horned Melon",
                "Iceberg Lettuce",
                "Jerusalem Artichoke",
                "Jicama",
                "Kale",
                "Kiwifruit",
                "Kohlrabi",
                "Kumquat",
                "Leeks",
                "Lemons",
                "Lettuce",
                "Lima Beans",
                "Limes",
                "Longan",
                "Loquat",
                "Lychee",
                "Madarins",
                "Malanga",
                "Mandarin Oranges",
                "Mangos",
                "Mulberries",
                "Mushrooms",
                "Napa",
                "Nectarines",
                "Okra",
                "Onion",
                "Oranges",
                "Papayas",
                "Parsnip",
                "Passion Fruit",
                "Peaches",
                "Pears",
                "Peas",
                "Peppers",
                "Persimmons",
                "Pineapple",
                "Plantains",
                "Plums",
                "Pomegranate",
                "Potatoes",
                "Prickly Pear",
                "Prunes",
                "Pummelo",
                "Pumpkin",
                "Quince",
                "Radicchio",
                "Radishes",
                "Raisins",
                "Raspberries",
                "Red Cabbage",
                "Rhubarb",
                "Romaine Lettuce",
                "Rutabaga",
                "Shallots",
                "Snow Peas",
                "Spinach",
                "Sprouts",
                "Squash",
                "Strawberries",
                "String Beans",
                "Sweet Potato",
                "Tangelo",
                "Tangerines",
                "Tomatillo",
                "Tomato",
                "Turnip",
                "Ugli Fruit",
                "Water Chestnuts",
                "Watercress",
                "Watermelon",
                "Waxed Beans",
                "Yellow Squash",
                "Yuca/Cassava",
                "Zucchini Squash",
            ],
            //list of provisions
            "Provision":[
                "Yams",
                "Yellow Yams",
                "Avocado",
                "Dasheen",
                "Potato",
                "Eddoe",
                "Green Bannanas"
            ],
            //list of grains
            "Grains":[
                "string beens",
                "corn",
            ],
            //list of flowers
            "Flowers":[
                "none"
            ],
            "Medicinal Plants":[
                "Bay leaf",
            ],
            //list of animals
            "Animals":[
                "Goat",
                "Cow",
                "Sheep",
                "Fowl",
            ],
            //list of farmers inventions
            "Farmers Inventions":[
                "spesify"
            ]
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

    async getGallery(funcCall) {
        //this function will open up the gallery in the device
        //amd returns the photo the user chooses adn pass it in 
        //as parameter that was passed in as function parameter
        const { Camera } = Plugins;
        Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Base64,
          source:CameraSource.Photos,
          saveToGallery:false,
          correctOrientation:true,
        }).then(results=>{
            funcCall(results.base64String)
        }).catch(()=>{});
    }

    storeCreds(email,password){
        //this will store username and password
        window.localStorage.setItem("email",email);
        window.localStorage.setItem("password",password);
    }

    retreiveCreds(creds){
        //this will retreive username and password
        if (creds === "email"){
            var username = window.localStorage.getItem("email");
            if (username){
                return username;
            }else{
                return "none";
            }
        }else if (creds === "password"){
            var password = window.localStorage.getItem("password");
            if (password){
                return password;
            }else{
                return "none";
            }
        } 
    }

    logOut(){
        //this will remove username and password from storage
        //to implement a logout functionality by adding 'none' to it
        window.localStorage.setItem("email","none");
        window.localStorage.setItem("password","none");
    }

    previousPage(page){
        //this hold the page name 
        //when user ty to make a  payment or upload a product they will be prompt to login or register first
        //so that page which thy was in before going to the login or register page will be stored
        //so once user login or register they will be redirected to that previous page
        //if input parameter is "get" then the page name will be returned
        //if input parameter is not equal to 'get' then that input will be stored
        if (page !== "get"){
            var getPages = window.localStorage.setItem("page",page);
            if (getPages){
                return getPages;
            }else{
                return "none";
            }
        }else{
            var pages = window.localStorage.getItem("page");
            if (pages){
                return pages;
            }else{
                return "none";
            }
        }
    }
};

var Tool = new Tools()
export default Tool;
