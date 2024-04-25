'use client'

import { useEffect, useState } from "react";
import { getAccounts } from "../../app/services/accounts";
import styles from "./AccountsSection.module.css";
import Link from "next/link";
import AccountPreview from "../AccountPreview";
import { Account } from "@/types/global";
import SubmitButton from "../forms/formscomponents/SubmitButton";

interface AccountsSectionProps {
    accounts: Account[];
}

export default function AccountsSection({accounts}: AccountsSectionProps) {

    // const [accounts, setAccounts] = useState([]);
    // useEffect(() => {
    //     const Accounts = async () => {
    //         await getAccounts().then((response) => {
    //             setAccounts(response)
    //         });
    //     }
    //     Accounts();
    // }, []);

    return (
        <section className={styles.accounts_section}>
            <div className={styles.accounts_section_gallery}>
                {
                    accounts && accounts.map((account: Account) => {
                        return (
                            <AccountPreview key={account.id} name={account.name} type={account.type} transactions={account.transactions} id={account.id} />
                        )
                    })
                }
            </div>
            <Link href="/dashboard/accounts/newaccount">
                <SubmitButton text="Create a new account" value="" />
            </Link>
        </section>
    )
}
