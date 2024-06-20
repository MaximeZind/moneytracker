"use client"
import { Account, Category, Transaction } from "@/types/global";
import styles from "./AccountSection.module.css";
import Table from "@/components/table/Table";
import generateRecurringInstances from "@/utils/transactions";
import CategoriesBox from "../CategoriesBox";
import { useState } from "react";
import TransactionsFilters from "../TransactionsFilters";
import Button from "../forms/formscomponents/SubmitButton";

interface Props {
    account: Account;
    categories: Category[];
}

export default function AccountPreview({ account, categories }: Props) {

    const [categoriesList, setCategoriesList] = useState<Category[]>(categories);
    const [hiddenIndexes, setHiddenIndexes] = useState<number[]>([]);

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

    let transactions: Transaction[] = [];

    if (account.transactions) {
        transactions = sortTransactions(account.transactions);
    }


    // Creating datas for the table component
    const tableHeaders = ["Month", "Date", "Description", "Category", "Income", "Debit", "Amount", "Balance"];
    let tableData: { month: string; date: string; description: string; category: string; income: number; debit: number; amount: string; type: string; id: string; }[] = [];

    transactions?.map((transaction) => {
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
            amount: transaction.type === "income" ? `${transaction.amount}` : transaction.type === "expense" ? `-${transaction.amount}` : "",
            type: transaction.type,
            id: transaction.id
        }
        tableData.push(newObject);
    })

    function refresh(list: Category[]) {
        setCategoriesList(list);
    }
    return (
        <section className={styles.account_section}>
            <section className={styles.categories_section}>
                <h1>Categories</h1>
                <CategoriesBox categories={categoriesList} refresh={refresh} />
            </section>
            <section className={styles.account_section_transactions}>
                <h1>{account.name}</h1>
                {
                    transactions.length === 0 ?
                        <div className={styles.empty_transactions_list_message}>
                            <p>{`It looks like you haven't added any transaction yet! Click on the button below to get started:`}</p>
                            <Button url='/dashboard/transactions/add' text='Add Transaction' value={""} />
                        </div> :
                        <Table headers={tableHeaders} data={tableData} hiddenIndexes={hiddenIndexes} />
                }
            </section>
            <section className={styles.filters_section}>
                <h1>Filters</h1>
                <TransactionsFilters transactions={transactions} accounts={[account]} categories={categoriesList} setHiddenIndexes={setHiddenIndexes} />
            </section>
        </section>
    )
}
