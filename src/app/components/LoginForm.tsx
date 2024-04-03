'use client'

import styles from "./LoginForm.module.css";
import { FormEvent } from 'react';

export default function Login() {

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
            <button value='submit'>Valider</button>
        </form>
    )
}
