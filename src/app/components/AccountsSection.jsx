'use client'

import { useEffect } from "react";
import { getAccounts } from "../services/getAccounts"
import styles from "./AccountsSection.module.css";

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
        </>
    )
}
