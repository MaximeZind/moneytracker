'use client'

import { ResponsiveContainer, Tooltip, AreaChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import styles from "./AreaChartProgression.module.css";
import { Transaction } from "@/types/global";

interface Props {
    transactions: Transaction[];
    amountGoal: number;
    firstTransaction: Transaction;
    goalDate: Date;
}


interface Categories {
    [key: string]: Transaction[];
}



export default function AreaChartProgression({ transactions, firstTransaction, amountGoal, goalDate }: Props) {

    function setData(transactions: Transaction[], firstTransaction: Transaction, amountGoal: number, goalDate: Date) {
        const transactionsDates = transactions.map((transaction) => {
            return new Date(transaction.date);
        })
        let balance = 0;
        const startingDateTimeStamp = new Date(firstTransaction.date).getTime();
        const coefficient = goalDate.getTime() - startingDateTimeStamp;

        const data = transactionsDates.map((transactionDate) => {
            const transactionTimeStamp = transactionDate.getTime();
            transactions.filter((transaction) => {
                if (new Date(transaction.date).getTime() === transactionTimeStamp) {
                    if (transaction.type === 'income') {
                        balance = balance + transaction.amount;
                    } else if (transaction.type === 'expense') {
                        balance = balance - transaction.amount;
                    }
                }
            });
            const progression = (transactionTimeStamp - startingDateTimeStamp) / coefficient;
            const startingBalance = transactions[0].amount;
            const goal = startingBalance + progression * (amountGoal - startingBalance);
            return {
                "name": transactionDate.toLocaleDateString(),
                "Balance": balance,
                "Goal": progression <= 1 ? goal : amountGoal
            }

        })
        return data;
    }

    const data = setData(transactions, firstTransaction, amountGoal, goalDate);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Budget vs Goal</h2>
            <ResponsiveContainer height={400}>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="Balance" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="Goal" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>

    )
}
