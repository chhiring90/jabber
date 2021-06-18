import React, { Component } from 'react';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { FormSection, FormContainer, FormGraphic } from '../hoc/FormLayout';
import AuthForm from '../components/AuthForm';
import Dialog from '../components/Dialog';
import * as actions from '../stores/actions/index';
import { checkValidation, clearInputValues } from '../shared/utilty';

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
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
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
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
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
                    required: false,
                },
                valid: false,
                touched: false
            }
        },
        formTitle: {
            title: 'Log In',
            link: '/signup',
            linkContent: "Create an account",
            children: 'Not registered yet ? '
        },
        isLoginForm: true,
    }

    formSubmitHandler = (event) => {
        event.preventDefault();

        const { email, password } = this.state.formData;
        this.props.onLogin(email.value, password.value);
        this.setState({
            formData: clearInputValues(this.state.formData)
        });
        // event.target.reset();
    }

    inputChangeHandler = (event, controlName) => {
        const isCheckGroup = ['checkbox', 'radio'].includes[event.target.type];
        const updatedFormData = {
            ...this.state.formData,
            [controlName]: {
                ...this.state.formData[controlName],
                value: isCheckGroup ? event.target.checked : event.target.value,
                valid: checkValidation(event.target.value, this.state.formData[controlName].validation),
                touched: true
            }
        };

        this.setState({ formData: updatedFormData });
    }

    componentDidMount() {
        if (this.props.isAuthenticated && !['/signup', '/login'].includes(this.props.authRedirectPath)) {
            this.props.setAuthPathRedirect();
        }
        // console.log(this.props.message);
    }

    componentWillUnmount() {
    }

    render() {
        let renderComponent = (
            <>
                <FormSection>
                    <FormContainer>
                        <AuthForm
                            changed={this.inputChangeHandler}
                            formData={this.state.formData}
                            submit={this.formSubmitHandler}
                            message={this.props.message}
                            isLoading={this.props.isLoading}
                            formTitle={this.state.formTitle}
                            isLoginForm={this.state.isLoginForm} />
                    </FormContainer>
                    <FormGraphic></FormGraphic>
                </FormSection>
            </>
        );

        if (this.props.isAuthenticated && !['/signup', '/login'].includes(this.props.authRedirectPath)) {
            renderComponent = <Redirect to={this.props.authRedirectPath} />
        }

        return renderComponent;
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.loading,
        error: state.auth.error,
        message: state.auth.message.login,
        authRedirectPath: state.auth.authRedirectPath,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password)),
        setAuthPathRedirect: () => dispatch(actions.setAuthPathRedirect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);