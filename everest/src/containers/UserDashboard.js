import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socket from '../socket';
// import axios from '../axios-api';

import * as actions from '../stores/actions/index';
import Navbar from '../components/Navbar';
import Chats from './Chats';
import Messages from './Messages';

class UserDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeUser: null
        }

        this.onLogoutHandler = this.onLogoutHandler.bind(this);
    }

    componentDidMount() {
        socket.connect();
        socket.on('connect', this.props.socketConnect(this.props.user));
        socket.on('joinedserver',(userId) => this.props.joinedServer(userId));
        socket.on('disconnectserver', (userId) => this.props.disconnectServer(userId));
    }

    componentDidUpdate() {
        // socket.on('joinedserver', (userId) => this.props.joinedServer(userId));
    }

    componentWillUnmount() {
        socket.disconnect();
        if (!this.props.isAuthenticated) {
            this.props.setAuthPathRedirect();
        }
    }

    onLogoutHandler(e) {
        this.props.onLogout();
    }

    // clickHandler(event, slug) {
    //     let roomSlug = `${slug}&${this.props.user.slug}`;
    //     let name, admin;
    //     if (!name || !admin) {
    //         name = `${slug} ${this.props.user.slug}`.split('-').join(' ').toUpperCase();
    //         admin = undefined;
    //     }

    //     const roomInfo = {
    //         userId: this.props.user._id,
    //         name,
    //         admin,
    //         slug: roomSlug,
    //     }
    //     console.log('CLICKED');
    //     this.props.sendCreateRoom(roomInfo);
    //     socket.on('createdroom', (roomId) => this.props.createdRoom(roomId));
    //     let activeUser = this.props.users.filter(user => user.slug === slug);
    //     this.setState({
    //         activeUser: activeUser[0]
    //     });
    // }

    render() {
        let { name } = this.props.user;
        let renderComponent = (
            <main className="flex max-w-full w-full">
                <aside className="flex-none w-2/12">
                    <Navbar
                        onLogout={(e) => this.onLogoutHandler(e)}
                        name={name}
                    />
                </aside>
                <section className="flex-none w-4/12 px-8 pt-7">
                    <Chats
                        activeUser={this.state.activeUser ? this.state.activeUser.slug : null}
                        />
                </section>
                <section className="flex-none w-6/12 pr-8 pt-7">
                    {this.props.activeChat.user ?
                        <Messages
                            activeRoomUser={this.props.activeChat.user} />
                        : null}
                </section>
            </main>
        );

        if (!this.props.isAuthenticated) {
            renderComponent = <Redirect to={this.props.redirectPath} />
        }

        return renderComponent;
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        users: state.chat.users,
        room: state.chat.room,
        activeChat: state.chat.activeChat
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthPathRedirect: () => dispatch(actions.setAuthPathRedirect('/signup')),
        onLogout: () => dispatch(actions.logout()),
        socketConnect: (user) => dispatch(actions.socketConnect(user)),
        joinedServer: (userId) => dispatch(actions.joinedServer(userId)),
        disconnectServer: (userId) => dispatch(actions.disconnectServer(userId)),
        fetchUser: (currentUserId) => dispatch(actions.fetchUser(currentUserId)),
        sendCreateRoom: (room) => dispatch(actions.sendCreateRoom(room)),
        createdRoom: (roomId) => dispatch(actions.createdRoom(roomId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);