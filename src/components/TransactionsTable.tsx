'use client'

import { useEffect, useState } from "react";
import { getTransactions } from "../app/services/transactions";
import Table from "../components/Table";
import styles from "./TransactionsTable.module.css";
import { Transaction } from "@/types/global";
import generateRecurringInstances from "../utils/transactions";

export default function TransactionsTable() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const getProfile = async () => {
            await getTransactions().then((userTransactions: Transaction[]) => {
                    const allTransactions = userTransactions.flatMap((transaction) => {
                        if (transaction.recurring === true && transaction.frequencyAmount && transaction.frequencyUnit && transaction.recurringEndingDate) {
                            return [transaction, ...generateRecurringInstances(transaction)];
                        } else {
                            return [transaction];
                        }
                    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                    
                setTransactions(allTransactions);
            });
        }
        getProfile();
    }, []);    

    // Creating datas for the table component
    const tableHeaders = ["Month", "Date", "Description", "Category", "Income", "Debit", "Balance"];
    let tableData: { month: string; date: string; description: string; category: string; income: number; debit: number; type: string; }[] = []
    transactions && transactions.map((transaction) => {
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
        }
        tableData.push(newObject);
    });

    return (
        <Table headers={tableHeaders} data={tableData} />
    )
}
