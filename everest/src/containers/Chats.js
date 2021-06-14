import React, { Component } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { connect } from 'react-redux';
import socket from '../socket';

import Chat from '../components/Chat';
import Button from '../components/Button';
import Input from '../components/Input';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import * as action from '../stores/actions/index';

class Chats extends Component {

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

    componentDidUpdate() {
        socket.on('joinedserver', (userId) => this.props.fetchUser(userId));
    }

    componentDidMount() {
        this.props.fetchUser(this.props.currentUserId);
        if(!this.props.currentUserId) return;
    }

    componentWillUnmount() {
        socket.disconnect();
    }

    render() {
        const chats = this.props.users.map(user => {
            return <Chat
                clicked={(event, slug) => this.props.clicked(event, user.slug)}
                active={user.slug === this.props.activeUser}
                key={user._id}
                status={`${user.active ? "online" : 'offline'}`}
                name={user.name}
            />
        });

        return (
            <>
                <div className="flex mb-5 flex-wrap">
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
        currentUserId: state.auth.user._id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (currentUserId) => dispatch(action.fetchUser(currentUserId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);