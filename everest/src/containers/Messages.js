import React, {Component} from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Avatar from '../components/Avatar';
import Message from '../components/Message';
import Input from '../components/Input';
import { AiFillFileImage, AiOutlineSend } from 'react-icons/ai';
import Button from '../components/Button';

let socket;

class Messages extends Component {
    state = {
        messages: [],
        formData: {
            imageUpload: {
                elementType: 'input',
                value: '',
                label: <AiFillFileImage className="w-6 h-6 text-white"/>,
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
        let endpoint = process.env.REACT_APP_ENDPOINT_DEV || 'http://127.0.0.1:5000/';
        socket = io(endpoint, { 
            transports: ['websocket', 'polling', 'flashsocket'],
            autoConnect: false
        });

        socket.connect();
        socket.on('connect', () => {
            console.log('Socket connection on client successfully');
            let { id, slug } = this.props.user;
            socket.emit('join', {id, slug}, err => {
                if(err){
                    console.log(err);
                }
            });
        });

        socket.on('joined', ({}), err => {
            if(err){
                console.log(err);
            }
        });
    }

    componentWillUnmount() {
        socket.disconnect();
    }

    render() {
        let inputClass = {
            textarea: 'border-none rounded-none px-4 py-7 resize-none max-h-20 h-20 focus:ring-opacity-0 focus:ring-offset-0 font-semibold bg-white text-brand-gray',
            file: {
                wrap: 'flex-auto',
            },
        }

        return(
            <div className="flex flex-wrap w-100 shadow-message">
                <div className="bg-brand-gray-200 border-brand-gray-400 border-b-2 flex-full px-6 pt-6 pb-3">
                    <Avatar size="medium" typing={false} name="Nika Jerrardo"/>
                </div>
                <SimpleBar className="flex-full h-message max-h-message p-5">
                    <Message />
                </SimpleBar>
                <div className="border-brand-gray-400 border-t-2 flex-full">
                    <form className="flex flex-wrap even:flex-grow-1 bg-white px-4">
                        {Object.keys(this.state.formData)
                        .map(key => [...Array(this.state.formData[key])].map(input => {
                            return <Input
                            key={key}
                            additionalWrapClass={key === 'textarea'? inputClass.file.wrap : null}
                            additionalClass={key === 'textarea' ? inputClass.textarea : null}
                            elementType={input.elementType}
                            elementConfig={input.elementConfig}
                            label={input.label}
                            invalid={!input.valid}
                            require={input.require}
                            shouldValidate={input.validation}
                            touched={input.touched}
                            changed={event => event.target.value} />}
                            ))}
                            <div className="flex items-center justify-center">
                                <Button customClass="rounded-full shadow-send transform -rotate-45 bg-brand-primary flex justify-center align-center w-10 h-10 items-center focus:outline-none ">
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
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);