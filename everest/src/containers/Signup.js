import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';

import { FormSection, FormContainer, FormGraphic } from '../hoc/FormLayout';
import SignupForm from '../components/SignupForm';
import * as actions from '../stores/actions/index';
import { updateObject, checkValidation } from '../shared/utilty';

class SignUp extends Component {

    state = {
        // isAuthenticated: false
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
        }
    }

    // clearInputValues(state) {
    //     const prevFormData = { ...state.formData };
    //     const emptyValues = Object.keys(prevFormData)
    //         .map(key => {
    //             ...prevFormData[key], 
    //             [key].value: ''}
    //             );

    //     this.setState({ formData: emptyValues });
    // }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const { name, email, password, passwordConfirm } = this.state.formData;
        this.props.onSignUp(name.value, email.value, password.value, passwordConfirm.value);

        // this.clearInputValues(this.state);
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

    componentWillUnmount() {
        // this.clearInputValues(this.state);
    }

    render() {
        return (
            <FormSection>
                <FormContainer>
                    <SignupForm
                        changed={this.inputChangeHandler}
                        signupData={this.state.formData}
                        submit={this.onSubmitHandler}
                        isLoading={this.props.isLoading}
                        message={this.props.message} />
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
        isAuthenticated: state.auth.isAuthenticated,
        message: state.auth.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (name, email, password, passwordConfirm) => dispatch(actions.signup(name, email, password, passwordConfirm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);