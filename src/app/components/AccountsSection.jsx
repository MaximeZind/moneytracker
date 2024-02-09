'use client'

import { useEffect } from "react";
import { getAccounts } from "../services/Accounts"
import styles from "./AccountsSection.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountsSection() {
    
    useEffect(() => {
        const Accounts = async () => {
                await getAccounts().then((response) => {
                    console.log(response);
                });
        }
        Accounts();
    }, []);

    return (
        <>
            <p>Hello</p>
            <Link href="/dashboard/accounts/newaccount">Create a new account</Link>
        </>
    )
}
