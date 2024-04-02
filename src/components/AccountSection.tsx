"use client"
import { useEffect, useState } from "react";
import { Account, Transaction } from "@/types/global";
import styles from "./AccountSection.module.css";
import { getAccount } from "@/app/services/accounts";
import Table from "@/components/Table";
import generateRecurringInstances from "@/utils/transactions";

interface Props {
    id: string;
}

export default function AccountPreview({ id }: Props) {

    const [account, setAccount] = useState<Account | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        async function Account() {
            await getAccount(id).then((response => {
                const transactions = response.response.data.transactions;
                const allTransactions = transactions.flatMap((transaction: Transaction) => {
                    if (transaction.recurring === true && transaction.frequencyAmount && transaction.frequencyUnit && transaction.recurringEndingDate) {
                        return [transaction, ...generateRecurringInstances(transaction)];
                    } else {
                        return [transaction];
                    }
                }).sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(a.date).getTime() - new Date(b.date).getTime());
                setAccount(response.response.data);
                setTransactions(allTransactions);
            }))
        }
        Account();
    }, [id]);

    console.log(account);
    // Creating datas for the table component
    const tableHeaders = ["Month", "Date", "Description", "Category", "Income", "Debit", "Balance"];
    let tableData: { month: string; date: string; description: string; category: string; income: number; debit: number; type: string; }[] = [];

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
    })
    return (
        <section className={styles.account_section}>
            {account &&
                <>
                    <h1>{account.name}</h1>
                    <Table headers={tableHeaders} data={tableData} />
                </>
            }
        </section>
    )
}
