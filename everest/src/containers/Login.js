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
                value: false,
                checked: true,
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

        const { email, password } = this.state.formData;
        this.props.onLogin(email.value, password.value);
    }

    inputChangeHandler = (event, controlName) => {
        const isCheckGroup = ['checkbox', 'radio'].includes[event.target.type];
        let checkboxValue = event.target.checked ? 'true' : 'false';

        let value = isCheckGroup ? checkboxValue : event.target.value;

        const updateControls = {
            ...this.state.formData,
            [controlName]: {
                ...this.state.formData[controlName],
                value
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
                        loginData={this.state.formData}
                        submit={this.formSubmitHandler}
                        message={this.props.message}
                        isLoading={this.props.isLoading} />
                </FormContainer>
                <FormGraphic></FormGraphic>
            </FormSection>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.loading,
        error: state.auth.error,
        message: state.auth.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);