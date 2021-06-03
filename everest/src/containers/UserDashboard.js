import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import Chats from './Chats';
import Messages from './Messages';

class UserDashboard extends Component {
    render() {
        return (
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
        )
    }
}

export default UserDashboard;