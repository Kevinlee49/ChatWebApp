// "use client" - 이거 없애줘야함.
// import { signOut } from 'next-auth/react';
import EmptyState from '../components/EmptyState';

const Users = () => {
    return (
        <div className="hidden lg:block lg:pl-80 h-full">
            <EmptyState />
        </div>
    );
}

export default Users;
