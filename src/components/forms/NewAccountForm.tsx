
'use client'

import { FormEvent } from 'react';
import styles from "./NewAccountForm.module.css";
import { AccountData, newAccount } from "../../app/services/acc";

export default function NewAccountForm() {

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const formJson: AccountData = Object.fromEntries(formData.entries()) as unknown as AccountData;
        const newAccountResponse = newAccount(formJson);
        newAccountResponse.then((response) => {
            console.log(response);
            
            const status = response.response.status;
            console.log(response);
            
            if (status === 200){
                const receivedToken = response.responseData.token;
            } else if (status !== 200) {
                console.log(response.responseData.message)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className={styles.login_form}>
            <label htmlFor="name">Account Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="type">Account type</label>
            <input type="text" name="type" id="type" />
            <button value='submit'>Valider</button>
        </form>
    )
}