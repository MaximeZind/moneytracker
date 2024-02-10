'use client'

import { SetStateAction, useEffect, useState } from "react";
import { getTransactions } from "../app/services/transactions";
import Table from "../components/Table";
import styles from "./TransactionsTable.module.css";
import { Transaction } from "@/types/global";

export default function TransactionsTable() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    useEffect(() => {
        const getProfile = async () => {
                await getTransactions().then((userTransactions: SetStateAction<Transaction[]>) => {
                    console.log(userTransactions);
                    
                    setTransactions(userTransactions);
                });
        }
        getProfile();
    }, []);

    // Creating datas for the table component
    const tableHeaders = ["Month", "Date", "Description", "Category", "Income", "Debit", "Balance"];
    let tableData: { month: string; date: string; description: string; category: string; income: number; debit: number; }[] = []
    transactions && transactions.map((transaction) => {
        const monthName = new Date(transaction.date).toLocaleString('default', {month: 'long'})
        const dayNumber = new Date(transaction.date).getDay().toLocaleString().padStart(2, '0');
        const monthNumber = new Date(transaction.date).getMonth().toLocaleString().padStart(2, '0');
        const yearNumber = new Date(transaction.date).getFullYear();
        const newObject = {
            month: monthName,
            date: `${dayNumber + "/" + monthNumber + "/" + yearNumber}`,
            description: transaction.description,
            category: transaction.category.name,
            income: transaction.type === "income" ? transaction.amount : 0,
            debit: transaction.type === "expense" ? transaction.amount : 0,
        }
        tableData.push(newObject);        
    });

    return (
            <Table headers={tableHeaders} data={tableData}/>
    )
}
