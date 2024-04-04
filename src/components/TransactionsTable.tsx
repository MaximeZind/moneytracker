'use client'

import { useEffect, useState } from "react";
import { getTransactions } from "../app/services/transactions";
import Table from "../components/Table";
import styles from "./TransactionsTable.module.css";
import { Account, Category, Transaction } from "@/types/global";
import generateRecurringInstances from "../utils/transactions";
import Collapse from "./Collapse";
import { getAccounts } from "@/app/services/accounts";
import { getCategories } from "@/app/services/categories";

export default function TransactionsTable() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

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

        const fetchAccount = async () => {
            await getAccounts().then((response) => {
                setAccounts(response);
            })
        }

        const fetchCategories = async () => {
            await getCategories().then((response) => {
                setCategories(response);
            })
        }

        getProfile();
        fetchAccount();
        fetchCategories();
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
        <section className={styles.transactions_section}>
            <div className={styles.transactions_section_filters}>
                <Collapse title="Accounts">
                    {
                        accounts.map((account) => {
                            return (
                                <div key={account.id} className={styles.account_option}>
                                    <input type="checkbox" id={account.name} name={account.name} value="true" />
                                    <label htmlFor={account.name}>{account.name}</label>
                                </div>
                            )
                        })
                    }
                </Collapse>
                <Collapse title="Categories">
                    {
                        categories.map((category) => {
                            return (
                                <div key={category.id} className={styles.category_option}>
                                    <input type="checkbox" id={category.name} name={category.name} value="true" />
                                    <label htmlFor={category.name}>{category.name}</label>
                                </div>
                            )
                        })
                    }
                </Collapse>
                <Collapse title="Transactions">
                    <p>Types:</p>
                    <div className={styles.transaction_type_option}>
                        <input type="checkbox" id="income" name="income" value="true" />
                        <label htmlFor="income">Income</label>
                    </div>
                    <div className={styles.transaction_type_option}>
                        <input type="checkbox" id="debit" name="debit" value="true" />
                        <label htmlFor="debit">Debit</label>
                    </div>
                </Collapse>
                <Collapse title="Dates">
                    <div className={styles.dates_from}>
                        <label htmlFor="dateFrom">Transactions from </label>
                        <input type="date" name="dateFrom" id="dateFrom" className={styles.date_input} />
                    </div>
                    <div className={styles.dates_until}>
                        <label htmlFor="dateUntil">Until </label>
                        <input type="date" name="dateUntil" id="dateUntil" className={styles.date_input} />
                    </div>
                </Collapse>
            </div>
            <Table headers={tableHeaders} data={tableData} />
        </section>
    )
}
