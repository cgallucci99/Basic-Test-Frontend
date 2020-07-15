import React from 'react';
import { Redirect } from "react-router-dom";

const ProfilePage = ({ url, user, authenticated}) => {
    if (authenticated) {
        return (<h1>Welcome, {user.name.first}</h1>)
    }
    return (<Redirect to='/login' />)
}

export default ProfilePage;