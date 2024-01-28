'use client'

import Link from "next/link";
import styles from "./LoginForm.module.css";
import { FormEvent, useEffect, useState } from 'react';
import { LoginData, LoginUser } from '../services/login';
import { redirect } from 'next/navigation'

export default function Login() {
    const userToken = localStorage.getItem("token");
    const [token, setToken] = useState(userToken);
    console.log(token);
    
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const formJson: LoginData = Object.fromEntries(formData.entries()) as unknown as LoginData;

        const loginResponse = LoginUser(formJson);
        loginResponse.then((responseData) => {
            console.log(responseData);
            localStorage.setItem('token', responseData.token);
            setToken(responseData.token);
        })
    }

    useEffect(() => {
        if (token !== null) {
            redirect('/dashboard');
        }
    }, [token])

    return (
        <form onSubmit={handleSubmit} className={styles.login_form}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button value='submit'>Valider</button>
            <p>You don't have an account yet? <Link href={'/signup'}>Sign Up!</Link></p>
        </form>
    )
}
