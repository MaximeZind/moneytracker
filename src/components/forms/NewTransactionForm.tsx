'use client'

import { FormEvent, useEffect, useState } from 'react';
import styles from "./NewAccountForm.module.css";
import { getAccounts } from "../../app/services/accounts";
import { Account, Category, Transaction } from '@/types/global';
import { getCategories } from '@/app/services/categories';
import { newTransaction } from '@/app/services/transactions';

export default function NewTransactionForm() {

    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isRecurring, setIsRecurring] = useState(false);

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
        const newTransactionResponse = newTransaction(data);
        newTransactionResponse.then((response) => {
            const status = response.response.status;
            console.log(response);
         if (status !== 200) {
                console.log(response.responseData.message)
            }
        })
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
                    <div className={styles.main_infos_right_type}>
                        <input type="radio" id="income" name="type" value="income" />
                        <label htmlFor="income">Income</label>
                        <input type="radio" id="expense" name="type" value="expense" />
                        <label htmlFor="expense">Expense</label>
                    </div>
                    <label htmlFor="accountId">Account</label>
                    <select name="accountId" id="accountId">
                        {
                            accounts && accounts.map((account: Account) => {
                                return (
                                    <option key={account.id} value={account.id}>{`${account.name} (${account.type})`}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="categoryId">Category</label>
                    <select name="categoryId" id="categoryId">
                        {
                            categories && categories.map((category: Category) => {
                                return (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )
                            })
                        }
                    </select>
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
                        <label htmlFor="frequencyAmount">Amount</label>
                        <input type="number" name="frequencyAmount" id="frequencyAmount" />
                        <select name="frequencyUnit" id="frequencyUnit">
                            <option value="days">Days</option>
                            <option value="months">Months</option>
                            <option value="years">Years</option>
                        </select>
                    </div>
                }
            </div>
            <button value='submit'>Create A new transaction</button>
        </form>
    )
}