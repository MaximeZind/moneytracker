'use client'

import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import styles from "./PieChartExpenses.module.css";
import { Transaction } from "@/types/global";

interface Props {
    transactions: Transaction[];
}


interface Categories {
    [key: string]: Transaction[];
}



export default function PieChartExpenses({ transactions }: Props) {

    function setData(transactions: Transaction[]) {
        // Get all the expenses
        const expenseTransactions: Transaction[] = transactions.filter((transaction) => {
            return transaction.type === 'expense';
        })
        let expensesCategories: Categories = {};

        // Divide the expenses by categories
        expenseTransactions.map((transaction: Transaction) => {
            const categoryName: string = transaction.category.name;
            if (Object.keys(expensesCategories).includes(categoryName)) {
                expensesCategories[categoryName].push(transaction);
            } else if (!Object.keys(expensesCategories).includes(categoryName)) {
                expensesCategories[categoryName] = [transaction];
            }
        })

        // Create a data object with each name of category and totalAmount
        const data = Object.keys(expensesCategories).map((key) => {
            let totalAmount = 0;
            expensesCategories[key].map((transaction: Transaction) => {
                totalAmount = totalAmount + transaction.amount;
            })
            return {
                "name": key,
                "value": totalAmount
            }
        });

        return data;
    }

    function renderCustomLabel({ name }: { name: string }) {
        return name;
    };

    function tooltipFormatter(value: number, name: string) {
        return [`$${value}`, name];
    };

    const data = setData(transactions);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Expenses</h2>
            <ResponsiveContainer height={300}>
                <PieChart >
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label={renderCustomLabel} />
                    <Tooltip formatter={tooltipFormatter} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
