import React from 'react';

const UserStatusDot = ({ status }) => {

    let statusColor = [];

    switch (status) {
        case 'online':
            statusColor.push('bg-green-400 animate-ping-slow');
            break;
        case 'recentlyOnline':
            statusColor.push('bg-yellow-500');
            break;
        case 'inactive':
            statusColor.push('bg-gray-500');
            break;
        default: break;
    }

    return (
        <span className="flex h-4 w-4 top-0 left-0 absolute border-2 border-white bg-green-500 rounded-full">
            <span className={`absolute inline-flex h-3 w-3 rounded-full delay-300 opacity-75 ${statusColor.join(' ')}`}></span>
            <span className={`border-transparent border-2 relative delay-300 inline-flex rounded-full h-3 w-3 ${statusColor.join(' ')}`}></span>
        </span>
    )
}

export default UserStatusDot;