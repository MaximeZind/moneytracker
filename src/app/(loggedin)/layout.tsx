'use client';

import { Suspense, useEffect } from "react";
import LoggedInHeader from "../../components/baselayout/LoggedInHeader";
import { getUser } from "../services/getUser";
import { useRouter } from "next/navigation";
import styles from './LoggedInLayout.module.css';
import { usePathname } from 'next/navigation'

export default function LoggedInLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const pathname = usePathname()
    // const searchParams = useSearchParams()

    useEffect(() => {
        const getProfile = async () => {
            await getUser().then((response) => {
                console.log(response);
                if (response.status === 401) {
                    router.push("/login");
                }
            });
        }
        getProfile();
    }, [pathname])


    return (
        <>
            <LoggedInHeader />
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}