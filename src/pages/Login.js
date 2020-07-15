import React from 'react';
import { Redirect } from 'react-router';

const LoginPage = ({ url, user, authenticated}) => {
    const loginGoog = () => {
        window.open(`${url}/auth/google`, "_self");
    }
    const login = (e) => {
        e.preventDefault();
        // const data = new FormData(e.target);
        const data = `username=${e.target.username.value}&password=${e.target.password.value}&code=${e.target.code.value}`;
        console.log(data);
        fetch('http://192.168.1.89:8000/auth/login', {
            method: 'POST',
            credentials: 'include',
            body: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
                "Access-Control-Allow-Credentials": true
            },
        })
        .then(results => results.json())
        .then(body => {
            console.log(body);
            if (body.message === 'Success') {
                console.log('success');
            } else {
                console.log('fail');
            }
        })
    }
    if (authenticated) {
        return (<Redirect to='/profile' />);
    }
    return (
        <>
            {/* <form action='http://192.168.1.89:8000/auth/login' method='POST'> */}
            <form onSubmit={login}>
                <input type='text' name='username' />
                <input type='password' name='password' />
                <input type='password' name='code' />
                <button type='submit'>Submit</button>
            </form>
            <button onClick={loginGoog}>Google</button>
        </>
    )
}

export default LoginPage;