import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Footer from './Footer/Footer';
import {Routes , Route } from 'react-router-dom';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';


const Main = props => {
    return (
        <div>
            <Header />
            <div className="container">
                {/* <BurgerBuilder /> */}
              <Routes>
                    <Route path="/" exact Component={BurgerBuilder}/>
                     <Route path="/orders" Component={Orders}/>
                     <Route path="/checkout"  element={<Checkout/>}/>
              </Routes>
            </div>
            <Footer/>
        </div>
    )
}

export default Main;