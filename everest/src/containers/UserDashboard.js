import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../stores/actions/index';
import Navbar from '../components/Navbar';
import Chats from './Chats';
import Messages from './Messages';

class UserDashboard extends Component {

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.pros.setAuthPathRedirect();
        }
    }

    render() {
        let redirect;

        if (!this.props.isAuthenticated) {
            redirect = <Redirect to={this.props.redirectPath} />
        }

        return (
            <>
                {redirect}
                <main className="flex max-w-full w-full">
                    <aside className="flex-none w-2/12">
                        <Navbar />
                    </aside>
                    <section className="flex-none w-4/12 px-8 pt-7">
                        <Chats />
                    </section>
                    <section className="flex-none w-6/12 pr-8 pt-7">
                        <Messages />
                    </section>
                </main>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthPathRedirect: dispatch(actions.setAuthPathRedirect('/signup'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);