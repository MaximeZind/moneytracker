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

export default function TransactionsTable() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filterOptions, setFilterOptions] = useState({
        accounts: [] as string[],
        categories: [] as string[],
        transactionsTypes: ["expense", "income"],
        dates: {
            dateFrom: null as null | Date,
            dateUntil: null as null | Date,
        }
    });
    const [hiddenIndexes, setHiddenIndexes] = useState<number[]>([]);

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
                const accountsSet = new Set<string>();
                const categoriesSet = new Set<string>();
                const transactionTypesSet = new Set<string>();
                if (userTransactions.length > 0) {
                    userTransactions.map((transaction) => {
                        accountsSet.add(transaction.accountId);
                        categoriesSet.add(transaction.categoryId);
                        transactionTypesSet.add(transaction.type);
                    });
                    const filterOptions = {
                        accounts: Array.from(accountsSet),
                        categories: Array.from(categoriesSet),
                        transactionsTypes: Array.from(transactionTypesSet),
                        dates: {
                            dateFrom: new Date(allTransactions[0].date),
                            dateUntil: new Date(allTransactions[allTransactions.length - 1].date),
                        },
                    };
                    setFilterOptions(filterOptions);
                }
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

    const tableHeaders = ["Month", "Date", "Description", "Category", "Income", "Debit", "Balance"];
    let tableData: { month: string; date: string; description: string; category: string; income: number; debit: number; type: string; id: string; }[] = []
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
            id: transaction.id
        }
        tableData.push(newObject);
    });

    function handleAccountClick(accountClicked: string) {
        setFilterOptions(previousOptions => {
            const updatedOptions = {
                ...previousOptions,
                accounts: previousOptions.accounts.includes(accountClicked)
                    ? previousOptions.accounts.filter(account => account !== accountClicked)
                    : [...previousOptions.accounts, accountClicked],
            };
            filterTransactions(updatedOptions);
            return updatedOptions;
        });
    }

    function handleCategoryClick(categoryClicked: string) {
        setFilterOptions(previousOptions => {
            const updatedOptions = {
                ...previousOptions,
                categories: previousOptions.categories.includes(categoryClicked)
                    ? previousOptions.categories.filter(category => category !== categoryClicked)
                    : [...previousOptions.categories, categoryClicked],
            };
            filterTransactions(updatedOptions);
            return updatedOptions;
        });
    }

    function handleTransactionTypeClick(transactionClicked: string) {
        setFilterOptions(previousOptions => {
            const updatedOptions = {
                ...previousOptions,
                transactionsTypes: previousOptions.transactionsTypes.includes(transactionClicked)
                    ? previousOptions.transactionsTypes.filter(transaction => transaction !== transactionClicked)
                    : [...previousOptions.transactionsTypes, transactionClicked],
            };
            filterTransactions(updatedOptions);
            return updatedOptions;
        });
    }

    function handleDateChange(event: React.FormEvent<HTMLInputElement>) {
        const inputElement = event.target as HTMLInputElement;
        setFilterOptions(previousOptions => {
            const updatedOptions = {
                ...previousOptions,
                dates: {
                    dateFrom: inputElement.id === "dateFrom" ? new Date(inputElement.value) : previousOptions.dates.dateFrom,
                    dateUntil: inputElement.id === "dateUntil" ? new Date(inputElement.value) : previousOptions.dates.dateUntil,
                },
            };
            filterTransactions(updatedOptions);
            return updatedOptions;
        });
    }

    function filterTransactions(updatedOptions: typeof filterOptions) {
        let indexOfHiddenTransactions: number[] = [];
        transactions.map((transaction, index) => {
            const isAccountOk = updatedOptions.accounts.includes(transaction.accountId);
            const isCategoryOk = updatedOptions.categories.includes(transaction.categoryId);
            const isTransactionTypeOk = updatedOptions.transactionsTypes.includes(transaction.type);
            let isDateFromOk = false;
            let isDateUntilOk = false;
            if (updatedOptions.dates.dateFrom) {
                isDateFromOk = new Date(updatedOptions.dates.dateFrom) <= new Date(transaction.date);
            }
            if (updatedOptions.dates.dateUntil) {
                isDateUntilOk = new Date(updatedOptions.dates.dateUntil) >= new Date(transaction.date);
            }

            if (!isAccountOk || !isCategoryOk || !isTransactionTypeOk || !isDateFromOk || !isDateUntilOk) {
                indexOfHiddenTransactions.push(index)
            }
        })
        setHiddenIndexes(indexOfHiddenTransactions);
    }

    return (
        <section className={styles.transactions_section}>
            <div className={styles.transactions_section_filters}>
                <Collapse title="Accounts">
                    {
                        accounts.map((account) => {
                            return (
                                <div key={account.id} className={styles.account_option}>
                                    <input
                                        type="checkbox"
                                        id={account.name}
                                        name={account.name}
                                        value="true"
                                        checked={filterOptions.accounts.includes(account.id)}
                                        onChange={() => handleAccountClick(account.id)}
                                    />
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
                                    <input
                                        type="checkbox"
                                        id={category.name}
                                        name={category.name}
                                        value="true"
                                        checked={filterOptions.categories.includes(category.id)}
                                        onChange={() => handleCategoryClick(category.id)}
                                    />
                                    <label htmlFor={category.name}>{category.name}</label>
                                </div>
                            )
                        })
                    }
                </Collapse>
                <Collapse title="Transactions">
                    <p>Types:</p>
                    <div className={styles.transaction_type_option}>
                        <input
                            type="checkbox"
                            id="income"
                            name="income"
                            value="true"
                            checked={filterOptions.transactionsTypes.includes("income")}
                            onChange={() => handleTransactionTypeClick("income")}
                        />
                        <label htmlFor="income">Income</label>
                    </div>
                    <div className={styles.transaction_type_option}>
                        <input
                            type="checkbox"
                            id="expense"
                            name="expense"
                            value="true"
                            checked={filterOptions.transactionsTypes.includes("expense")}
                            onChange={() => handleTransactionTypeClick("expense")}
                        />
                        <label htmlFor="expense">Expense</label>
                    </div>
                </Collapse>
                <Collapse title="Dates">
                    <div className={styles.dates_from}>
                        <label htmlFor="dateFrom">Transactions from </label>
                        <input
                            type="date"
                            name="dateFrom"
                            id="dateFrom"
                            className={styles.date_input}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className={styles.dates_until}>
                        <label htmlFor="dateUntil">Until </label>
                        <input
                            type="date"
                            name="dateUntil"
                            id="dateUntil"
                            className={styles.date_input}
                            onChange={handleDateChange}
                        />
                    </div>
                </Collapse>
            </div>
            <Table headers={tableHeaders} data={tableData} hiddenIndexes={hiddenIndexes} />
        </section>
    )
}
