import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleBar from 'simplebar-react';
// import ScrollToBottom from 'react-scroll-to-bottom';
import 'simplebar/dist/simplebar.min.css';
import axios from '../axios-api';
import socket from '../socket';

import Avatar from '../components/Avatar';
import Message from '../components/Message';
import Input from '../components/Input';
import { AiFillFileImage, AiOutlineSend } from 'react-icons/ai';
import Button from '../components/Button';
import * as actions from '../stores/actions/index';
const scrollBottomRef = React.createRef();
class Messages extends Component {

    constructor(props) {
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    state = {
        messages: [],
        formData: {
            imageUpload: {
                elementType: 'input',
                value: '',
                label: <AiFillFileImage className="w-6 h-6 text-white" />,
                elementConfig: {
                    id: 'image-upload',
                    name: 'image-upload',
                    type: 'file'
                },
                validation: {
                    required: false,
                },
                valid: false,
                touched: false
            },
            textarea: {
                elementType: 'textarea',
                value: '',
                elementConfig: {
                    placeholder: 'Type a message here',
                    id: 'textarea',
                    name: 'textarea',
                    type: 'textarea'
                },
                validation: {
                    required: false,
                },
                valid: false,
                touched: false
            },
        },
    }

    componentDidMount() {
        socket.connect();
        socket.on('connect', this.props.socketConnect(this.props.user));
        socket.emit('joinroom', { room: this.props.roomId, user: this.props.user });
        // socket.on('messagesend', (message) => console.log(message, '[MESSAGESEND]'));
        socket.on('messagesend', (message) => {
            const oldMessages = this.state.messages;
            let updateMessages = oldMessages.concat(message);
            this.setState({ messages: updateMessages });
        });
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillUnmount() {
        socket.disconnect();
        this.setState({messages: []});
    }

    onChangeHandler(event, controlName) {
        const updatedFormData = {
            ...this.state.formData,
            [controlName]: {
                ...this.state.formData[controlName],
                value: event.target.value
            }
        };

        this.setState({ formData: updatedFormData });
    }

    clearInputValues() {
        const formObjKey = Object.keys(this.state.formData).map(key => key);
        const formData = { ...this.state.formData };
        formObjKey.forEach(el => formData[el].value = '');
        this.setState({ formData });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        const { imageUpload, textarea } = this.state.formData;

        const filterValue = [imageUpload, textarea].filter(el => el.value !== '');
        let parentMessageId = undefined;

        if (filterValue.length !== 0) {
            socket.emit('message', {
                messageBody: filterValue[0].value,
                creator: this.props.user._id,
                parentMessage: parentMessageId,
                recipientRoom: window.location.search.split('=')[1]
            });
        }
        this.clearInputValues();
        event.target.reset();
    }

    scrollToBottom() {
        if(scrollBottomRef.current){
            scrollBottomRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            })
        }
    }

    render() {
        const inputClass = {
            textarea: 'border-none rounded-none px-4 py-7 resize-none max-h-20 h-20 focus:ring-opacity-0 focus:ring-offset-0 font-semibold bg-white text-brand-gray',
            file: {
                wrap: 'flex-auto',
            }
        }

        const messageForm = Object.keys(this.state.formData)
            .map(inputKey => [...Array(this.state.formData[inputKey])]
                .map(input => {
                    return <Input
                        key={inputKey}
                        value={input.value}
                        changed={(event) => this.onChangeHandler(event, inputKey)}
                        additionalWrapClass={inputKey === 'textarea' ? inputClass.file.wrap : null}
                        additionalClass={inputKey === 'textarea' ? inputClass.textarea : null}
                        elementType={input.elementType}
                        elementConfig={input.elementConfig}
                        label={input.label}
                        invalid={!input.valid}
                        require={input.require}
                        shouldValidate={input.validation}
                        touched={input.touched} />
                }))
            .reduce((acc, el) => acc.concat(el), []);

        const messages = this.state.messages.map((msg, i) => {
            let currentUser = null;
            if (msg.creator === 'jabber-admin') {
                currentUser = msg.creator;
            }

            return <Message
                key={i}
                messageBody={msg.messageBody}
                userCurrent={currentUser ? currentUser : this.props.user._id === msg.creator} />;
        });

        return (
            <div className="flex flex-wrap w-100 shadow-message">
                <div className="bg-brand-gray-200 border-brand-gray-400 border-b-2 flex-full px-6 pt-6 pb-3">
                    <Avatar size="medium" typing={false}
                        name={this.props.activeRoomUser.name}
                    />
                </div>
                <SimpleBar className="flex-full h-message max-h-message p-5">
                    {this.state.messages ? messages : null}
                    <div ref={scrollBottomRef} className="h-0.5" />
                </SimpleBar>
                <div className="border-brand-gray-400 border-t-2 flex-full">
                    <form
                        className="flex flex-wrap even:flex-grow-1 bg-white px-4"
                        onSubmit={(event) => this.onSubmitHandler(event)}>
                        {messageForm}
                        <div className="flex items-center justify-center">
                            <Button
                                type="submit"
                                customClass="rounded-full shadow-send transform -rotate-45 bg-brand-primary flex justify-center align-center w-10 h-10 items-center focus:outline-none ">
                                <AiOutlineSend className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        // roomId: state.chat.room._id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        socketConnect: (user) => dispatch(actions.socketConnect(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);