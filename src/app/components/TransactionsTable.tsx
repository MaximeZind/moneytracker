'use client'

import { useEffect, useState } from "react";
import { getTransactions } from "../services/getTransactions";
import Table from "../components/Table";
import styles from "./TransactionsTable.module.css";

interface Transaction {
    accoundId: string;
    amount: number;
    category: string;
    date: string; 
    id: number;
    description: string;
    type: "Income" | "Expense";
  }

export default function TransactionsTable() {

    const token = localStorage.getItem("token");
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const getProfile = async () => {
            if (token) {
                await getTransactions(token).then((userTransactions) => {
                    setTransactions(userTransactions);
                });
            }
        }
        getProfile();
    }, [token]);

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
            category: transaction.category,
            income: transaction.type === "Income" ? transaction.amount : 0,
            debit: transaction.type === "Expense" ? transaction.amount : 0,
        }
        tableData.push(newObject);        
    });

    return (
        <>
            <p>Hello</p>
            {/* {
                transactions && transactions.map(transaction => {
                    const monthName = new Date(transaction.date).toLocaleString('default', {month: 'long'})
                    const dayNumber = new Date(transaction.date).getDay().toLocaleString().padStart(2, '0');
                    const monthNumber = new Date(transaction.date).getMonth().toLocaleString().padStart(2, '0');
                    const yearNumber = new Date(transaction.date).getFullYear();
                    return <div key={transaction.id}>
                        <p>{monthName}</p>
                        <p>{dayNumber + "/" + monthNumber + "/" + yearNumber}</p>
                        <p>{transaction.description}</p>
                        <p>{transaction.category}</p>
                        <p>{transaction.type === "Income" ? transaction.amount : 0}</p>
                        <p>{transaction.type === "Expense" ? transaction.amount : 0}</p>
                    </div>
                })
            } */}
            <Table headers={tableHeaders} data={tableData}/>
        </>
    )
}
