import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socket from '../socket';

import * as actions from '../stores/actions/index';
import Navbar from '../components/Navbar';
import Chats from './Chats';
import Messages from './Messages';


class UserDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentRoom: {
                user: null,
                currentRoomSlug: null,
                isSelect: false,
            }
        }

        this.clickHandler = this.clickHandler.bind(this);
        this.onLogoutHandler = this.onLogoutHandler.bind(this);
    }

    componentDidMount() {
        socket.connect();
        socket.on('connect', this.props.socketConnect(this.props.user));
        socket.on('joinedserver', (userId) => this.props.joinedServer(userId));
    }

    componentDidUpdate() {
        socket.on('joinedserver', (userId) => this.props.joinedServer(userId));
    }

    componentWillUnmount() {
        socket.off();
        if (!this.props.isAuthenticated) {
            this.props.setAuthPathRedirect();
        }
    }

    onLogoutHandler(e) {
        this.props.onLogout();
    }

    clickHandler(event, slug) {
        let roomSlug = `${slug}&${this.props.user.slug}`;
        let name;
        let admin;
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

        this.props.createRoom(roomInfo);
        // this.props.createdRoom();
        socket.on('createdroom', (roomId) => {
            window.history.pushState({}, null, `/chats/?room=${roomId}`);
        });
        const currentUser = [...this.props.users].filter(user => user.slug === slug);

        // this.setState({
        //     currentRoom: {
        //         user: currentUser[0],
        //         currentUser: roomSlug,
        //         isSelect: true
        //     }
        // });
    }

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
                    <Chats key="chat" clicked={this.clickHandler} />
                </section>
                <section className="flex-none w-6/12 pr-8 pt-7">
                    {this.state.currentRoom.isSelect ?
                        <Messages
                            activeRoomUser={this.state.currentRoom.user} />
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
        users: state.chat.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthPathRedirect: () => dispatch(actions.setAuthPathRedirect('/signup')),
        onLogout: () => dispatch(actions.logout()),
        socketConnect: (user) => dispatch(actions.socketConnect(user)),
        joinedServer: (userId) => dispatch(actions.joinedServer(userId)),
        fetchUser: (currentUserId) => dispatch(actions.fetchUser(currentUserId)),
        createRoom: (room) => dispatch(actions.createRoom(room)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);