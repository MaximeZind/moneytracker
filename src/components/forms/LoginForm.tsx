'use client'

import Link from "next/link";
import styles from "./LoginForm.module.css";
import { FormEvent, useState } from 'react';
import { LoginData, LoginUser } from '../../app/services/login';
import TextInput from "./formscomponents/TextInput";
import SubmitButton from "./formscomponents/SubmitButton";

export default function Login() {
    const [errorMsg, setErrorMsg] = useState(null);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const formJson: LoginData = Object.fromEntries(formData.entries()) as unknown as LoginData;
        const loginResponse = LoginUser(formJson);
        loginResponse.then((response) => {
            const status = response.response.status;
            if (status !== 200) {
                setErrorMsg(response.responseData.message)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className={styles.login_form}>
            <TextInput name="username" type="text" label="Username" />
            <TextInput name="password" type="password" label="Password" />
            {
                errorMsg && <p>{errorMsg}</p>
            }
            <SubmitButton value='submit' text='Submit' />
            <p>You don&apos;t have an account yet? <Link href={"/signup"}>Sign Up!</Link></p>
        </form>
    )
}
