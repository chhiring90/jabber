import React, { Component } from 'react';
import uuid from 'react-uuid';
import { connect } from 'react-redux';

import { FormSection, FormContainer, FormGraphic } from '../hoc/FormLayout';
import LoginForm from '../components/LoginForm';
import * as actions from '../stores/actions/index';

class Login extends Component {

    state = {
        // isAuthenticated: false
        formData: {
            email: {
                key: `${uuid()}`,
                label: "Your Email",
                elementType: 'input',
                value: '',
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email",
                    id: "email",
                    name: "email",
                },
                validation: {
                    require: true,
                    isEmail: true
                }
            },
            password: {
                key: `${uuid()}`,
                elementType: 'input',
                label: 'Password',
                value: '',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    id: 'password',
                    name: 'password',
                },
                validation: {
                    require: true,
                }
            },
            checkbox: {
                key: `${uuid()}`,
                elementType: 'input',
                label: 'Remember me',
                value: '',
                elementConfig: {
                    type: 'checkbox',
                    id: 'checkbox',
                    name: 'checkbox'
                },
                validation: {
                    require: false,
                }
            }
        }
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
    }

    inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.formData,
            [controlName]: {
                ...this.state.formData[controlName],
                value: event.target.value
            }
        };

        this.setState({ formData: updateControls });
    }

    render() {
        return (
            <FormSection>
                <FormContainer>
                    <LoginForm
                        changed={this.inputChangeHandler}
                        loginData={this.state.formData} />
                </FormContainer>
                <FormGraphic></FormGraphic>
            </FormSection>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);