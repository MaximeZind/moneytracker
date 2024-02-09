'use client'

import styles from "./AccountPreview.module.css";
import Link from "next/link";
import { Transaction } from "@/types/global";

interface Props {
    name: string;
    type: string;
    transactions?: Transaction[];
}

export default function AccountPreview({name, type, transactions }: Props) {

    let amount = 0;
    
    transactions?.map((transaction) => {
        if (transaction.type === "Income") {
            amount = amount + transaction.amount;
        } else if (transaction.type === "Expense") {
            amount = amount - transaction.amount;
        }
    })
    const lastTransaction = transactions?.at(-1);
    return (
        <Link href={""}>
            <div className={styles.account_preview}>
                <header className={styles.account_preview_header}>
                    <h2 className={styles.account_preview_title}>{name}</h2>
                    <p className={styles.account_preview_type}>Type: {type}</p>
                </header>
                <p className={styles.account_preview_amount}>{amount}</p>
                <div className={styles.account_preview_lastrow}>
                    <div className={styles.account_preview_last_transaction}>
                        <p>Last Transaction:</p>
                        <div className={styles.account_preview_last_transactions_details}>
                            {
                                lastTransaction && lastTransaction.type === "Income" ?
                                <p>+</p> : <p>-</p>
                            }
                            <p>{lastTransaction?.amount}</p>
                        </div>
                    </div>
                    <p>See Account</p>
                </div>
            </div>
        </Link>
    )
}
