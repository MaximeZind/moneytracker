'use client'

import Link from "next/link";
import styles from "./LoginForm.module.css";
import { FormEvent, useEffect, useState } from 'react';
import { LoginData, LoginUser } from '../../app/services/login';
import { redirect } from 'next/navigation'

export default function Login() {
    const [token, setToken] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const formJson: LoginData = Object.fromEntries(formData.entries()) as unknown as LoginData;
        const loginResponse = LoginUser(formJson);
        loginResponse.then((response) => {
            const status = response.response.status;
            if (status === 200){
                const receivedToken = response.responseData.token;
                setToken(receivedToken);
            } else if (status !== 200) {
                setErrorMsg(response.responseData.message)
            }
        })
    }

    //Auto redirect to dashboard if token exists
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
            {
                errorMsg && <p>{errorMsg}</p>
            }
            <button value='submit'>Valider</button>
            <p>You don&apos;t have an account yet? <Link href={"/signup"}>Sign Up!</Link></p>
        </form>
    )
}
