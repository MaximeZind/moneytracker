'use client'
import styles from './LoggedInHeader.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


export default function LoggedInHeader() {
    const pathname = usePathname();
    return (
        <header className={styles.header}>
            <div className={styles.header_logo}></div>
            <nav className={styles.header_nav}>
                <Link className={`${styles.link} ${pathname === '/' ? styles.active : ''}`} href="/">
                    Sign out
                </Link>
            </nav>
        </header>
    )
}