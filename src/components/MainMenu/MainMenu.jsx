import React, {Component} from 'react';
import { Link, NavLink } from "react-router-dom";
import "./MainMenu.css";
import logo from './logo.png';


class MainMenu extends Component {
    render() { 
        const {categories, user} = this.props;
        const categorieslist =  categories.map(category => { return <li className="nav-item"  key={category.id}><Link  className="nav-link submenu" to={category.url}>{category.item}</Link></li>})
    
        return ( <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light static-top">
  <Link className="navbar-brand" to="/"> <img src={logo} className="brandlogo"  alt="Sakhura Designs"/> <span className="navbar-brand-span">Sakhura Designs</span></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      
        {categorieslist}
      
    
    </ul>
    <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/payment" className="cartlogo" aria-expanded="false"> <i className="fa fa-cart-plus" aria-hidden="true"></i></Link>
          </li>
    </ul>
  </div>
</nav>
        </React.Fragment> );
    }
}
 
export default MainMenu;
