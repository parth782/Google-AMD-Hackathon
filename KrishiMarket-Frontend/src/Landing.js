import React from "react";
import styles1 from "./App.css";
// import Footer from "./Footer";
import Header from "./Header";
import ShoppersSearch from "./ShoppersSearch";
import VideoCarousel  from "./VideoCarousel";
import styles from "./jsmaster";
import {
  Billing,
  Business,
  Clients,
  Footer,
  Navbar,
  Stats,
  Testimonials,
} from "./components";

class Landing extends React.Component {
  render() {
    return (
      <div className="bg-primary w-full overflow-hidden">
        <div
          className={`${styles1.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}
        >
          <section
            id="landingPage"
            className={`${styles1.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}
          >
            <div id="description" className={`w-3/4 mx-auto`}>
              <h3 className="font-poppins font-semibold xs:text-[40.45px] text-[30.45px] xs:leading-[56.58px] leading-[38.58px] text-gradient uppercase ml-3">
                Welcome to the Krishi Market!
              </h3>
              <h5 className="font-poppins font-semibold xs:text-[18.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient sentencase ml-3">
                A place where local farmers can create their own inventory,
                update it, and sell farm-fresh products to everyone who is
                interested in fresh local produce. Shoppers can search for the
                products they are interested in and find the farms that sell
                those products.
              </h5>
            </div>
            <ShoppersSearch />
          </section>
          {/* <Footer /> */}
        </div>
        {/* If Farmer show Vid Carousel otherwise Don't Show */}
        
        <br></br>
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Stats />
            <Business />
            <Billing />
            <Testimonials />
            <Clients />
          </div>
        </div>
        <VideoCarousel/>
      </div>
    );
  }
}

export default Landing;
