'use client';

import { useEffect } from "react";
import LoggedInHeader from "../components/baselayout/LoggedInHeader";
import { getUser } from "../services/getUser";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from './LoggedInLayout.module.css';

export default function LoggedInLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const getProfile = async () => {
            await getUser().then((response) => {
                if (response.status === 401) {
                    router.push("/login");
                }
            });
        }
        getProfile();
    }, [pathName, searchParams])


    return (
        <>
            <LoggedInHeader />
            <main className={styles.main}>
            {children}
            </main>
        </>
    )
}