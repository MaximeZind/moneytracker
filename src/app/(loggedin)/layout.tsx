'use client';

import { useEffect } from "react";
import LoggedInHeader from "../../components/baselayout/LoggedInHeader";
import { getUser } from "../services/getUser";
import { useRouter } from "next/navigation";
import styles from './LoggedInLayout.module.css';

export default function LoggedInLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    useEffect(() => {
        const getProfile = async () => {
            await getUser().then((response) => {
                console.log(response.status);
                if (response.status !== 200) {
                    router.push("/login");
                }
            });
        }
        getProfile();
    }, [router])


    return (
        <>
            <LoggedInHeader />
            <main className={styles.main}>
            {children}
            </main>
        </>
    )
}