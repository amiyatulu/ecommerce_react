import React, { Component } from 'react';
import axios from 'axios';
import Joi from "joi-browser";
import Form from "../Common/Form";
import { getProduct } from "../../services/productIdService";
import { media, apiUrl} from "../../config.json";
import "./PaymentForm.css";


class PaymentForm extends Form {
    state = { 
        data: { 
            buyer_name: "",
            email: "",
            phone: "",        
        },
        paydata: {
            purpose:"",
            amount: "",
            redirect_url: "",
            image: ""

        },
        errors: {}
     }
     async componentDidMount() {
        //  console.log(this.props.match.params.id);
        const {data} = await getProduct(this.props.match.params.id);
        // console.log(data)
        // console.log(data.product.jewelleryPrice.price)
        // console.log(data.product.productName)
        // console.log(data.product.jewelleryImages.edges[0].node.image)
        const paydata = {}
        paydata.purpose = data.product.productName
        paydata.amount = data.product.price
        paydata.image = data.product.image
        this.setState({paydata})
        // console.log(this.state.paydata)
         
     }
     schema = {
        buyer_name: Joi.string()
               .required()
               .label("Name"),
        email: Joi.string()
        .required()
        .email()
        .label("Email"),
        phone: Joi.number().required().label("Phone Number")
        
     }

    doSubmit = () => {
        const paydata = { ...this.state.paydata}
        paydata.redirect_url = `${apiUrl}/callback/?user_id=${this.state.data.email}`
        this.setState({paydata})
        setTimeout(function(){
            console.log(this.state);
        this.onBuyNowClick(this.state);
        }.bind(this), 1000);
        

    };
    
    onBuyNowClick = (state) => {
        // console.log("hello");
        const email = state.data.email;
        const data = {
            purpose: state.paydata.purpose,
            amount: state.paydata.amount,
            buyer_name: state.data.buyer_name,
            email: email,
            phone: state.data.phone,
            user_id: email,
            redirect_url: state.paydata.redirect_url,
           
        };
        // console.log(data);

        axios.post(`${apiUrl}/pay/`, data)
             .then( res => {
                 console.log('resp', res.data);
                 window.location.href = res.data;
             })
             .catch((error) => console.log(error.response.data));

    }
    render() { 
        return ( <div>
            <h1>Product Details</h1>
            <p>Name: {this.state.paydata.purpose}</p>
            <p>Price: ₹ {this.state.paydata.amount}</p>
            <p><img className="imgpay" src={media + this.state.paydata.image} alt=""/></p>
            <h1>User Details</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("buyer_name", "Name")}
                {this.renderInput("email", "Email")}
                {this.renderInput("phone", "Phone Number")}
                {this.renderButton("Buy Now")}
            </form>
           
            </div> );
    }
}
 
export default PaymentForm;