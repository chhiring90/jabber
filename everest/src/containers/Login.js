import React, { Component } from 'react';
import uuid from 'react-uuid';

import { FormSection, FormContainer, FormGraphic } from '../hoc/FormLayout';
import LoginForm from '../components/LoginForm';

export default class Login extends Component {

    state = {
        // isAuthenticated: false
        formData: {
            email: {
                key: `${uuid()}`,
                elementType: 'input',
                type: "email",
                placeholder: "Your Email",
                id: "email",
                name: "email",
                label: "Your Email",
                require: true,
                value: '',
            },
            password: {
                key: `${uuid()}`,
                elementType: 'input',
                type: 'password',
                placeholder: 'Password',
                id: 'password',
                name: 'password',
                label: 'Password',
                require: false,
                value: '',
            },
            checkbox: {
                key: `${uuid()}`,
                elementType: 'input',
                type: 'checkbox',
                id: 'checkbox',
                name: 'checkbox',
                label: 'Remember me',
                require: false,
                value: ''
            }
        }
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
    }

    onChangeHandler = (event) => {

    }

    render() {
        return (
            <FormSection>
                <FormContainer>
                    <LoginForm
                        changed={(event) => this.onChangeHandler}
                        loginData={this.state.formData} />
                </FormContainer>
                <FormGraphic></FormGraphic>
            </FormSection>
        )
    }
}