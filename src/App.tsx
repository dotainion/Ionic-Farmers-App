import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Products from './pages/Products';
import Transportation from './pages/Delivery';
import ProductUpload from './pages/ProductUpload';
import Education from './pages/EducatonNavigation';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Payments from './pages/Payment'


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/payment" component={Payments} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/payment" />} />
        <Route path="/upload" component={ProductUpload} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/upload" />} />
        <Route path="/transportation" component={Transportation} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/transportation" />} />
        <Route path="/education" component={Education} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/education" />} />
        <Route path="/dashboard" component={Dashboard} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route path="/login" component={Login} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/register" component={Register} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/register" />} />
        <Route path="/products" component={Products} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/products" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
