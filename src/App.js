import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import MainMenu from './components/MainMenu/MainMenu';
import ProductList from './components/ProductList/ProductList';
import HomePage from './components/HomePage/HomePage';
import BigMainMenu from './components/BigMainMenu/BigMainMenu';
import { Link, NavLink } from "react-router-dom";
import Footer from './components/Footer/Footer';


class App extends Component {


  state = {
    categories: [
                {id:1, item:'Earrings', url:'/earrings'},
                {id:2, item:'Kada', url:'/kada'},
                {id:3, item:'Necklace Sets', url:'/necklace'}
                ],
    homeUrl: "http://demo.sakhuradesigns.com",
    products: [
              {id:1, name:"The Nayaab Chand Bali Earrings", price:17000, stock:2, image_url:"/jewellery/earring1.webp", categoryid:1 },
              {id:2, name:"Bambo Earring", price:7000, stock:2, image_url:"/jewellery/earring2.webp", categoryid:1 },
              {id:3, name:"Sterling Silver Hoop", price:6900, stock:2, image_url:"/jewellery/earring3.webp", categoryid:1 },
              {id:4, name:"Laurel", price:10000, stock:1, image_url:"/jewellery/earring4.webp", categoryid:1 },
              {id:5, name:"Binaika", price:5930, stock:2, image_url:"/jewellery/earring5.webp", categoryid:1 },
              {id:6, name:"Malissa", price:2790, stock:2, image_url:"/jewellery/earring1.webp", categoryid:1 },
              {id:7, name:"Tiny Leaf", price:29990, stock:2, image_url:"/jewellery/earring3.webp", categoryid:1 },
              {id:8, name:"Real Aspen", price:509000, stock:2, image_url:"/jewellery/earring4.webp", categoryid:1 },
              {id:9, name:"Ruth Bader", price:69080, stock:2, image_url:"/jewellery/earring5.webp", categoryid:1 },
              {id:10, name:"Tiny Line", price:70000, stock:2, image_url:"/jewellery/earring3.webp", categoryid:1 },
              {id:11, name:"Clock Ear", price:20000, stock:2, image_url:"/jewellery/earring1.webp", categoryid:1 },
              {id:12, name:"Goldfish", price:48000, stock:2, image_url:"/jewellery/earring5.webp", categoryid:1 },
              {id:13, name:"Asymmetry", price:67000, stock:2, image_url:"/jewellery/earring2.webp", categoryid:1 },
              {id:14, name:"Desertscape", price:189000, stock:2, image_url:"/jewellery/earring4.webp", categoryid:1 },
             
    ]
            }


  
  render() {
    return (
      <React.Fragment>
 
  
        

        <MainMenu categories={this.state.categories}/>

        
        <div className="container">
        <br/>
			<br/>
        <Switch>
          <Route 
             path="/" 
              render={props => <ProductList {...props} products={this.state.products} />}
              />
           
        
        </Switch>
        </div>
       <Footer homeUrl = {this.state.homeUrl} />
        
      </React.Fragment>
    );
  }
}

export default App;
