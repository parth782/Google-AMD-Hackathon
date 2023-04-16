import React from "react"
import "./App.css"
import Footer from "./Footer"
import Header from "./Header"
import ShoppersSearch from "./ShoppersSearch"


class Landing extends React.Component {
  render() {
    return (
      <div className = 'landing-main'>
        <div className="Landing">
          <section id="landingPage">
            <div id="description">
              <h5>Welcome to the farmer's bazaar! 
              A place where local farmers can create their own inventory, update it, and sell farm-fresh products to everyone who is interested in fresh local produce. 
              Shoppers can search for the products they are interested in and find the farms that sell those products.</h5>
            </div>
            <ShoppersSearch/>
          </section>
          <Footer />
        </div>
      </div>

    );
  }
}

export default Landing;
