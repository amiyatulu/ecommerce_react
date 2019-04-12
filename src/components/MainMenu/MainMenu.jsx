import React, {Component} from 'react';
import { Link, NavLink } from "react-router-dom";
import "./MainMenu.css";


class MainMenu extends Component {
    render() { 
        const {categories} = this.props;
        const categorieslist =  categories.map(category => { return <li className="nav-item"><Link  className="nav-link" key={category.id} to={category.url}>{category.item}</Link></li>})
    
        return ( <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light static-top">
  <a className="navbar-brand" href="#"><span className="navbar-brand-span">Sakhura Designs</span></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      
        {categorieslist}
      
    
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
        </React.Fragment> );
    }
}
 
export default MainMenu;
