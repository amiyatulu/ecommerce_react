import React, { Component } from 'react';
import Joi from 'joi-browser';
import styles from './LoginForm.module.css';
import Form from '../Common/Form';
import auth from '../../services/authService';

class LoginForm extends Form {
    state = {
        data: { email: '', password: ''},
        errors: {}
    }

    schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required().label('Email'),
        password: Joi.string().required().label('Password')
    }

    
    
    doSubmit = async () => {
        try {
        const { data } = this.state;
        await auth.login(data.email, data.password);        
        window.location = '/';
            
        } catch (ex) {
            if (ex.response && ex.response.status === 400){
                const errors = { ...this.state.errors};
                const obj = ex.response.data;
                errors.email = obj[Object.keys(obj)[0]];
                this.setState({errors});
            }
            
        }
        
    }

    
    
    render() { 
        
        return ( <div className={styles.formclass}>
            <h2 className="alert alert-success">Login</h2>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('email', 'Email')}
                {this.renderInput('password', 'Password', "password")}
                { this.renderButton('Login')}
            </form>
        </div>  );
    }
}
 
export default LoginForm;