'use client'

import { FormEvent } from 'react';
import styles from "./NewAccountForm.module.css";
import { AccountData, newAccount } from "../../app/services/accounts";
import TextInput from './formscomponents/TextInput';
import Button from './formscomponents/SubmitButton';
import { useRouter } from 'next/navigation';

export default function NewAccountForm() {

    const router = useRouter();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        const formJson: AccountData = Object.fromEntries(formData.entries()) as unknown as AccountData;
        const newAccountResponse = newAccount(formJson);
        newAccountResponse.then((response) => {
            const status = response.response.status;             
            if (status === 200) {
                const accountId = response.response.data[0].id;
                router.push(`/dashboard/accounts/${accountId}`);
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