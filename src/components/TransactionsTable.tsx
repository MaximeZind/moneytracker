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

    // Function to add a new instance of a recurring transaction to the array
    function addRecurringTransaction(transaction: Transaction) {

        if (transaction.recurring === true && transaction.frequencyAmount && transaction.frequencyUnit && transaction.recurringEndingDate) {
            // Clone the transaction object
            const newTransaction = { ...transaction };

            // Calculate the next occurrence date based on the frequency
            const { frequencyAmount, frequencyUnit, recurringEndingDate } = transaction;
            let nextDate = new Date(newTransaction.date); // Clone the date
            switch (frequencyUnit.toLowerCase()) {
                case 'days':
                    nextDate.setDate(nextDate.getDate() + frequencyAmount);
                    break;
                case 'weeks':
                    nextDate.setDate(nextDate.getDate() + (frequencyAmount * 7));
                    break;
                case 'months':
                    nextDate.setMonth(nextDate.getMonth() + frequencyAmount);
                    break;
                case 'years':
                    nextDate.setFullYear(nextDate.getFullYear() + frequencyAmount);
                    break;
                default:
                    console.error('Invalid frequency unit:', frequencyUnit);
                    return null; // Return null for an invalid frequency unit
            }

            // Check if the next occurrence date is before the ending date
            if (nextDate <= new Date(recurringEndingDate)) {
                newTransaction.date = new Date (nextDate); // Update the date for the new instance
                return newTransaction; // Return the new instance
            } else {
                return null; // Return null if the instance is beyond the ending date
            }
        } else {
            return null;
        }
    }

    // Function to generate all instances of a recurring transaction until the ending date
    function generateRecurringInstances(transaction: Transaction) {
        const instances = [];
        let instance = addRecurringTransaction(transaction);
        while (instance !== null) {
            instances.push(instance);
            instance = addRecurringTransaction(instance);
        }
        return instances;
    }
    

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
            date: `${dayNumber + "/" + monthNumber + "/" + yearNumber}`,
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
