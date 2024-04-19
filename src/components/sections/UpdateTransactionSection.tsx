'use client'

import { FormEvent, useEffect, useState } from 'react';
import styles from "./UpdateTransactionSection.module.css";
import { getAccounts } from "../../app/services/accounts";
import { Account, Category, NewTransaction, Transaction } from '@/types/global';
import { getCategories } from '@/app/services/categories';
import { newTransaction, getTransaction } from '@/app/services/transactions';
import UpdateTransactionForm from '../forms/UpdateTransactionForm';

export default function UpdateTransactionSection({ transactionId }: { transactionId: string }) {

    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            await getAccounts().then((response) => {
                setAccounts(response);
            });
        }

        const fetchCategories = async () => {
            await getCategories().then((response) => {
                setCategories(response);
            });
        }

        const fetchTransaction = async () => {
            await getTransaction(transactionId).then((response) => {
                const transactionToUpdate = response.data;
                setTransaction(transactionToUpdate);
            });
        }
        fetchAccounts();
        fetchCategories();
        fetchTransaction();
    }, []);

    return (
        transaction &&
        <section className={styles.update_transaction_section}>
            <UpdateTransactionForm transaction={transaction} accounts={accounts} categories={categories}/>
        </section>
    )
}