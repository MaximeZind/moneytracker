'use client'

import { useEffect, useState } from "react";
import styles from "./TransactionsFilters.module.css";
import { Account, Category, Transaction } from "@/types/global";
import Collapse from "./Collapse";

interface TransactionsFiltersProps {
    transactions: Transaction[];
    accounts: Account[];
    categories: Category[];
    setHiddenIndexes: Function;
}

export default function TransactionsFilters({ transactions, accounts, categories, setHiddenIndexes }: TransactionsFiltersProps) {

    const [filterOptions, setFilterOptions] = useState({
        accounts: [] as string[],
        categories: [] as string[],
        transactionsTypes: ["expense", "income"],
        dates: {
            dateFrom: null as null | Date,
            dateUntil: null as null | Date,
        }
    });
    const [indexes, setIndexes] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function setFilters() {
            const accountsSet = new Set<string>();
            const categoriesSet = new Set<string>();
            const transactionTypesSet = new Set<string>();
            if (transactions.length > 0) {
                transactions.map((transaction) => {
                    accountsSet.add(transaction.accountId);
                    categoriesSet.add(transaction.categoryId);
                    transactionTypesSet.add(transaction.type);
                });
                const filterOptions = {
                    accounts: Array.from(accountsSet),
                    categories: Array.from(categoriesSet),
                    transactionsTypes: Array.from(transactionTypesSet),
                    dates: {
                        dateFrom: new Date(transactions[0].date),
                        dateUntil: new Date(transactions[transactions.length - 1].date),
                    },
                };
                setFilterOptions(filterOptions);
            }
        }
        setFilters();
    }, [])

    useEffect(() => {
        setHiddenIndexes(indexes);
    }, [indexes])

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
        });
        setIndexes([...indexOfHiddenTransactions])
    }

    console.log(isOpen);
    
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className={styles.filters_icon}
                onClick={() => setIsOpen(!isOpen)}>
                <g id="Layer_23"
                    data-name="Layer 23">
                    <path d="M59.59,50.42H51c-2.28-10-16.45-10-18.73,0H4.41a2,2,0,1,0,0,4H32.3c2.29,10,16.46,10,18.73,0h8.56A2,2,0,0,0,59.59,50.42ZM41.67,58c-7.38-.26-7.38-10.9,0-11.16C49.05,47.1,49.05,57.74,41.67,58Z" />
                    <path d="M59.59,30H28.52C26.24,20,12.07,20,9.79,30H4.41a2,2,0,1,0,0,4H9.79c2.28,10,16.45,10,18.73,0H59.59A2,2,0,0,0,59.59,30ZM19.16,37.58c-7.38-.24-7.37-10.93,0-11.16C26.53,26.66,26.53,37.35,19.16,37.58Z" />
                    <path d="M4.41,13.58H22.63c2.29,10,16.46,10,18.74,0H59.59a2,2,0,0,0,0-4H41.37c-2.29-10-16.46-10-18.74,0H4.41A2,2,0,0,0,4.41,13.58ZM32,6c7.38.26,7.38,10.9,0,11.16C24.62,16.9,24.62,6.26,32,6Z" />
                </g>
            </svg>
            <div className={isOpen ? `${styles.transactions_section_filters} ${styles.open}` : styles.transactions_section_filters}>
                <h1>Filters</h1>
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
        </>
    )
}
