import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { connect } from 'react-redux';
import socket from '../socket';

import axios from '../axios-api';
import Chat from '../components/Chat';
import Button from '../components/Button';
import Input from '../components/Input';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import * as action from '../stores/actions/index';

class Chats extends Component {

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    state = {
        searchbar: {
            elementType: 'input',
            value: '',
            elementConfig: {
                type: 'text',
                id: 'search-bar',
                name: 'search-bar',
                placeholder: 'Search'
            },
            validation: {
                require: false,
            },
            valid: false,
            touched: false
        }
    }

    componentDidMount() {
        socket.connect();
        this.props.fetchUser(this.props.currentUserId);

    }

    componentDidUpdate(prevProps, prevState) {
        // if (this.props.activeRoom === prevProps.activeRoom) return;
        // console.log(this.props, '[CURRENTPROPS] [CHATS]');
        // console.log(prevProps, '[PREVPROPS] [CHATS]');
    }

    clickHandler(event, slug) {
        event.preventDefault();
        let roomSlug = `${slug}&${this.props.user.slug}`;
        let name, admin;
        if (!name || !admin) {
            name = `${slug} ${this.props.user.slug}`.split('-').join(' ').toUpperCase();
            admin = undefined;
        }

        const roomInfo = {
            userId: this.props.user._id,
            name,
            admin,
            slug: roomSlug,
        }

        // this.props.sendCreateRoom(roomInfo);
        socket.emit('createroom', roomInfo);
        socket.on('createdroom', (room) => this.props.createdRoom(room, slug));
    }

    componentWillUnmount() {
        socket.disconnect();
    }

    render() {
        const chats = this.props.users.map(user => {
            return <Chat
                clicked={(event) => this.clickHandler(event, user.slug)}
                active={user.slug === this.props.activeUser}
                key={user._id}
                status={`${user.active ? "online" : 'inactive'}`}
                name={user.name}
            />
        });

        return (
            <>
                <div className="flex mb-5 flex-wrap" key="chat-wrapper">
                    <div className="flex-auto w-3/5 font-semibold tracking-wider">
                        <h2 className="text-4xl font-bold">Chats</h2>
                        <p>Recent Chats</p>
                    </div>
                    <div className="flex-auto w-3/12">
                        <Button buttonType="button" >
                            <AiOutlinePlus className="mr-2 w-5 h-5" />
                            New Room
                        </Button>
                    </div>
                    <form className="w-full flex flex-full pt-5">
                        <Input
                            changed={(e) => e.target.value}
                            additionalClass="h-16 text-lg px-5 shadow-chat"
                            elementType={this.state.searchbar.elementType}
                            value={this.state.searchbar.value}
                            elementConfig={this.state.searchbar.elementConfig}
                            shouldValidate={this.state.searchbar.elementType}
                            invalid={!this.state.searchbar.valid}
                            touched={this.state.searchbar.touched}
                            fullWidth={true}
                        />
                        <div className="flex pl-2">
                            <Button customClass="shadow-chat bg-brand-primary focus:outline-none text-white h-16 bg-white rounded-md px-5 py-4 text-lg">
                                <AiOutlineSearch className="w-7 h-7" />
                            </Button>
                        </div>
                    </form>
                </div>
                <SimpleBar className="max-height">
                    {chats}
                </SimpleBar>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.chat.users,
        user: state.auth.user,
        currentUserId: state.auth.user._id,
        activeRoom: state.chat.activeChat.room
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (currentUserId) => dispatch(action.fetchUser(currentUserId)),
        joinedServer: (userId) => dispatch(action.joinedServer(userId)),
        createdRoom: (room, slug) => dispatch(action.createdRoom(room, slug)),
        sendCreateRoom: (room) => dispatch(action.sendCreateRoom(room)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);