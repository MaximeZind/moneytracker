'use client'

import { FormEvent, useEffect, useState } from 'react';
import styles from "./NewAccountForm.module.css";
import { AccountData, getAccounts, newAccount } from "../../app/services/Accounts";
import { Account } from '@/types/global';

export default function NewTransactionForm() {

    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        const fetchAccounts = async () => {
            await getAccounts().then((response) => {
                console.log(response);
                setAccounts(response);
            });
        }
        fetchAccounts();
    },[])

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        // event.preventDefault();
        // const contactForm = event.target as HTMLFormElement;
        // const formData = new FormData(contactForm);
        // const formJson: AccountData = Object.fromEntries(formData.entries()) as unknown as AccountData;
        // const newAccountResponse = newAccount(formJson);
        // newAccountResponse.then((response) => {
        //     const status = response.response.status;
        //     console.log(response);

        //     if (status === 200){
        //         const receivedToken = response.responseData.token;
        //     } else if (status !== 200) {
        //         console.log(response.responseData.message)
        //     }
        // })
    }

    return (
        <form onSubmit={handleSubmit} className={styles.login_form}>
            <div className={styles.main_infos}>
                <div className={styles.main_infos_left}>
                    <label htmlFor="date">Date of the transaction</label>
                    <input type="date" name="date" id="date" />
                    <label htmlFor="amount">Amount</label>
                    <input type="number" name="amount" id="amount" />
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" />
                </div>
                <div className={styles.main_infos_right}>
                    <div className={styles.main_infos_right_income_or_debit}>
                        <p>Income</p>
                        <p>Debit</p>
                    </div>
                    <label htmlFor="account">Account</label>
                    <select name="account" id="account">
                        {
                            accounts && accounts.map((account: Account) => {
                                return (
                                    <option key={account.id} value="dog">{`${account.name} (${account.type})`}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="type">Account type</label>
                    <input type="text" name="type" id="type" />
                </div>
            </div>

            <button value='submit'>Valider</button>
        </form>
    )
}