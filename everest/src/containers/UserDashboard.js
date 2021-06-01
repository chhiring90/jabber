import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import Chats from './Chats';

class UserDashboard extends Component {
    render() {
        return (
            <main className="flex max-w-full w-full">
                <aside className="flex-none w-2/12">
                    <Navbar />
                </aside>
                <section className="flex-none w-5/12 p-12">
                    <Chats />
                </section>
            </main>
        )
    }
}

export default UserDashboard;