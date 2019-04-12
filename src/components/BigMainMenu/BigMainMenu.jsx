import React, { Component } from 'react';

class BigMainMenu extends Component {
    state = {  }
    render() { 
        return ( <React.Fragment>      <header className="pheader">
        <h1 className="htitle">Sakhura Designs</h1>
        <p className="tagline">The fashion brand that gives the western girl a unique ensemble through our collection of chic Indian wear.</p>
        <div className="double-down" onClick={this.handlerScrollProducts}>
        <i class="fa fa-angle-double-down" aria-hidden="true"></i>
        </div>
        </header></React.Fragment> );
    }
}
 
export default BigMainMenu;