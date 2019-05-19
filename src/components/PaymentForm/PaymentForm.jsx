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
        dataAvailable: true,
        errors: {}
     }

     async loadProducts () {
        const productCart = JSON.parse(localStorage.getItem('productCart'));
        // console.log(productCart)
       
        if (Array.isArray(productCart) && productCart.length) {
            const ids =  productCart.map(function(element) {return element.id;})
            const {data} = await getProducts(ids);
            
            
            let products = data.productList
    
            let productIndex;
            productCart.forEach(function (item, index) {
                // console.log(item.id, index);
                productIndex = products.map(function(element) {return element.id;}).indexOf(item.id);
                // console.log(productIndex)
                products[productIndex].quantity = item.quantity
            });

            let price = 0;
            let p = 0;
            for( let i=0, len=products.length; i < len; i++){
                // console.log(products[i].id, "id")
                // console.log(products[i].quantity, "qunatity")
                // console.log(products[i].price, "price")
                p = products[i].quantity*products[i].price
                // console.log(p, "q*p")
                price += p;
                // console.log(price, "totalprice")
                
            }
            const paydata = {}
            paydata.purpose = "buy products"
            paydata.amount = price
            paydata.products = products
            this.setState({paydata})
            this.setState({dataAvailable: true })
        } else {
            this.setState({dataAvailable: false})

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
        
        if (Array.isArray(productCart) && productCart.length) {
            const newProductCart = productCart.filter(function(p) { return p.id !== id} )
            localStorage.setItem('productCart', JSON.stringify(newProductCart));
            this.loadProducts();
            
            // console.log(newProductCart)
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
        if (this.state.dataAvailable) {
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