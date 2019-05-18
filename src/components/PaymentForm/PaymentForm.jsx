import React, { Component } from 'react';
import axios from 'axios';
import Joi from "joi-browser";
import Form from "../Common/Form";
import {getProduct, getProducts } from "../../services/productIdService";
import { media, apiUrl} from "../../config.json";
import "./PaymentForm.css";
import ProductCart from './ProductCart';


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
            products: []

        },
        empty: true,
        errors: {}
     }

     async loadProducts () {
        const productCart = JSON.parse(localStorage.getItem('productCart'));
        if (productCart) {
            const {data} = await getProducts(productCart);
            let price = 0;
            for( let i=0, len=data.productList.length; i < len; i++){
                price += data.productList[i].price;
            }
            const products = data.productList
            const paydata = {}
            paydata.purpose = "buy products"
            paydata.amount = price
            paydata.products = products
            this.setState({paydata})
            this.setState({empty: false})
            // console.log(this.state.paydata)
        } else {
            this.setState({empty: true})

        }
     }
     async componentDidMount() {
        this.loadProducts()
        
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
     removeId = (id) => {
        const productCart = JSON.parse(localStorage.getItem('productCart'));
        
        if (productCart) {
            const newProductCart = productCart.filter(p => p !== id)
            localStorage.setItem('productCart', JSON.stringify(newProductCart));
            this.loadProducts();
            
            console.log(newProductCart)
        }
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
        if (this.state.paydata.products.length > 0) {
        return ( <div>
            <h1>Product Details</h1>
            {this.state.paydata.products.map(product => <ProductCart key={product.id} product={product} removeid={this.removeId.bind(null, product.id)} media={media} /> )}
            <p> <b>Total Price: ₹ {this.state.paydata.amount}</b></p>
            
            <h1>User Details</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("buyer_name", "Name")}
                {this.renderInput("email", "Email")}
                {this.renderInput("phone", "Phone Number")}
                {this.renderButton("Buy Now")}
            </form>
           
            </div> );
        } else 
        return ( <p>Cart is Empty</p>)
    }
}
 
export default PaymentForm;