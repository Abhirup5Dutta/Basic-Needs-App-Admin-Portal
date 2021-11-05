import React from 'react';
import './App.css';
import LoginScreen from './Components/LoginScreen/LoginScreen';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import Navigation from './Components/Navigation/Navigation';
import Baners from './Components/Baners/Baners';
import Categories from './Components/Categories/Categories';
// import Notification from './Components/Notification/Notification';
// import Admin from './Components/Admin/Admin';
// import Settings from './Components/Settings/Settings';
// import Orders from './Components/Orders/Orders';
import { AuthProvider } from "./Components/Context/AuthContext";
import Vendor from './Components/Vendors/Vendor';
import DeliveryBoy from './Components/DeliveryBoy/DeliveryBoy';

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Navigation />
          <Switch>
            {/* <PrivateRoute exact path='/' component={Dashboard} /> */}
            <PrivateRoute exact path='/' component={Baners} />
            <PrivateRoute exact path='/vendor' component={Vendor} />
            <PrivateRoute exact path='/deliveryBoy' component={DeliveryBoy} />
            <PrivateRoute exact path='/categories' component={Categories} />
            {/* <PrivateRoute exact path='/orders' component={Orders} /> */}
            {/* <PrivateRoute exact path='/notification' component={Notification} /> */}
            {/* <PrivateRoute exact path='/admin' component={Admin} /> */}
            {/* <PrivateRoute exact path='/settings' component={Settings} /> */}
            <Route path='/login' component={LoginScreen} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
