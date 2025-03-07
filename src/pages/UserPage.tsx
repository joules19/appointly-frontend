import React from 'react';
import UserBooking from '../components/UserBooking';

const UserPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4"></h1>
            <UserBooking />
        </div>
    );
};

export default UserPage;