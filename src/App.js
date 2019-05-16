import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import MainMenu from './components/MainMenu/MainMenu';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import { getCategories } from './services/categoriesService';
import _ from "lodash";
import PaymentForm from './components/PaymentForm/PaymentForm';
import ProductTest from './components/ProductTest/ProductTest';



class App extends Component {


  state = {
    categories: [],              
    homeUrl: "http://demo.sakhuradesigns.com",
            }

    async componentDidMount() {
      
      const {data} = await getCategories();
      // console.log(data.allJewelleryCategories.edges)
      const categories = [];
      _.forEach(data.allJewelleryCategories.edges, function(value) {
        categories.push({id:value.node.id, item:value.node.categoryName, url: value.node.categoryUrl })
      })
      // console.log(categories)
      this.setState({categories})
    }

    
  render() {
    const {categories} = this.state;
    const categorieslist =  categories.map(category => { return <Route key={category.id}
      path={category.url}
       render={props => <ProductTest {...props} category={category.item} />}
       />})
    return (
      <React.Fragment>
 
  
        <div>

        <MainMenu categories={categories} user={this.state.user}/>

        
        <div className="container">
        <br/>
			<br/>
        <Switch>
        
          {categorieslist}
          <Route path="/payment/:id" component={PaymentForm} />
    
          <Route path="/" component={HomePage}/>

         
           
        
        </Switch>
        </div>
       <Footer homeUrl = {this.state.homeUrl} />
       </div>
      </React.Fragment>
    );
  }
}

export default App;
