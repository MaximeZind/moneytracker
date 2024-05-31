'use client'

import { useState } from 'react';
import styles from "./TransactionsLayoutSection.module.css";
import CategoriesBox from '../CategoriesBox';
import TransactionsFilters from '../TransactionsFilters';
import { Category } from '@prisma/client';
import Button from '../forms/formscomponents/SubmitButton';
import { Account, Transaction } from '@/types/global';
import generateRecurringInstances from '@/utils/transactions';
import Table from '../table/Table';

interface TransactionsLayoutSectionProps {
    transactions: Transaction[];
    accounts: Account[];
    categories: Category[];
}


export default function TransactionsLayoutSection({ transactions, accounts, categories }: TransactionsLayoutSectionProps) {

    const [categoriesList, setCategoriesList] = useState<Category[]>(categories);
    const [transactionsList, setTransactionsList] = useState<Transaction[]>(sortTransactions(transactions));
    const [hiddenIndexes, setHiddenIndexes] = useState<number[]>([]);

    // Setting up the data for the transactions table
    function sortTransactions(transactions: Transaction[]) {
        const sortedTransactions = transactions.flatMap((transaction) => {
            if (transaction.recurring === true && transaction.frequencyAmount && transaction.frequencyUnit && transaction.recurringEndingDate) {
                return [transaction, ...generateRecurringInstances(transaction)];
            } else {
                return [transaction];
            }
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return sortedTransactions;
    }

    const tableHeaders = ["Month", "Date", "Description", "Category", "Income", "Debit", "Balance"];
    let tableData: { month: string; date: string; description: string; category: string; income: number; debit: number; type: string; id: string; }[] = []
    transactionsList.map((transaction) => {
        const monthName = new Date(transaction.date).toLocaleString('default', { month: 'long' })
        const dayNumber = new Date(transaction.date).getDate().toLocaleString().padStart(2, '0');
        const monthNumber = (new Date(transaction.date).getMonth() + 1).toLocaleString().padStart(2, '0');
        const yearNumber = new Date(transaction.date).getFullYear();
        const newObject = {
            month: `${monthName[0].toLocaleUpperCase()}${monthName.slice(1).toLocaleLowerCase()}`,
            date: `${monthNumber + "/" + dayNumber + "/" + yearNumber}`,
            description: `${transaction.description[0].toLocaleUpperCase()}${transaction.description.slice(1).toLocaleLowerCase()}`,
            category: transaction.category.name,
            income: transaction.type === "income" ? transaction.amount : 0,
            debit: transaction.type === "expense" ? transaction.amount : 0,
            type: transaction.type,
            id: transaction.id
        }
        tableData.push(newObject);
    });

    function refresh(list: Category[]) {
        setCategoriesList(list);
    }

    return (
        <div className={styles.transactions_layout}>
            <section className={styles.transactions_left_section}>
                <Button value='' text='Add Transaction' url='/dashboard/transactions/add' />
                <h1>Categories</h1>
                <CategoriesBox categories={categoriesList} refresh={refresh} />
            </section>
            <section className={styles.transactions_table}>
                <Table headers={tableHeaders} data={tableData} hiddenIndexes={hiddenIndexes} />
            </section>
            <section className={styles.transactions_right_section}>
                <TransactionsFilters transactions={transactionsList} accounts={accounts} categories={categoriesList} setHiddenIndexes={setHiddenIndexes} />
            </section>
        </div>
    )
}