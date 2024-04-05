'use client'

import { deleteUsers } from "@/app/services/deleteUsers";
import { SignUpData, signUpUser } from "@/app/services/signup";
import { getUsers } from "@/app/services/users";
import styles from "./SignUpForm.module.css";
import { FormEvent } from 'react';

export default function SignUp() {


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const formJson: SignUpData = {
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };
        signUpUser(formJson);
    }

    function handleDeleteUsers(event: any) {
        event.preventDefault();
        deleteUsers();
    }

    async function handleGetUsers(event: any) {
        event.preventDefault();
        const users = await getUsers();
        console.log(users);
        
    }
    return (
        <>
            <form className={styles.submit_form} onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" />
                <button value='submit'>Valider</button>
            </form>
            <button onClick={handleDeleteUsers}>Delete Users</button>
            <button onClick={handleGetUsers}>Get Users</button>
        </>
    )
}
