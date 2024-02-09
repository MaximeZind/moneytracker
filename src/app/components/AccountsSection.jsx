'use client'

import { useEffect, useState } from "react";
import { getAccounts } from "../services/Accounts"
import styles from "./AccountsSection.module.css";
import Link from "next/link";
import AccountPreview from "./AccountPreview";

export default function AccountsSection() {

    const [accounts, setAccounts] = useState(null);
    useEffect(() => {
        const Accounts = async () => {
            await getAccounts().then((response) => {
                console.log(response);
                setAccounts(response)
            });
        }
        Accounts();
    }, []);

    return (
        <section className={styles.accounts_section}>
            {
                accounts && accounts.map((account) => {
                    return (
                        <AccountPreview key={account.id} name={account.name} type={account.type} transactions={account.transactions}/>
                    )
                })
            }
            <Link href="/dashboard/accounts/newaccount">Create a new account</Link>
        </section>
    )
}
