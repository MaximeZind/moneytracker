'use client';

import LoggedInHeader from "../../components/baselayout/LoggedInHeader";
import styles from './LoggedInLayout.module.css';

export default function LoggedInLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <LoggedInHeader />
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}