'use client'

import { useEffect } from "react";
import { getAccounts } from "../services/getAccounts"
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

    const router = useRouter();
    function handleClick() {
        router.push("./accounts/newaccount");
    }

    return (
        <>
            <p>Hello</p>
            <button onClick={handleClick}>Create a new account</button>
            <Link href="../dashboard/accounts/newaccount">Create a new account</Link>
        </>
    )
}
