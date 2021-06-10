import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import * as actions from '../stores/actions/index';
import Navbar from '../components/Navbar';
import Chats from './Chats';
import Messages from './Messages';

let socket;

class UserDashboard extends Component {

    componentDidMount(){
        const endpoint = process.env.REACT_APP_ENDPOINT_DEV || 'http://127.0.0.1:5000/';
        socket = io(endpoint, { 
            transports: ['websocket', 'polling', 'flashsocket'],
            autoConnect: false
        });

        socket.connect();
        socket.on('connect', () => {
            console.log('Socket connection on client successfully');
            const {_id, slug} = this.props.user;
            socket.emit('join', {_id,slug},
            err => {
                if(err){
                    console.log(err);
                }
            });
        });

        socket.on('joined', userId => {
            console.log(userId);
        });
    }

    componentWillUnmount(){
        socket.disconnect();
        if (!this.props.isAuthenticated) {
            this.props.setAuthPathRedirect();
        }
    }

    onLogoutHandler(e){
        this.props.onLogout();
    }

    render() {

        let {name} = this.props.user;

        let renderComponent = (
            <main className="flex max-w-full w-full">
                <aside className="flex-none w-2/12">
                    <Navbar 
                    onLogout={(e) => this.onLogoutHandler(e)}
                    name={name}
                    />
                </aside>
                <section className="flex-none w-4/12 px-8 pt-7">
                    <Chats />
                </section>
                <section className="flex-none w-6/12 pr-8 pt-7">
                    <Messages />
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthPathRedirect: () => dispatch(actions.setAuthPathRedirect('/signup')),
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);