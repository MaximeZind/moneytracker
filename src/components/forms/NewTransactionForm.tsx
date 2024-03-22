'use client'

import { FormEvent, useEffect, useState } from 'react';
import styles from "./NewTransactionForm.module.css";
import { getAccounts } from "../../app/services/Accounts";
import { Account, Category, Transaction } from '@/types/global';
import { getCategories } from '@/app/services/categories';
import { newTransaction } from '@/app/services/transactions';
import TextInput from './formscomponents/TextInput';
import SelectInput from './formscomponents/SelectInput';

export default function NewTransactionForm() {


    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isRecurring, setIsRecurring] = useState(false);

    console.log(categories);
    useEffect(() => {
        const fetchAccounts = async () => {
            await getAccounts().then((response) => {
                setAccounts(response);
            });
        }

        const fetchCategories = async () => {
            await getCategories().then((response) => {
                console.log(response);
                setCategories(response);
            });
        }
        fetchAccounts();
        fetchCategories();

    }, [])

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const contactForm = event.target as HTMLFormElement;
        const formData = new FormData(contactForm);
        formData.set('recurring', isRecurring.toString());
        const formJson = Object.fromEntries(formData.entries()) as unknown as Transaction;
        const data = {
            date: new Date(formJson.date),
            amount: Number(formJson.amount),
            description: formJson.description,
            type: formJson.type,
            accountId: formJson.accountId,
            categoryId: formJson.categoryId,
            recurring: isRecurring,
            frequencyAmount: Number(formJson.frequencyAmount),
            frequencyUnit: formJson.frequencyUnit,
        }
        console.log(data);

        const newTransactionResponse = newTransaction(data);
        newTransactionResponse.then((response) => {
            const status = response.response.status;
            console.log(response);
            if (status !== 200) {
                console.log(response.responseData.message)
            }
        })
    }

    const frequencyUnits = ["Days", "Months", "Years"];

    return (
        <form onSubmit={handleSubmit} className={styles.new_transaction_form}>
            <div className={styles.main_infos}>
                <div className={styles.main_infos_left}>
                    <label htmlFor="date">Date of the transaction</label>
                    <input type="date" name="date" id="date" className={styles.date_input} />
                    <TextInput
                        name='amount'
                        type='number'
                        label='Amount' />
                    <TextInput
                        name='description'
                        type='text'
                        label='Description' />
                </div>
                <div className={styles.main_infos_right}>
                    <div className={styles.main_infos_right_type}>
                            <p>Transaction type</p>
                            <div className={styles.transaction_type_option}>
                                <input type="radio" id="income" name="type" value="income" />
                                <label htmlFor="income">Income</label>
                            </div>
                            <div className={styles.transaction_type_option}>
                                <input type="radio" id="expense" name="type" value="expense" />
                                <label htmlFor="expense">Expense</label>
                            </div>
                    </div>
                    <SelectInput name="accountId" label='Account' options={accounts} />
                    <SelectInput name="categoryId" label='Category' options={categories} />
                </div>
            </div>
            <div className={styles.recurring}>
                <div className={styles.recurring_checkbox}>
                    <input type="checkbox" id="recurring" name="recurring" value="true" onClick={() => setIsRecurring(!isRecurring)} />
                    <label htmlFor="recurring">Recurring</label>
                </div>
                {isRecurring &&
                    <div className={styles.recurring_frequency}>
                        <p>Every</p>
                        <TextInput name="frequencyAmount" type='number' label='Amount' />
                        <SelectInput name="frequencyUnit" label='Unit' options={frequencyUnits} />
                    </div>
                }
            </div>
            <button value='submit'>Create A new transaction</button>
        </form>
    )
}