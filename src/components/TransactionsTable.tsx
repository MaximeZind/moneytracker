'use client'

import { useEffect, useState } from "react";
import { getTransactions } from "../app/services/transactions";
import Table from "./table/Table";
import styles from "./TransactionsTable.module.css";
import { Account, Category, Transaction } from "@/types/global";
import generateRecurringInstances from "../utils/transactions";
import Collapse from "./Collapse";
import { getAccounts } from "@/app/services/accounts";
import { getCategories } from "@/app/services/categories";

interface TransactionsTableProps {
    transactions: Transaction[];
    accounts: Account[];
    categories: Category[];
    hiddenIndexes: number[];
}

export default function TransactionsTable({ transactions, accounts, categories, hiddenIndexes }: TransactionsTableProps) {

    // const [filterOptions, setFilterOptions] = useState({
    //     accounts: [] as string[],
    //     categories: [] as string[],
    //     transactionsTypes: ["expense", "income"],
    //     dates: {
    //         dateFrom: null as null | Date,
    //         dateUntil: null as null | Date,
    //     }
    // });

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
    // useEffect(() => {
    //     const getProfile = async () => {
    //         await getTransactions().then((userTransactions: Transaction[]) => {
    //             const allTransactions = userTransactions.flatMap((transaction) => {
    //                 if (transaction.recurring === true && transaction.frequencyAmount && transaction.frequencyUnit && transaction.recurringEndingDate) {
    //                     return [transaction, ...generateRecurringInstances(transaction)];
    //                 } else {
    //                     return [transaction];
    //                 }
    //             }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                // const accountsSet = new Set<string>();
                // const categoriesSet = new Set<string>();
                // const transactionTypesSet = new Set<string>();
                // if (userTransactions.length > 0) {
                //     userTransactions.map((transaction) => {
                //         accountsSet.add(transaction.accountId);
                //         categoriesSet.add(transaction.categoryId);
                //         transactionTypesSet.add(transaction.type);
                //     });
                //     const filterOptions = {
                //         accounts: Array.from(accountsSet),
                //         categories: Array.from(categoriesSet),
                //         transactionsTypes: Array.from(transactionTypesSet),
                //         dates: {
                //             dateFrom: new Date(allTransactions[0].date),
                //             dateUntil: new Date(allTransactions[allTransactions.length - 1].date),
                //         },
                //     };
                //     setFilterOptions(filterOptions);
    //             }
    //             setTransactions(allTransactions);
    //         });
    //     }
    const transactionsList = sortTransactions(transactions);

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

    return (
        // <section className={styles.transactions_section}>
        <Table headers={tableHeaders} data={tableData} hiddenIndexes={hiddenIndexes} />
        // </section>
    )
}
