import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../stores/actions/index';
import Navbar from '../components/Navbar';
import Chats from './Chats';
import Messages from './Messages';

class UserDashboard extends Component {

    componentWillUnmount(){
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
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthPathRedirect: () => dispatch(actions.setAuthPathRedirect('/signup')),
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);