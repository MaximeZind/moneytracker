'use client'

import { useEffect, useState } from "react";
import { getTransactions } from "../services/getTransactions";
import styles from "./TransactionsTable.module.css";

export default function TransactionsTable() {

    const token = localStorage.getItem("token");
    const [transactions, setTransactions] = useState(null);

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

    console.log(transactions);
    return (
        <>
            <p>Hello</p>
        </>
    )
}
