
'use client'

import { FormEvent } from 'react';
import styles from "./NewAccountForm.module.css";
import { AccountData, newAccount } from "../../app/services/accounts";
import TextInput from './formscomponents/TextInput';
import Button from './formscomponents/SubmitButton';

export default function NewAccountForm() {

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const formJson: AccountData = Object.fromEntries(formData.entries()) as unknown as AccountData;
        const newAccountResponse = newAccount(formJson);
        newAccountResponse.then((response) => {
            const status = response.response.status;
            if (status === 200) {
                console.log(response);
            } else if (status !== 200) {
                console.log(response.responseData.message)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className={styles.new_account_form}>
            <TextInput name="name" type="text" label="Account name" />
            <TextInput name="type" type="text" label="Account type" />
            <Button value="submit" text="Add" />
        </form>
    )
}