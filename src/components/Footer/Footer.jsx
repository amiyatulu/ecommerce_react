import React from 'react';
import "./Footer.css";

const Footer = (props) => {
    // console.log(props.homeUrl);
    return ( <React.Fragment>

        <div className="footer">
        <div>
            <ul className="main-nav">
                <li><a href={"https://www.facebook.com/sharer/sharer.php?u="+props.homeUrl}   className="fa fa-facebook" ></a></li>
                <li><a href={"https://twitter.com/home?status="+props.homeUrl} className="fa fa-twitter"></a></li>
                <li><a href={"https://pinterest.com/pin/create/button/?url=&media=&description="+props.homeUrl} className="fa fa-pinterest"></a></li>
            </ul>
        
        
        </div>

        
        </div>
    </React.Fragment> );
}
 
export default Footer;