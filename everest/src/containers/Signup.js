import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import { Redirect } from 'react-router-dom';

import { FormSection, FormContainer, FormGraphic } from '../hoc/FormLayout';
import AuthForm from '../components/AuthForm';
import * as actions from '../stores/actions/index';
import { checkValidation, clearInputValues } from '../shared/utilty';

class SignUp extends Component {

    state = {
        // isAuth: false
        formData: {
            name: {
                key: `${uuid()}`,
                label: 'Your Name',
                elementType: 'input',
                value: '',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                    id: 'name',
                    name: 'name',
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                key: `${uuid()}`,
                label: 'Your Email',
                elementType: 'input',
                value: '',
                elementConfig: {
                    placeholder: 'Your Email',
                    type: 'email',
                    id: 'email',
                    name: 'email',
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
                label: 'Password',
                elementType: 'input',
                value: '',
                elementConfig: {
                    placeholder: 'Password',
                    type: 'password',
                    id: 'password',
                    name: 'password'
                },
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
            passwordConfirm: {
                key: `${uuid()}`,
                elementType: 'input',
                label: 'Password Confirm',
                value: '',
                elementConfig: {
                    placeholder: 'Password Confirm',
                    id: 'password-confirm',
                    name: 'password-confirm',
                    type: 'password',
                },
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        formTitle: {
            title: 'Create Account',
            link: '/login',
            linkContent: "Login",
            children: 'Already have an account ? '
        },
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const { name, email, password, passwordConfirm } = this.state.formData;
        this.props.onSignUp(name.value, email.value, password.value, passwordConfirm.value);
        this.setState({
            formData: clearInputValues(this.state.formData)
        });
        // event.target.reset();
    }

    inputChangeHandler = (event, controlName) => {
        const isCheckGroup = ['checkbox', 'radio'].includes(event.target.type);

        const updateControls = {
            ...this.state.formData,
            [controlName]: {
                ...this.state.formData[controlName],
                value: isCheckGroup ? event.target.checked : event.target.value,
                valid: checkValidation(event.target.value, this.state.formData[controlName].validation),
                touched: true
            }
        }

        this.setState({ formData: updateControls });
    };

    componentDidMount() {
        if (this.props.isAuthenticated && !['/signup', '/login'].includes(this.props.authRedirectPath)) {
            this.props.setAuthPathRedirect();
        }
    }

    componentWillUnmount() {
        // this.clearInputValues(this.state);
    }

    render() {
        let renderComponent = (
        <FormSection>
            <FormContainer>
                <AuthForm
                    changed={this.inputChangeHandler}
                    formData={this.state.formData}
                    submit={this.onSubmitHandler}
                    isLoading={this.props.isLoading}
                    message={this.props.message}
                    formTitle={this.state.formTitle} />
            </FormContainer>
            <FormGraphic></FormGraphic>
        </FormSection>
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
        isAuthenticated: state.auth.isAuthenticated,
        message: state.auth.message.signup,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (name, email, password, passwordConfirm) => dispatch(actions.signup(name, email, password, passwordConfirm)),
        setAuthPathRedirect: () => dispatch(actions.setAuthPathRedirect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);