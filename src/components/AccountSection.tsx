"use client"
import { useEffect, useState } from "react";
import styles from "./AccountSection.module.css";
import { getAccount } from "@/app/services/accounts";

interface Props {
    id: string;
}

export default function AccountPreview({ id }: Props) {

    const [account, setAccount] = useState(null);
    useEffect(() => {
        async function Account() {

        }
    });

    return (
        <section className={styles.account_section}>
            <p>id: {id}</p>
        </section>
    )
}
