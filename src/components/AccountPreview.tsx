'use client'

import styles from "./AccountPreview.module.css";
import Link from "next/link";
import { Transaction } from "@/types/global";
import { useEffect, useState } from "react";
import generateRecurringInstances from "../utils/transactions";
import SubmitButton from "../components/forms/formscomponents/SubmitButton";

interface Props {
    name: string;
    type: string;
    transactions?: Transaction[];
    id: string;
}

export default function AccountPreview({ name, type, transactions, id }: Props) {

    const [amount, setAmount] = useState(0);
    const [transactionList, setTransactionList] = useState(transactions);
    const currency = "$";

    useEffect(() => {
        function getAllTransactions(transactionItems: Transaction[]) {
            const allTransactions = transactionItems.flatMap((transaction) => {
                if (transaction.recurring === true && transaction.frequencyAmount && transaction.frequencyUnit && transaction.recurringEndingDate) {
                    return [transaction, ...generateRecurringInstances(transaction)];
                } else {
                    return [transaction];
                }
            }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            const allTransactionsUpToToday: Transaction[] = allTransactions
                .flatMap((transaction) => {
                    return new Date(transaction.date) <= new Date() ? [transaction] : [];
                });

            if (allTransactionsUpToToday.length > 0) {
                setTransactionList(allTransactionsUpToToday);
            } else {
                setTransactionList([]);
            }
        }
        transactions && getAllTransactions(transactions);
    }, [transactions])

    useEffect(() => {
        transactionList && setAmount(calculateTotalAmount(transactionList));
    }, [transactionList]);

    function calculateTotalAmount(items: Transaction[]) {
        let runningAmount = 0

        items?.map((item: Transaction) => {
            if (item.type === "income") {
                runningAmount = runningAmount + item.amount;
            } else if (item.type === "expense") {
                runningAmount = runningAmount - item.amount;
            }
        })
        return runningAmount;
    }

    const lastTransaction = transactionList?.at(-1);
    console.log(lastTransaction);

    let lastTransactionDate
    if (lastTransaction !== undefined) {
        lastTransactionDate = new Date(lastTransaction.date);
    }

    return (

        <div className={styles.account_preview}>
            <header className={styles.account_preview_header}>
                <h2 className={styles.account_preview_title}>{name}</h2>
                <p className={styles.account_preview_type}>Type: {type}</p>
            </header>
            <p className={styles.account_preview_amount}>{currency}{amount}</p>
            <div className={styles.account_preview_last_transaction}>
                <p>Last Transaction:</p>
                <div className={styles.account_preview_last_transactions_details}>
                    {
                        lastTransaction && lastTransaction.type === "income" ?
                            <p className={styles.income}>+{currency}{lastTransaction?.amount}</p>
                            :
                            <p className={styles.expense}>-{currency}{lastTransaction?.amount}</p>
                    }
                    {
                        lastTransactionDate !== undefined &&
                        <p>{`${lastTransactionDate.toDateString()}`}</p>
                    }
                </div>
            </div>
            <SubmitButton text="See Account" value="" url={`/dashboard/accounts/${id}`} />
        </div>
    )
}
