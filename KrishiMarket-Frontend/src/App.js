import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Landing from './Landing'
import AddItems from './AddItems'
import Inventory from './Inventory'
import Login from './Login'
import Register from './Register'
import NavBar from './NavBar'
import Error from './Error'
import ItemDetails from './ItemDetails'
import Contact from './Contact'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Landing} />

            <Route path='/user/login' component={Login} />

            <Route path='/signup' component={Register} />

            <Route path='/add-item' component={AddItems} />

            <Route path='/inventory' component={Inventory} />

            <Route path='/item-details/:itemId' component={ItemDetails} />

            <Route path='/contact/:userId' component={Contact} />

            <Route component={Error} />


          </Switch>
        </BrowserRouter>

      </div>
    );
  }

}

export default App;
